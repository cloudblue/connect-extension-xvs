from collections import defaultdict
from functools import partial
from io import BytesIO
import os
import json
from tempfile import NamedTemporaryFile
from typing import Any, Dict, Optional

from connect.client import ClientError, ConnectClient
from connect.client.rql import R
from connect.eaas.core.logging import RequestLogger
from fastapi import status
import jsonschema
from jsonschema.exceptions import _Error
import jwt
import pandas as pd

from connect_ext_ppr.constants import (
    BASE_SCHEMA,
    CONFIGURATION_SCHEMA_TEMPLATE,
    PPR_SCHEMA,
    SUMMARY_TEMPLATE,
)
from connect_ext_ppr.errors import ExtensionHttpError
from connect_ext_ppr.models.enums import MimeTypeChoices
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.schemas import (
    ConfigurationReferenceSchema,
    ConfigurationSchema,
    DeploymentReferenceSchema,
    DeploymentRequestSchema,
    DeploymentSchema,
    FileSchema,
    HubSchema,
    MarketplaceSchema,
    PPRVersionReferenceSchema,
    PPRVersionSchema,
    ProductSchema,
    TaskSchema,
)


class FileColletion:
    PPR = 'pprs'
    CONFIFURATION = 'configurations'


def connect_error(f):
    def inner(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ClientError as ex:
            raise ExtensionHttpError.EXT_000(
                format_kwargs={"client_message": ex.message or ''},
                status_code=ex.status_code,
                errors=ex.errors,
            )
    return inner


def _get_extension_client(logger):
    return ConnectClient(
        os.getenv('API_KEY'),
        endpoint=f"https://{os.getenv('SERVER_ADDRESS')}/public/v1",
        use_specs=False,
        logger=RequestLogger(logger),
    )


def _get_installation(client):
    rql = R().external_id.eq(os.getenv('ENVIRONMENT_ID'))
    return client('devops').installations.filter(rql).first()


def get_listings(client):
    rql = R().status.eq("listed")
    return client.listings.filter(rql)


def get_marketplaces(client, mkp_ids):
    rql = R().id.in_(mkp_ids)
    return client.marketplaces.filter(rql)


def get_hubs(client, hubs_ids):
    rql = R().id.in_(hubs_ids)
    return client.hubs.filter(rql)


def get_products(client, prod_ids):
    rql = R().visibility.listing.eq(True)
    rql |= R().visibility.syndication.eq(True)
    rql &= R().id.in_(prod_ids)
    return client.products.filter(rql)


@connect_error
def get_product_items(client, prd_id):
    return client.products[prd_id].items.all()


@connect_error
def get_hub(client, hub_id):
    return client.hubs[hub_id].get()


def namespaced_media_client(client, account_id, deployment_id, file_collection):
    return (
        client
        .ns('media')
        .ns('folders')
        .ns('accounts')
        .collection(f'{account_id}/{deployment_id}/{file_collection}/files')
    )


@connect_error
def create_media_file(
    client, account_id, deployment_id, file_collection,
    filename, content, file_type, file_size,
):
    headers = {
        'Content-Type': file_type,
        'Content-Disposition': f'attachment; filename="{filename}"',
    }
    if file_size:
        headers.update({'Content-Length': str(file_size)})
    return namespaced_media_client(
        client, account_id, deployment_id, file_collection,
    ).create(headers=headers, data=content)


def create_ppr_to_media(client, account_id, deployment_id, filename, content, file_size=None):
    file_collection = FileColletion.PPR
    file_type = MimeTypeChoices.application_vnd_ms_xslx
    media_file = create_media_file(
        client, account_id, deployment_id, file_collection,
        filename, content, file_type, file_size,
    )
    return json.loads(media_file)


@connect_error
def get_file_from_media(client, account_id, deployment_id, media_id, file_collection):
    return namespaced_media_client(
        client, account_id, deployment_id, file_collection,
    )[media_id].get()


def get_ppr_from_media(client, account_id, deployment_id, media_id):
    file_collection = FileColletion.PPR
    return get_file_from_media(client, account_id, deployment_id, media_id, file_collection)


def get_configuration_from_media(client, account_id, deployment_id, media_id):
    file_collection = FileColletion.CONFIFURATION
    return get_file_from_media(client, account_id, deployment_id, media_id, file_collection)


@connect_error
def get_all_info(client):
    listings = get_listings(client)
    mkp_ids = list({li['contract']['marketplace']['id'] for li in listings})
    prod_ids = list({li['product']['id'] for li in listings})
    marketplaces = get_marketplaces(client, mkp_ids)
    products = get_products(client, prod_ids)
    for list_ in listings:
        mkp_id = list_['contract']['marketplace']['id']
        prd_id = list_['product']['id']
        list_['contract']['marketplace'] = filter_object_list_by_id(marketplaces, mkp_id)
        list_['product'] = filter_object_list_by_id(products, prd_id)
    listings = [li for li in listings if li['contract']['marketplace'].get('hubs')]
    return listings


def filter_object_list_by_id(object_list, key):
    for o in object_list:
        if key == o['id']:  # pragma: no branch
            return o
    raise KeyError(key)


def get_deployment_schema(deployment, product, vendor, hub):
    """
    Returns DeploymentSchema for the deployment
    :param deployment: Deployment model
    :param product: Product model from Connect
    :param vendor: Vendor Account model from Connect
    :param hub: Hub model from Connect
    :rtype: DeploymentSchema
    """
    return DeploymentSchema(
        id=deployment.id,
        account_id=deployment.account_id,
        hub={
            'id': deployment.hub_id,
            'name': hub['name'],
        },
        product={
            'id': product.id,
            'name': product.name,
            'icon': product.logo,
        },
        owner={
            'id': deployment.vendor_id,
            'name': vendor['name'],
            'icon': vendor.get('icon'),
        },
        status=deployment.status,
        last_sync_at=deployment.last_sync_at,
        events={
            'created': {'at': deployment.created_at},
            'updated': {'at': deployment.updated_at},
        },
    )


def get_deployment_reference_schema(deployment, hub):
    product = deployment.product
    product_schema = ProductSchema(id=product.id, name=product.name, icon=product.logo)
    hub_id = deployment.hub_id
    hub_schema = HubSchema(id=hub_id, name=hub['name'])
    return DeploymentReferenceSchema(id=deployment.id, product=product_schema, hub=hub_schema)


def get_deployment_request_schema(deployment_request, hub):
    """
    Returns DeploymentSchema for the deployment
    :param deployment: Deployment model
    :param product: Product model from Connect
    :param vendor: Vendor Account model from Connect
    :param hub: Hub model from Connect
    :rtype: DeploymentSchema
    """
    ppr = deployment_request.ppr
    ppr_schema = PPRVersionReferenceSchema(
        id=ppr.id,
        version=ppr.version,
    )
    events = {
        'created': {
            'at': deployment_request.created_at,
            'by': deployment_request.created_by,
        },
        'started': {'at': deployment_request.started_at},
        'finished': {'at': deployment_request.finished_at},
        'aborted': {
            'at': deployment_request.aborted_at,
            'by': deployment_request.aborted_by,
        },
    }

    return DeploymentRequestSchema(
        id=deployment_request.id,
        deployment=get_deployment_reference_schema(deployment_request.deployment, hub),
        ppr=ppr_schema,
        status=deployment_request.status,
        manually=deployment_request.manually,
        delegate_l2=deployment_request.delegate_l2,
        events=events,
    )


def get_task_schema(task):
    return TaskSchema(
        id=task.id,
        title=task.title,
        events={
            'created': {
                'at': task.created_at,
                'by': task.created_by,
            },
            'started': {
                'at': task.started_at,
            },
            'finished': {
                'at': task.finished_at,
            },
            'aborted': {
                'at': task.aborted_at,
                'by': task.aborted_by,
            },

        },
        status=task.status,
        error_message=task.error_message,
    )


def get_client_object(client, collection_name, obj_id):
    """
    Get client object by id
    :param ConnectClient client:
    :param str collection_name:
    :param str obj_id:
    """
    try:
        return getattr(client, collection_name)[obj_id].get()
    except ClientError as exc:
        raise ExtensionHttpError.EXT_000(
            format_kwargs={"client_message": exc.message or ''},
            status_code=exc.status_code,
            errors=exc.errors,
        )


def get_configuration_schema(configuration, file):
    """
    Returns ConfigurationSchema for the configuration
    :param configuration: Configuration model
    :param file: File model
    :rtype: ConfigurationSchema
    """
    file_schema = FileSchema(
        id=file.id,
        name=file.name,
        location=file.location,
        size=file.size,
        mime_type=file.mime_type,
    )
    return ConfigurationSchema(
        id=configuration.id,
        file=file_schema,
        state=configuration.state,
        events={
            'created': {
                'at': configuration.created_at,
                'by': configuration.created_by,
            },
            'updated': {
                'at': configuration.updated_at,
                'by': configuration.updated_by,
            },
        },
    )


def get_ppr_version_schema(ppr, file, conf):
    """
    Returns PPRVersionSchema for the PPR
    :param ppr: PPRVersion model
    :param file: File model
    :param conf: Related Configuration model
    :rtype: PPRVersionSchema
    """
    file_schema = FileSchema(
        id=file.id,
        name=file.name,
        location=file.location,
        size=file.size,
        mime_type=file.mime_type,
    )

    conf_schema = None
    if conf:
        conf_schema = ConfigurationReferenceSchema(
            id=conf.id,
            state=conf.state,
        )

    return PPRVersionSchema(
        id=ppr.id,
        version=ppr.version,
        product_version=ppr.product_version,
        file=file_schema,
        configuration=conf_schema,
        description=ppr.description,
        events={
            'created': {
                'at': ppr.created_at,
                'by': ppr.created_by,
            },
        },
        status=ppr.status,
    )


def get_deployment_request_by_id(dr_id, db, installation):
    """Return deployment request or raise an error that it is not found"""
    dr = (
        db.query(DeploymentRequest)
        .filter(
            DeploymentRequest.deployment.has(account_id=installation['owner']['id']),
            DeploymentRequest.id == dr_id,
        )
        .one_or_none()
    )
    if dr is None:
        raise ExtensionHttpError.EXT_001(
            format_kwargs={'obj_id': dr_id},
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return dr


def get_deployment_by_id(deployment_id, db, installation):
    """Return deployment or raise an error that it is not found"""
    dep = (
        db.query(Deployment)
        .filter_by(id=deployment_id, account_id=installation['owner']['id'])
        .one_or_none()
    )
    if dep is None:
        raise ExtensionHttpError.EXT_001(
            format_kwargs={'obj_id': deployment_id},
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return dep


def get_instance_by_id(model, instance_id, deployment_id, db):
    """
    Return configuration or ppr_version or raise an error that it is not found
    :param model: Type of model to get - Configuration or PPRVersion
    """
    instance = (
        db.query(model)
        .filter_by(id=instance_id, deployment=deployment_id)
        .one_or_none()
    )
    if instance is None:
        raise ExtensionHttpError.EXT_001(
            format_kwargs={'obj_id': instance_id},
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return instance


def workbook_to_dict(wb: pd.ExcelFile, row_data=False):
    dict_wb = {}
    for sheet in wb.sheet_names:
        df = wb.parse(sheet_name=sheet)
        dict_wb[sheet] = process_worksheet(df, row_data)
    return dict_wb


def process_worksheet(df: pd.DataFrame, row_data=False):
    return df.to_dict(orient='list') if row_data else df.columns.to_list()


def _parse_json_schema_error(ex: _Error):
    error_list = [ex.message]
    if ex.context:
        for sub_ex in ex.context:
            sub_list = _parse_json_schema_error(sub_ex)
            error_list.extend(sub_list)
    return error_list


def get_user_data_from_auth_token(token):
    payload = jwt.decode(token, options={"verify_signature": False})

    return {
        'id': payload['u']['oid'],
        'name': payload['u']['name'],
    }


def validate_ppr_schema(dict_file: Dict[str, Any]):
    try:
        jsonschema.validate(dict_file, PPR_SCHEMA)
    except jsonschema.ValidationError as ex:
        return _parse_json_schema_error(ex)


def validate_configuration_schema(dict_file: Dict[str, Any], product_id):
    schema_string = CONFIGURATION_SCHEMA_TEMPLATE.format(product_id=product_id)
    schema = json.loads(schema_string)
    try:
        jsonschema.validate(dict_file, schema)
    except jsonschema.ValidationError as ex:
        return _parse_json_schema_error(ex)


def get_base_workbook(data: Optional[bytes]):
    file = NamedTemporaryFile(suffix='.xlsx')
    writer = pd.ExcelWriter(file.name, engine='openpyxl')
    wb = pd.ExcelFile(BytesIO(data)) if data else generate_base_workbook(file, writer)
    return file, writer, wb


def generate_base_workbook(file: NamedTemporaryFile, writer: pd.ExcelWriter):
    for sheet_name, colum_names in BASE_SCHEMA.items():
        df = pd.DataFrame(columns=colum_names)
        df.to_excel(writer, sheet_name, index=False)
    writer.book.save(file)
    file.seek(0)
    return pd.ExcelFile(file.read())


def process_resources(resources, items, config_json, product):
    summary = defaultdict(list)
    resource_category = (
        config_json
        .get('product_level', {})
        .get('ResourceCategories', {})
        .get('Name_EN')
    ) or product.name
    items_for_ppr = [
        (
            item['id'], item['name'], item['description'], resource_category,
            item['mpn'], item['unit']['name'], item['type'] == 'ppu',
        )
        for item in items
    ]
    columns = ['id']
    columns.extend(resources.columns)
    items_df = pd.DataFrame(columns=columns, data=items_for_ppr)
    to_update = resources.loc[resources.MPN.isin(items_df.MPN)]
    to_add = items_df.loc[~items_df.MPN.isin(resources.MPN)]
    to_remove = resources.loc[~resources.MPN.isin(items_df.MPN)]
    idxs = to_update.index
    for idx in idxs:
        mask = items_df.MPN == to_update.loc[idx, :].MPN
        update_df = pd.DataFrame(
            columns=resources.columns,
            data=items_df.loc[mask, resources.columns].values,
            index=[idx],
        )
        resources.update(update_df)
        summary['updated'].append(items_df.loc[mask].iloc[0].id)

    for _, value in to_add.iterrows():
        resources = pd.concat(
            [
                resources,
                pd.Series(value[1:], index=resources.columns).to_frame().T,
            ], ignore_index=True)
        summary['created'].append(value.id)

    for _, value in to_remove.iterrows():
        summary['removed'].append(value.Name_EN)
    return resources, summary


def process_resource_categories(resource_categories, config_json):
    columns = resource_categories.columns.to_list()
    json_data = {}
    map_columns = (
        config_json
        .get('product_level', {})
        .get('ResourceCategories', {})
    )
    for key, value in map_columns.items():
        name, suffix = key.split('_')
        new_name = '{0}_{1}'.format(name, suffix.upper())
        json_data[new_name] = [value]
        if new_name in columns:
            continue
        columns.append(new_name)
    df_res_cat = pd.DataFrame(columns=columns, data=json_data)
    return df_res_cat, {}


def process_ppr(wb, product, config_json, items):
    summary = {}
    ws_list = []
    scoped_product_info = (
        config_json
        .get('hierarchical_files_data', {})
        .get(product.id, {})
    )
    process_sheet_mapping = {
        'Resources': partial(
            process_resources,
            items=items,
            config_json=scoped_product_info,
            product=product,
        ),
        'ResourceCategories': partial(
            process_resource_categories,
            config_json=scoped_product_info,
        ),
    }
    for sheet_name in wb.sheet_names:
        ws = wb.parse(sheet_name)
        if sheet_name in process_sheet_mapping:
            ws, inner_summary = process_sheet_mapping[sheet_name](ws)
            summary.update({sheet_name: inner_summary})
        ws.name = sheet_name
        ws_list.append(ws)

    return ws_list, summary


def get_marketplace_schema(marketplace, ppr):
    mp_schema = MarketplaceSchema(
        id=marketplace['id'],
        name=marketplace['name'],
        icon=marketplace['icon'],
        external_id=marketplace.get('external_id'),
    )
    if ppr:
        mp_schema.ppr = PPRVersionReferenceSchema(id=ppr.id, version=ppr.version)

    return mp_schema


def _build_summary(summary: dict, indent: int = 0):
    acum = ''
    SEP = ' ' * 4
    for key, value in summary.items():
        key = key.capitalize()
        acum += "{0}{1}".format(SEP * indent, f'* {key}\n')
        if isinstance(value, dict):
            acum += _build_summary(value, indent + 1)
        else:
            spaces = SEP * (indent + 1)
            acum += "".join(f'{spaces}* {v}\n' for v in value)
    return acum


def build_summary(summary: dict):
    return SUMMARY_TEMPLATE.format(summary=_build_summary(summary))
