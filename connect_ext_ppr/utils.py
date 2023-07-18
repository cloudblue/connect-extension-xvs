import os

from connect.client import ClientError, ConnectClient
from connect.client.rql import R
from connect.eaas.core.logging import RequestLogger
from fastapi import status
from jsonschema.exceptions import _Error
import pandas as pd

from connect_ext_ppr.errors import ExtensionHttpError
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import Deployment
from connect_ext_ppr.schemas import ConfigurationSchema, DeploymentSchema, FileSchema


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


def get_products(client, prod_ids):
    rql = R().visibility.listing.eq(True)
    rql |= R().visibility.syndication.eq(True)
    rql & R().id.in_(prod_ids)
    return client.products.filter(rql)


def get_all_info(client):
    try:
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
        return listings
    except ClientError as exc:
        raise ExtensionHttpError.EXT_000(
            format_kwargs={"client_message": exc.message or ''},
            status_code=exc.status_code,
            errors=exc.errors,
        )


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
            'created': {'at': configuration.created_at},
            'updated': {'at': configuration.updated_at},
        },
    )


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


def get_configuration_by_id(configuration_id, deployment_id, db):
    """Return configuration or raise an error that it is not found"""
    conf = (
        db.query(Configuration)
        .filter_by(id=configuration_id, deployment=deployment_id)
        .one_or_none()
    )
    if conf is None:
        raise ExtensionHttpError.EXT_001(
            format_kwargs={'obj_id': configuration_id},
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return conf


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
