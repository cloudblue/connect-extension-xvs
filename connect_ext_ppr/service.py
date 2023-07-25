import os
from datetime import datetime

import pandas as pd

from connect_ext_ppr.constants import PPR_FILE_NAME
from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.errors import ExtensionHttpError
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import Deployment, MarketplaceConfiguration
from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.schemas import FileSchema
from connect_ext_ppr.utils import (
    create_ppr_to_media,
    get_base_workbook,
    get_configuration_from_media,
    get_ppr_from_media,
    get_product_items,
    process_ppr,
    validate_ppr_schema,
    workbook_to_dict,
)

from sqlalchemy.exc import DBAPIError
from sqlalchemy.sql import desc


def insert_product_from_listing(db, listing_data, logger):
    product_data = listing_data['product']
    q = db.query(Product).filter_by(id=product_data['id'])
    if not db.query(q.exists()).scalar():
        logger.info(f"Adding new product: {product_data['id']}.")
        product = Product(
            id=product_data.get('id'),
            name=product_data['name'],
            logo=product_data.get('icon'),
            owner_id=product_data['owner']['id'],
            version=product_data['version'],
        )
        db.add(product)
        db.commit()


def add_marketplaces_to_deployment(db, deployment, marketplaces):
    """
    Asociates all the marketplaces to deployment
    :param db: dbsession
    :param deployment: Deployment instance
    :param marketplaces: list of marketplaces' ids
    """
    configs = []
    for marketplace in marketplaces:
        mc = MarketplaceConfiguration(
            deployment=deployment.id,
            marketplace=marketplace,
        )
        configs.append(mc)
    db.add_all(configs)


def add_deployments(installation, listings, config, logger):
    with get_db_ctx_manager(config) as db:
        deployments = []
        deployments_marketplaces = {}
        seen = set()
        for li in listings:
            insert_product_from_listing(db, li, logger)
            product_id = li['product']['id']

            for hub in li['contract']['marketplace']['hubs']:
                hub_id = hub['hub']['id']
                comb = (product_id, installation['owner']['id'], hub_id)
                q = db.query(Deployment).filter_by(
                    product_id=product_id,
                    account_id=installation['owner']['id'],
                    hub_id=hub_id,
                )
                if db.query(q.exists()).scalar():
                    dep = q.first()
                    logger.info(
                        f"Deployment {dep.id} for hub {hub_id} already exists.",
                    )
                    continue
                if comb not in seen:
                    dep = Deployment(
                        product_id=product_id,
                        hub_id=hub_id,
                        vendor_id=li['vendor']['id'],
                        account_id=installation['owner']['id'],
                    )
                    logger.info(
                        f"Generating Deployment: product={product_id},"
                        f" account={installation['owner']['id']}, hub={hub['hub']['id']}.",
                    )
                    deployments.append(dep)
                    seen.add(comb)
                key = f"{product_id}#{hub_id}"
                deployments_marketplaces.setdefault(
                    key,
                    {'deployment': dep, 'marketplaces': []},
                )
                deployments_marketplaces[key]['marketplaces'].append(
                    li['contract']['marketplace']['id'],
                )
        db.set_verbose_all(deployments)
        db.commit()

        for data in deployments_marketplaces.values():
            add_marketplaces_to_deployment(db, data['deployment'], data['marketplaces'])

        if deployments:
            db.expire_all()
            dep_ids = ', '.join([d.id for d in deployments])
            logger.info(f"The following Deployments have been created: {dep_ids}.")


def update_product(data, config, logger):
    product_id = data['id']
    with get_db_ctx_manager(config) as db:
        q = db.query(Product).filter_by(id=product_id)
        if db.query(q.exists()).scalar():
            logger.info(f"Updating product: {product_id}.")
            product = q.first()
            product.name = data['name']
            product.logo = data.get('icon')
            product.version = data['version']
            db.add(product)
            db.commit()


