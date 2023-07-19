# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from typing import List

from connect.client import ConnectClient
from connect.eaas.core.decorators import (
    module_pages,
    proxied_connect_api,
    router,
    web_app,
)
from connect.eaas.core.inject.synchronous import get_installation, get_installation_client
from connect.eaas.core.extension import WebApplicationBase
from fastapi import Depends, Response, status
from sqlalchemy import exists
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import joinedload

from connect_ext_ppr.db import create_db, get_db, VerboseBaseSession
from connect_ext_ppr.errors import ExtensionHttpError
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.enums import ConfigurationStateChoices, DeploymentStatusChoices
from connect_ext_ppr.models.file import File
from connect_ext_ppr.service import add_deployments
from connect_ext_ppr.schemas import (
    ConfigurationCreateSchema,
    ConfigurationSchema,
    DeploymentRequestSchema,
    DeploymentSchema,
)
from connect_ext_ppr.utils import (
    _get_extension_client,
    _get_installation,
    filter_object_list_by_id,
    get_all_info,
    get_client_object,
    get_configuration_by_id,
    get_configuration_schema,
    get_deployment_by_id,
    get_deployment_request_schema,
    get_deployment_schema,
    get_hubs,
)


@web_app(router)
@module_pages(
    label='Deployments',
    url='/static/index.html',
)
@proxied_connect_api(
    {
        '/public/v1/media': 'edit',
    },
)
class ConnectExtensionXvsWebApplication(WebApplicationBase):

    @router.get(
        '/deployments/requests',
        summary='List all request accross deployments',
        response_model=List[DeploymentRequestSchema],
    )
    def list_deployment_requests(
        self,
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

        deployment_requests = db.query(DeploymentRequest).options(
            joinedload(DeploymentRequest.ppr),
            joinedload(DeploymentRequest.deployment),
        ).filter(
            DeploymentRequest.deployment_id.in_(deployments),
        )

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
        vendor = get_client_object(client, 'accounts', dep.product.owner_id)
        deployment = get_deployment_schema(dep, dep.product, vendor, hub)
        return deployment

    @router.get(
        '/deployments',
        summary='List all available deployments',
        response_model=List[DeploymentSchema],
    )
    def get_deployments(
        self,
        client: ConnectClient = Depends(get_installation_client),
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        deployments = db.query(Deployment).filter_by(account_id=installation['owner']['id'])
        listings = get_all_info(client)
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

    # example route for creation of deployment request
    @router.post(
        '/deployments/requests',
        summary='Create a new deployment request',
        response_model=DeploymentRequestSchema,
    )
    def add_dep_request(self, db: VerboseBaseSession = Depends(get_db)):
        deployment = db.query(Deployment).first()
        instance = DeploymentRequest(deployment_id=deployment.id)
        db.set_next_verbose(instance, 'deployment')
        db.commit()
        db.refresh(instance)
        return instance

    @router.get(
        '/deployments/{deployment_id}/configurations',
        summary='List all configuration available for the deployment',
        response_model=List[ConfigurationSchema],
    )
    def get_configurations(
        self,
        deployment_id: str,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)

        conf_file_list = (
            db.query(Configuration, File)
            .filter_by(deployment=deployment_id)
            .join(File, Configuration.file == File.id)
            .all()
        )
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
        configuration = get_configuration_by_id(configuration_id, deployment_id, db)

        file = db.query(File).get(configuration.file)
        return get_configuration_schema(configuration, file)

    @router.post(
        '/deployments/{deployment_id}/configurations',
        summary='Create a new configuration for the deployment',
        response_model=ConfigurationSchema,
    )
    def add_configuration(
        self,
        configuration: ConfigurationCreateSchema,
        deployment_id: str,
        db: VerboseBaseSession = Depends(get_db),
        installation: dict = Depends(get_installation),
    ):
        get_deployment_by_id(deployment_id, db, installation)
        file_data = configuration.file
        if db.query(exists().where(File.id == file_data.id)).scalar():
            raise ExtensionHttpError.EXT_002(
                format_kwargs={'obj_id': file_data.id},
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
            db.commit()

            prev_configuration = (
                db.query(Configuration)
                .filter_by(
                    deployment=deployment_id,
                    state=ConfigurationStateChoices.ACTIVE,
                )
                .one_or_none()
            )
            if prev_configuration:
                prev_configuration.state = ConfigurationStateChoices.INACTIVE

            configuration_instance = Configuration(
                file=file_data.id,
                deployment=deployment_id,
                state=ConfigurationStateChoices.ACTIVE,
            )
            db.set_verbose(configuration_instance)
            db.commit()
            return get_configuration_schema(configuration_instance, file_instance)

        except SQLAlchemyError as e:
            db.rollback()
            raise ExtensionHttpError.EXT_003(
                format_kwargs={'err': str(e)},
            )

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
        configuration = get_configuration_by_id(configuration_id, deployment_id, db)

        if configuration.state == ConfigurationStateChoices.ACTIVE:
            raise ExtensionHttpError.EXT_004(
                format_kwargs={'obj_id': configuration_id},
            )
        if deployment.status != DeploymentStatusChoices.SYNCED:
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

    @classmethod
    def on_startup(cls, logger, config):
        # When database schema is completely defined
        # here we are going to add migration based on alembic.
        create_db(config)
        logger.info('Database created...')
        client = _get_extension_client(logger)
        installation = _get_installation(client)
        if installation['owner']['id'] == installation['environment']['extension']['owner']['id']:
            listings = get_all_info(client)
            # For extension owner we do not have available the installation
            # event to handle populate Deployment table, so for this particular case
            # we make use of `on_startup` webapplication event function.
            add_deployments(installation, listings, config, logger)
