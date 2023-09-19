from datetime import datetime

import pandas as pd
from sqlalchemy import exists, update
from sqlalchemy.exc import DBAPIError
from sqlalchemy.sql import desc

from connect_ext_ppr.constants import DESCRIPTION_TEMPLATE, PPR_FILE_NAME
from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.errors import ExtensionHttpError
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import (
    Deployment,
    DeploymentRequest,
    MarketplaceConfiguration,
)
from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Account, Product
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.schemas import clean_empties_from_dict, FileSchema, PPRVersionCreateSchema
from connect_ext_ppr.utils import (
    build_summary,
    create_ppr_to_media,
    get_base_workbook,
    get_configuration_from_media,
    get_file_size,
    get_ppr_from_media,
    get_product_items,
    get_user_data_from_auth_token,
    process_ppr,
    validate_configuration_schema,
    validate_ppr_schema,
    workbook_to_dict,
)


def upsert_account(db, account_data):
    account = db.query(Account).filter_by(id=account_data['id']).one_or_none()
    if not account:
        account = Account(id=account_data['id'])

    account.name = account_data['name']
    account.logo = account_data.get('icon')
    db.add(account)
    db.commit()


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
        upsert_account(db, product_data['owner'])
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
            deployment_id=deployment.id,
            marketplace=marketplace,
        )
        configs.append(mc)
    db.add_all(configs)
    db.commit()


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


def process_ppr_from_product_update(data, config, context, client, logger):
    with get_db_ctx_manager(config) as db:
        q = db.query(Product).filter_by(id=data['id'])
        if db.query(q.exists()).scalar():
            product = q.first()
            older_version = product.version
            update_product(data, db, product, logger)
            if data['version'] > older_version:
                ppr = PPRVersionCreateSchema()
                dep_qs = product.deployment.filter_by(account_id=context.account_id)
                logger.info(f"Product version changed: {older_version} -> {data['version']}.")
                for dep in dep_qs:
                    create_ppr(ppr, context.user_id, dep, db, client, logger)


def update_product(data, db, product, logger):
    logger.info(f"Updating product: {product.id}.")
    upsert_account(db, data['owner'])

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


def create_ppr(ppr, user_id, deployment, db, client, logger):
    file_data = ppr.file
    new_version = get_ppr_new_version(db, deployment)
    config_kwargs = {}
    config_json = {}
    status = PPRVersion.STATUS.ready
    active_configuration = None
    product_version = None
    if not file_data:
        active_configuration = (
            db.query(Configuration)
            .filter_by(
                deployment=deployment.id,
                state=Configuration.STATE.active,
            ).one_or_none()
        )
        if active_configuration:
            config_kwargs.update({'configuration': active_configuration.id})
            config_json = get_configuration_from_media(
                client, deployment.account_id, deployment.id, active_configuration.file,
            )
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
        product_version = deployment.product.version
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
                f" based on product information.",
            )
        items = list(get_product_items(client, deployment.product.id))

        file, writer, wb = get_base_workbook(data)
        ws_list, summary = process_ppr(wb, deployment.product, config_json, items)

        for ws in ws_list:
            ws.to_excel(writer, ws.name, index=False)

        file_obj = open(file.name, 'rb')
        writer.book.save(file_obj.name)

        file_size = get_file_size(file_obj)
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
        summary = clean_empties_from_dict(summary)
        desc_summary = build_summary(summary)
        description = ppr.description or file_data.name.rsplit('.', 1)[0]
        if db.query(exists().where(File.id == file_data.id)).scalar():
            raise ExtensionHttpError.EXT_002(
                format_kwargs={'obj_id': file_data.id},
            )
        file_instance = File(
            id=file_data.id,
            account_id=deployment.account_id,
            location=file_data.location,
            name=file_data.name,
            size=file_data.size,
            mime_type=file_data.mime_type,
            created_by=user_id,
        )
        db.add(file_instance)
        db.flush()

        new_ppr = PPRVersion(
            file=file_instance.id,
            deployment=deployment.id,
            version=new_version,
            product_version=product_version,
            description=DESCRIPTION_TEMPLATE.format(description=description, summary=desc_summary),
            summary=summary,
            status=status,
            created_by=user_id,
            **config_kwargs,
        )
        db.set_verbose(new_ppr)
        db.commit()

        logger.info(
            f"New PPR version created: (id={new_ppr.id}, version={new_ppr.version}"
            f", product_version={new_ppr.product_version}, file={new_ppr.file}).",
        )
        return new_ppr, file_instance, active_configuration

    except DBAPIError as ex:
        logger.error(ex)
        db.rollback()
        raise ExtensionHttpError.EXT_003()


def validate_configuration(client, deployment, file_data):
    data = get_configuration_from_media(client, deployment.account_id, deployment.id, file_data.id)
    return validate_configuration_schema(data, deployment.product_id)