def get_ppr_new_version(db, deployment):
    version = (
        db.query(PPRVersion.version)
        .filter_by(deployment=deployment.id)
        .order_by(desc(PPRVersion.version))
        .with_for_update()
        .limit(1)
        .scalar()
    ) or 0
    new_version = version + 1
    return new_version


def create_ppr(ppr, context, deployment, db, client, logger):
    file_data = ppr.file
    new_version = get_ppr_new_version(db, deployment)
    config_kwargs = {}
    status = PPRVersion.STATUS.ready
    if not file_data:
        active_configuration = (
            db.query(Configuration)
            .filter_by(
                deployment=deployment.id,
                state=Configuration.STATE.active,
            ).one_or_none()
        )
        if not active_configuration:
            raise ExtensionHttpError.EXT_006(
                format_kwargs={'deployment_id': deployment.id},
            )
        config_kwargs.update({'configuration': active_configuration.id})
        previous_ppr = (
            db.query(PPRVersion)
            .filter_by(
                deployment=deployment.id,
                status=PPRVersion.STATUS.ready,
            )
            .order_by(desc(PPRVersion.version))
            .first()
        )
        data = None
        config_json = get_configuration_from_media(
            client, deployment.account_id, deployment.id, active_configuration.file,
        )
        product_info = (
            f"(product_id={deployment.product_id}, "
            f"product_version={deployment.product.version})"
        )
        if previous_ppr:
            logger.info(
                f"Start creation of PPR version {product_info}"
                f" based on previous PPR file: '{previous_ppr.id}'.",
            )
            data = get_ppr_from_media(
                client, deployment.account_id, deployment.id, previous_ppr.file,
            )
        else:
            logger.info(
                f"Start creation of PPR version {product_info}"
                f" based on previous product information.",
            )
        items = list(get_product_items(client, deployment.product.id))

        file, writer, wb = get_base_workbook(data)
        ws_list, summary = process_ppr(wb, deployment.product, config_json, items)

        for ws in ws_list:
            ws.to_excel(writer, ws.name, index=False)

        file_obj = open(file.name, 'rb')
        file_obj.seek(0, os.SEEK_END)
        file_size = file_obj.tell()
        file_obj.seek(0)
        writer.book.save(file_obj.name)

        file_name = PPR_FILE_NAME.format(
            product_id=deployment.product_id,
            version=new_version,
            timestamp=datetime.utcnow().strftime("%s"),
        )
        media_file = create_ppr_to_media(
            client, deployment.account_id, deployment.id, file_name, file_obj.read(), file_size,
        )
        file_obj.close()
        file_data = FileSchema(
            id=media_file['id'],
            name=file_name,
            location=media_file['file'],
            size=file_size,
            mime_type=File.MIME_TYPE.application_vnd_ms_xslx,
        )
    else:
        summary = {}
        data = get_ppr_from_media(client, deployment.account_id, deployment.id, file_data.id)
        dict_file = workbook_to_dict(pd.ExcelFile(data))
        errors = validate_ppr_schema(dict_file) or []
        if errors:
            summary.update({'errors': errors})
            status = PPRVersion.STATUS.failed
    try:
        file_instance = File(
            id=file_data.id,
            account_id=deployment.account_id,
            location=file_data.location,
            name=file_data.name,
            size=file_data.size,
            mime_type=file_data.mime_type,
            created_by=context.user_id,
        )
        db.add(file_instance)
        db.commit()

        new_ppr = PPRVersion(
            file=file_instance.id,
            deployment=deployment.id,
            version=new_version,
            product_version=deployment.product.version,
            summary=summary,
            status=status,
            created_by=context.user_id,
            **config_kwargs,
        )
        db.set_verbose(new_ppr)
        db.commit()
        return new_ppr

    except DBAPIError as ex:
        logger.error(ex)
        db.rollback()
        raise ExtensionHttpError.EXT_003()
