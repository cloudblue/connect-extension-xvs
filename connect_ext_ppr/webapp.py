# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from logging import Logger, LoggerAdapter
from typing import List

from connect.client import ConnectClient
from connect.client.rql import R
from connect.eaas.core.decorators import (
    module_pages,
    proxied_connect_api,
    router,
    web_app,
)
from connect.eaas.core.inject.common import get_logger
from connect.eaas.core.inject.synchronous import (
    get_installation,
    get_installation_client,
)
from connect.eaas.core.extension import WebApplicationBase
from fastapi import BackgroundTasks, Depends, Request, Response, status
from fastapi.responses import JSONResponse
from fastapi_filter import FilterDepends
from sqlalchemy import desc, exists
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import joinedload, selectinload, Session

from connect_ext_ppr.client.exception import ClientError
from connect_ext_ppr.db import (
    create_db,
    get_cbc_extension_db,
    get_config,
    get_db,
    VerboseBaseSession,
)
from connect_ext_ppr.errors import ExtensionHttpError, ExtensionValidationError
from connect_ext_ppr.filters import DeploymentFilter, DeploymentRequestFilter
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import (
    Deployment,
    DeploymentRequest,
    MarketplaceConfiguration,
)
from connect_ext_ppr.models.enums import ConfigurationStateChoices, DeploymentStatusChoices
from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.pagination import apply_pagination, PaginationParams
from connect_ext_ppr.service import (
    add_deployments,
    add_new_deployment_request,
    create_ppr,
    deactivate_marketplaces,
    DeploymentRequestActionHandler,
    validate_configuration,
)
from connect_ext_ppr.schemas import (
    BatchProcessResponseSchema,
    BatchSchema,
    ConfigurationCreateSchema,
    ConfigurationSchema,
    DeploymentRequestCreateSchema,
    DeploymentRequestSchema,
    DeploymentSchema,
    HubSchema,
    MarketplaceSchema,
    PPRVersionCreateSchema,
    PPRVersionSchema,
    ProductSchema,
    TaskSchema,
)
from connect_ext_ppr.services.pricing import (
    fetch_and_validate_batch,
    identify_marketplaces,
    identify_reseller_id,
    prepare_file,
    process_batch,
)
from connect_ext_ppr.tasks_manager import main_process
from connect_ext_ppr.utils import (
    _get_extension_client,
    _get_installation,
    filter_object_list_by_id,
    get_all_listing_info,
    get_client_object,
    get_configuration_schema,
    get_deployment_by_id,
    get_deployment_request_by_id,
    get_deployment_request_schema,
    get_deployment_schema,
    get_hub,
    get_hubs,
    get_instance_by_id,
    get_marketplace_schema,
    get_marketplaces,
    get_ppr_version_schema,
    get_product_schema,
    get_task_schema,
    get_user_data_from_auth_token,
)
from connect_ext_ppr.validator import (
    validate_deployment,
    validate_dr_marketplaces,
    validate_marketplaces_ppr,
    validate_ppr_version_belongs_to_deployment,
)