def add_new_deployment_request(db, dr_data, deployment, account_id, logger):
    try:
        deployment_request = DeploymentRequest(
            deployment_id=dr_data.deployment.id,
            ppr_id=dr_data.ppr.id,
            manually=dr_data.manually,
            delegate_l2=dr_data.delegate_l2,
            created_by=account_id,
        )
        db.set_next_verbose(deployment_request, 'deployment_id')
        db.flush()
        db.refresh(deployment_request)

        for mp_data in dr_data.marketplaces:
            mc = MarketplaceConfiguration(
                deployment_request=deployment_request,
                marketplace=mp_data.id,
                pricelist_id=mp_data.pricelist.id if mp_data.pricelist else None,
            )
            db.add(mc)

        tasks = []
        tasks.append(Task(
            deployment_request_id=deployment_request.id,
            title='PPR Validation',
            type=Task.TYPES.ppr_validation,
            created_by=account_id,
        ))
        tasks.append(Task(
            deployment_request_id=deployment_request.id,
            title='Apply PP and delegate to marketplaces',
            type=Task.TYPES.apply_and_delegate,
            created_by=account_id,
        ))
        if deployment_request.delegate_l2:
            tasks.append(Task(
                deployment_request_id=deployment_request.id,
                title='Delegate to L2',
                type=Task.TYPES.delegate_to_l2,
                created_by=account_id,
            ))

        db.set_all_next_verbose(tasks, 'deployment_request_id')
        db.commit()
        return deployment_request
    except DBAPIError as ex:
        logger.error(ex)
        db.rollback()
        raise ExtensionHttpError.EXT_003()


def deactivate_marketplaces(installation, listings, config, logger):
    with get_db_ctx_manager(config) as db:
        for li in listings:
            marketplace_id = li['contract']['marketplace']['id']
            product_id = li['product']['id']
            hubs = [hub['hub']['id'] for hub in li['contract']['marketplace']['hubs']]
            deployments = [d.id for d in db.query(Deployment.id).filter_by(
                product_id=product_id,
                account_id=installation['owner']['id'],
            ).filter(
                Deployment.hub_id.in_(hubs),
            ).all()]

            stmt = (
                update(MarketplaceConfiguration)
                .where(
                    MarketplaceConfiguration.marketplace == marketplace_id,
                    MarketplaceConfiguration.deployment_id.in_(deployments))
                .values(active=False)
                .returning(MarketplaceConfiguration.deployment_id)
            )

            result = db.execute(stmt)
            logger.info(
                f'Marketplace {marketplace_id} has been deactivate from deployments {result.all()}',
            )

            deployments_requests = (
                db.query(DeploymentRequest.id)
                .filter(
                    DeploymentRequest.deployment_id.in_(deployments),
                    DeploymentRequest.status.in_([
                        DeploymentRequest.STATUSES.pending,
                        DeploymentRequest.STATUSES.processing,
                    ]),
                )
            )

            stmt = (
                update(MarketplaceConfiguration)
                .where(
                    MarketplaceConfiguration.marketplace == marketplace_id,
                    MarketplaceConfiguration.deployment_request_id.in_(
                        [dr.id for dr in deployments_requests],
                    ))
                .values(active=False)
                .returning(MarketplaceConfiguration.deployment_request_id)
            )

            result = db.execute(stmt)
            logger.info(
                f'Marketplace {marketplace_id} has been deactivate from deployments requests '
                f'{result.all()}',
            )

            db.commit()


class DeploymentRequestActionHandler:

    @classmethod
    def abort(cls, request, db, deployment_request):
        origin_state = deployment_request.status
        user_data = get_user_data_from_auth_token(request.headers['connect-auth'])
        by = user_data['id']
        deployment_request.aborting(by)
        db.flush()
        tasks = (
            db
            .query(Task)
            .filter_by(deployment_request_id=deployment_request.id, status=Task.STATUSES.pending)
            .with_for_update()
        )
        for task in tasks:
            task.abort(by)
        db.flush()
        if origin_state == DeploymentRequest.STATUSES.pending:
            deployment_request.abort_by_api(by)
        db.commit()
        return deployment_request

    @classmethod
    def retry(cls, db, deployment_request):
        most_recent_requests = (
            db
            .query(DeploymentRequest)
            .filter(
                DeploymentRequest.created_at > deployment_request.created_at,
                DeploymentRequest.deployment_id == deployment_request.deployment_id,
            )
            .order_by(DeploymentRequest.created_at.desc())
        )
        if db.query(most_recent_requests.exists()).scalar():
            new_requests = (
                ', '.join("(request_id={0}, status={1})"
                          .format(req.id, req.status) for req in most_recent_requests)
            )
            raise ExtensionHttpError.EXT_018(
                format_kwargs={
                    'dep_request_id': deployment_request.id,
                    'deployment_id': deployment_request.deployment_id,
                    'new_requests': new_requests,
                },
            )
        deployment_request.retry()
        db.flush()
        tasks = (
            db
            .query(Task)
            .filter_by(deployment_request_id=deployment_request.id, status=Task.STATUSES.error)
        )
        for task in tasks:
            task.retry()
        db.commit()
        return deployment_request