@web_app(router)
@module_pages(
    label='Deployments',
    url='/static/index.html',
)
@proxied_connect_api(
    {
        '/public/v1/media': 'edit',
        '/files': 'view',
    },
)
class ConnectExtensionXvsWebApplication(WebApplicationBase):
    # example route for creation of deployment request
    @router.post(
        '/deployments/requests',
        summary='Create a new deployment request',
        response_model=DeploymentRequestSchema,
        status_code=status.HTTP_201_CREATED,
    )
    def add_dep_request(
        self,
        deployment_request: DeploymentRequestCreateSchema,
        background_tasks: BackgroundTasks,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
        config: dict = Depends(get_config),
        logger: Logger = Depends(get_logger),
    ):
        account_id = installation['owner']['id']
        deployment = db.query(Deployment).filter_by(id=deployment_request.deployment.id).first()
        validate_deployment(deployment, account_id)

        open_dr = db.query(DeploymentRequest).filter(
            DeploymentRequest.deployment_id.like(deployment_request.deployment.id),
            DeploymentRequest.status.in_(
                [DeploymentRequest.STATUSES.pending, DeploymentRequest.STATUSES.processing],
            ),
        )

        if db.query(open_dr.exists()).scalar():
            raise ExtensionHttpError.EXT_017()

        ppr = db.query(PPRVersion).filter_by(id=deployment_request.ppr.id).first()
        validate_ppr_version_belongs_to_deployment(ppr, deployment)

        dep_marketplaces = db.query(MarketplaceConfiguration).filter_by(
            active=True,
            deployment_id=deployment.id,
        )
        dr_marketplaces = [m.id for m in deployment_request.marketplaces.choices]
        validate_dr_marketplaces(
            dr_marketplaces,
            [m.marketplace for m in dep_marketplaces],
        )

        validate_marketplaces_ppr(ppr, dr_marketplaces, dep_marketplaces)

        instance = add_new_deployment_request(
            db, deployment_request, deployment, account_id, logger,
        )

        background_tasks.add_task(main_process, instance.id, config)

        hub = get_client_object(client, 'hubs', instance.deployment.hub_id)
        return get_deployment_request_schema(instance, hub)

    @router.get(
        '/deployments/requests',
        summary='List all requests across deployments',
        response_model=List[DeploymentRequestSchema],
    )
    def list_deployment_requests(
        self,
        dr_filter: DeploymentRequestFilter = FilterDepends(DeploymentRequestFilter),
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        hubs_ids = [
            h[0] for h in db.query(Deployment.hub_id).filter_by(
                account_id=installation['owner']['id'],
            ).distinct()
        ]
        hubs = get_hubs(client, hubs_ids)

        deployments = db.query(Deployment.id).filter_by(
            account_id=installation['owner']['id'],
        )

        deployment_requests = db.query(DeploymentRequest).join(
            DeploymentRequest.deployment, DeploymentRequest.ppr,
        ).filter(
            DeploymentRequest.deployment_id.in_(deployments),
        )
        deployment_requests = dr_filter.filter(deployment_requests)
        deployment_requests = dr_filter.sort(deployment_requests)
        deployment_requests = apply_pagination(deployment_requests, db, pagination_params, response)

        response_list = []
        for dr in deployment_requests:
            response_list.append(
                get_deployment_request_schema(
                    dr,
                    filter_object_list_by_id(hubs, dr.deployment.hub_id),
                ),
            )

        return response_list

    @router.get(
        '/deployments/requests/{depl_req_id}',
        summary='Deployment Request details',
        response_model=DeploymentRequestSchema,
    )
    def get_deployment_request(
        self,
        depl_req_id: str,
        db: VerboseBaseSession = Depends(get_db),
        client: ConnectClient = Depends(get_installation_client),
        installation: dict = Depends(get_installation),
    ):
        dr = (
            db.query(DeploymentRequest).options(
                joinedload(DeploymentRequest.ppr),
                joinedload(DeploymentRequest.deployment),
            )
            .filter(
                DeploymentRequest.deployment.has(account_id=installation['owner']['id']),
                DeploymentRequest.id == depl_req_id)
            .first()
        )
        if dr:
            hub = get_hub(client, dr.deployment.hub_id)
            return get_deployment_request_schema(dr, hub)
        raise ExtensionHttpError.EXT_001(
            format_kwargs={'obj_id': depl_req_id},
            status_code=status.HTTP_404_NOT_FOUND,
        )

    @router.get(
        '/deployments/requests/{depl_req_id}/tasks',
        summary='List all tasks in scope of a deployment request',
        response_model=List[TaskSchema],
    )
    def list_deployment_request_tasks(
        self,
        depl_req_id: str,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        dr = get_deployment_request_by_id(depl_req_id, db, installation)
        if dr:
            task_list = []
            tasks = db.query(Task).filter_by(deployment_request=dr.id).order_by(Task.id)
            for task in tasks:
                task_list.append(get_task_schema(task))
            return task_list

    @router.get(
        '/deployments/requests/{depl_req_id}/marketplaces',
        summary='List all marketplaces in scope of a deployment request',
        response_model=List[MarketplaceSchema],
    )
    def list_deployment_request_marketplaces(
        self,
        depl_req_id: str,
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        db: VerboseBaseSession = Depends(get_db),
        client: ConnectClient = Depends(get_installation_client),
        installation: dict = Depends(get_installation),
    ):
        dr = get_deployment_request_by_id(depl_req_id, db, installation)

        marketplaces_list = []
        marketplaces = db.query(MarketplaceConfiguration).options(
            selectinload(MarketplaceConfiguration.ppr),
        ).filter_by(deployment_request=dr.id)
        marketplaces = apply_pagination(marketplaces, db, pagination_params, response)

        marketplaces_pprs = {m.marketplace: m.ppr for m in marketplaces}
        marketplaces_data = get_marketplaces(client, list(marketplaces_pprs.keys()))

        for marketplace in marketplaces_data:
            marketplaces_list.append(
                get_marketplace_schema(marketplace, marketplaces_pprs.get(marketplace['id'])),
            )
        return marketplaces_list

    @router.post(
        '/deployments/requests/{depl_req_id}/abort',
        summary='Abort a deployment request',
        response_model=DeploymentRequestSchema,
    )
    def abort(
        self,
        depl_req_id: str,
        db: VerboseBaseSession = Depends(get_db),
        client: ConnectClient = Depends(get_installation_client),
        installation: dict = Depends(get_installation),
        request: Request = None,
    ):
        dr = get_deployment_request_by_id(depl_req_id, db, installation)
        dr = DeploymentRequestActionHandler.abort(request, db, dr)
        hub = get_hub(client, dr.deployment.hub_id)
        return get_deployment_request_schema(dr, hub)

    @router.post(
        '/deployments/requests/{depl_req_id}/retry',
        summary='Retry a deployment request',
        response_model=DeploymentRequestSchema,
    )
    def retry(
        self,
        depl_req_id: str,
        background_tasks: BackgroundTasks,
        db: VerboseBaseSession = Depends(get_db),
        client: ConnectClient = Depends(get_installation_client),
        installation: dict = Depends(get_installation),
        config: dict = Depends(get_config),
    ):
        dr = get_deployment_request_by_id(depl_req_id, db, installation)
        dr = DeploymentRequestActionHandler.retry(db, dr)

        background_tasks.add_task(main_process, dr.id, config)

        hub = get_hub(client, dr.deployment.hub_id)
        return get_deployment_request_schema(dr, hub)

    @router.get(
        '/deployments/{deployment_id}',
        summary='Deployment details',
        response_model=DeploymentSchema,
    )
    def get_deployment(
        self,
        deployment_id: str,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
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

        hub = get_client_object(client, 'hubs', dep.hub_id)
        product = get_client_object(client, 'products', dep.product.id)
        vendor = product['owner']
        deployment = get_deployment_schema(dep, dep.product, vendor, hub)
        return deployment

    @router.get(
        '/deployments/{deployment_id}/requests',
        summary='List all deployment requests in scope of a deployment',
        response_model=List[DeploymentRequestSchema],
    )
    def list_requests_for_deployment(
        self,
        deployment_id: str,
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        dep = get_deployment_by_id(deployment_id, db, installation)

        hub = get_hub(client, dep.hub_id)

        response_list = []
        qs = (
            db
            .query(DeploymentRequest)
            .filter_by(deployment_id=deployment_id)
            .order_by(desc(DeploymentRequest.id))
        )

        for dr in apply_pagination(qs, db, pagination_params, response):
            response_list.append(get_deployment_request_schema(dr, hub))
        return response_list

    @router.get(
        '/deployments',
        summary='List all available deployments',
        response_model=List[DeploymentSchema],
    )
    def get_deployments(
        self,
        deployment_filter: DeploymentFilter = FilterDepends(DeploymentFilter),
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        deployments = db.query(Deployment).filter_by(account_id=installation['owner']['id'])
        deployments = deployment_filter.filter(deployments)
        deployments = apply_pagination(deployments, db, pagination_params, response)
        listings = get_all_listing_info(client)
        vendors = [li['vendor'] for li in listings]
        hubs = [hub['hub'] for li in listings for hub in li['contract']['marketplace']['hubs']]
        response_list = []
        for dep in deployments:
            vendor = filter_object_list_by_id(vendors, dep.vendor_id)
            hub = filter_object_list_by_id(hubs, dep.hub_id)
            response_list.append(
                get_deployment_schema(dep, dep.product, vendor, hub),
            )
        return response_list

    @router.get(
        '/deployments/{deployment_id}/configurations',
        summary='List all configuration available for the deployment',
        response_model=List[ConfigurationSchema],
    )
    def get_configurations(
        self,
        deployment_id: str,
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)

        conf_file_qs = (
            db.query(Configuration, File)
            .filter_by(deployment=deployment_id)
            .join(File, Configuration.file == File.id)
        )
        conf_file_list = apply_pagination(conf_file_qs, db, pagination_params, response)
        response_list = []
        for conf, file in conf_file_list:
            response_list.append(
                get_configuration_schema(conf, file),
            )
        return response_list

    @router.get(
        '/deployments/{deployment_id}/configurations/{configuration_id}',
        summary='Configuration details',
        response_model=ConfigurationSchema,
    )
    def get_configuration(
        self,
        deployment_id: str,
        configuration_id: str,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)
        configuration = get_instance_by_id(Configuration, configuration_id, deployment_id, db)

        file = db.query(File).get(configuration.file)
        return get_configuration_schema(configuration, file)

    @router.post(
        '/deployments/{deployment_id}/configurations',
        summary='Create a new configuration for the deployment',
        response_model=ConfigurationSchema,
        status_code=status.HTTP_201_CREATED,
    )
    def add_configuration(
        self,
        configuration: ConfigurationCreateSchema,
        deployment_id: str,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
        request: Request = None,
    ):
        deployment = get_deployment_by_id(deployment_id, db, installation)
        file_data = configuration.file
        if db.query(exists().where(File.id == file_data.id)).scalar():
            raise ExtensionHttpError.EXT_002(
                format_kwargs={'obj_id': file_data.id},
            )
        errors = validate_configuration(client, deployment, file_data)
        if errors:
            raise ExtensionValidationError.VAL_000(
                format_kwargs={'validation_error': errors},
            )

        try:
            file_instance = File(
                id=file_data.id,
                account_id=installation['owner']['id'],
                location=file_data.location,
                name=file_data.name,
                size=file_data.size,
                mime_type=file_data.mime_type,
            )
            db.add(file_instance)
            db.flush()

            prev_configuration = (
                db.query(Configuration)
                .filter_by(
                    deployment=deployment_id,
                    state=ConfigurationStateChoices.active,
                )
                .one_or_none()
            )
            if prev_configuration:
                prev_configuration.state = ConfigurationStateChoices.inactive

            user_data = get_user_data_from_auth_token(request.headers['connect-auth'])
            configuration_instance = Configuration(
                file=file_data.id,
                deployment=deployment_id,
                state=ConfigurationStateChoices.active,
                created_by=user_data,
                updated_by=user_data,
            )
            db.set_verbose(configuration_instance)
            db.commit()
            return get_configuration_schema(configuration_instance, file_instance)

        except SQLAlchemyError:
            db.rollback()
            raise ExtensionHttpError.EXT_003()

    @router.delete(
        '/deployments/{deployment_id}/configurations/{configuration_id}',
        summary='Delete configuration',
        response_model=None,
    )
    def remove_configuration(
        self,
        deployment_id: str,
        configuration_id: str,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        deployment = get_deployment_by_id(deployment_id, db, installation)
        configuration = get_instance_by_id(Configuration, configuration_id, deployment_id, db)

        if configuration.state == ConfigurationStateChoices.active:
            raise ExtensionHttpError.EXT_004(
                format_kwargs={'obj_id': configuration_id},
            )
        if deployment.status != DeploymentStatusChoices.synced:
            raise ExtensionHttpError.EXT_005(
                format_kwargs={'obj_id': configuration_id},
            )

        file = db.query(File).get(configuration.file)
        path = (
            f'media/folders/accounts/{deployment.account_id}/{deployment_id}/'
            f'configurations/files/{file.id}'
        )
        db.delete(file)
        db.delete(configuration)
        db.commit()
        client.delete(path)

        return Response(status_code=204)

    @router.get(
        '/deployments/{deployment_id}/pprs',
        summary='List all PPRs available for the deployment',
        response_model=List[PPRVersionSchema],
    )
    def get_pprs(
        self,
        deployment_id: str,
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)

        ppr_file_conf_qs = (
            db.query(PPRVersion, File, Configuration)
            .filter_by(deployment=deployment_id)
            .join(File, PPRVersion.file == File.id)
            .outerjoin(Configuration, PPRVersion.configuration == Configuration.id)
            .order_by(desc(PPRVersion.version))
        )
        ppr_file_conf_list = apply_pagination(ppr_file_conf_qs, db, pagination_params, response)
        response_list = []
        for ppr, file, conf in ppr_file_conf_list:
            response_list.append(
                get_ppr_version_schema(ppr, file, conf),
            )

        return response_list

    @router.get(
        '/deployments/{deployment_id}/pprs/{ppr_version_id}',
        summary='PPR details',
        response_model=PPRVersionSchema,
    )
    def get_ppr(
        self,
        deployment_id: str,
        ppr_version_id: str,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)
        ppr_version = get_instance_by_id(PPRVersion, ppr_version_id, deployment_id, db)

        file = db.query(File).get(ppr_version.file)
        configuration = db.query(Configuration).get(ppr_version.configuration)

        return get_ppr_version_schema(ppr_version, file, configuration)

    @router.post(
        '/deployments/{deployment_id}/pprs',
        summary='Create a new PPR for the deployment',
        response_model=PPRVersionSchema,
        status_code=status.HTTP_201_CREATED,
    )
    def add_ppr(
        self,
        ppr_version: PPRVersionCreateSchema,
        deployment_id: str,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
        logger: Logger = Depends(get_logger),
        request: Request = None,
    ):
        deployment = get_deployment_by_id(deployment_id, db, installation)
        user_data = get_user_data_from_auth_token(request.headers['connect-auth'])
        ppr_version_instance, file_instance, configuration = create_ppr(
            ppr_version, user_data['id'], deployment, db, client, logger,
        )
        return get_ppr_version_schema(ppr_version_instance, file_instance, configuration)

    @router.get(
        '/deployments/{deployment_id}/marketplaces',
        summary="Deployment's marketplaces",
        response_model=List[MarketplaceSchema],
    )
    def get_marketplaces_by_deployment(
        self,
        deployment_id: str,
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)

        mkplc_configs = db.query(MarketplaceConfiguration).options(
            selectinload(MarketplaceConfiguration.ppr),
        ).filter_by(deployment_id=deployment_id, active=True)
        mkplc_configs = apply_pagination(mkplc_configs, db, pagination_params, response)

        mkplc_ids = [m.marketplace for m in mkplc_configs]

        marketplaces = get_marketplaces(client, mkplc_ids)
        response_list = []
        for mkplc_config in mkplc_configs:
            m_data = filter_object_list_by_id(marketplaces, mkplc_config.marketplace)
            response_list.append(get_marketplace_schema(m_data, mkplc_config.ppr))
        return response_list

    @router.get(
        '/products',
        summary='List all products availables for account',
        response_model=List[ProductSchema],
    )
    def list_products(
        self,
        pagination_params: PaginationParams = Depends(),
        response: Response = None,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        products_ids = db.query(Deployment.product_id).filter_by(
            account_id=installation['owner']['id'],
        ).distinct()
        products = db.query(Product).filter(Product.id.in_(products_ids)).options(
            selectinload(Product.owner),
        )
        products = apply_pagination(products, db, pagination_params, response)

        response_list = []
        for product in products:
            response_list.append(get_product_schema(product))

        return response_list

    @router.get(
        '/products/{product_id}/hubs',
        summary="List all product's hub",
        response_model=List[HubSchema],
    )
    def list_hubs_by_product(
        self,
        product_id: str,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        hubs_ids = [
            h[0] for h in db.query(Deployment.hub_id).filter_by(
                account_id=installation['owner']['id'],
                product_id=product_id,
            ).distinct()
        ]
        reponse_list = []
        for hub in get_hubs(client, hubs_ids):
            reponse_list.append(
                HubSchema(id=hub['id'], name=hub['name'], instance={'id': hub['instance']['id']}),
            )
        return reponse_list

    @router.get(
        '/deployments/{deployment_id}/pricing/batches',
        summary='List Pricing Batch for Deployment',
        response_model=List[BatchSchema],
    )
    def get_deployment_batches(
        self,
        deployment_id: str,
        db: VerboseBaseSession = Depends(get_db),
        client: ConnectClient = Depends(get_installation_client),
        installation: dict = Depends(get_installation),
    ):
        deployment = get_deployment_by_id(deployment_id, db, installation)
        marketplace_ids = identify_marketplaces(
            client,
            deployment.hub_id,
        )

        batches = list(client('pricing').batches.filter(
            R().stream.owner.id.eq(deployment.account_id),
            R().stream.context.product.id.eq(deployment.product_id),
            R().stream.context.marketplace.id.in_(marketplace_ids),
            R().test.ne(True),
            R().status.eq('published'),
        ))

        return [BatchSchema(**b) for b in batches]

    @router.post(
        '/deployments/{deployment_id}/pricing/batches/{batch_id}/process',
        summary='Process Pricing Batch for Deployment',
        response_model=BatchProcessResponseSchema,
    )
    def process_pricing_batch(
        self,
        deployment_id: str,
        batch_id: str,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        cbc_db: Session = Depends(get_cbc_extension_db),
        installation: dict = Depends(get_installation),
        logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            deployment = get_deployment_by_id(deployment_id, db, installation)
            batch = fetch_and_validate_batch(client, batch_id, deployment)
            reseller_id = identify_reseller_id(client, batch, deployment)
            file_name, dataset = prepare_file(client, batch_id)

            data_id = process_batch(
                cbc_db,
                file_name,
                reseller_id,
                deployment,
                dataset,
            )

            response = BatchProcessResponseSchema(
                task_info=f'/flat-catalog/price-import-wizard/{data_id}/set-prices',
            )
            return JSONResponse(
                status_code=202,
                content=response.dict(),
            )
        except ClientError as e:
            logger.exception(f'Error while uploading price file for {batch_id}')
            return JSONResponse(status_code=400, content=e.json if e.json else {})

    @classmethod
    def on_startup(cls, logger, config):
        # When database schema is completely defined
        # here we are going to add migration based on alembic.
        create_db(config)
        logger.info('Database created...')
        client = _get_extension_client(logger)
        installation = _get_installation(client)
        if installation['owner']['id'] == installation['environment']['extension']['owner']['id']:
            listings = get_all_listing_info(client)
            # For extension owner we do not have available the installation
            # event to handle populate Deployment table, so for this particular case
            # we make use of `on_startup` webapplication event function.
            add_deployments(installation, listings, config, logger)

            listings = get_all_listing_info(client, status='unlisted')
            deactivate_marketplaces(installation, listings, config, logger)
