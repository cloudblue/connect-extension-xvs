# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from typing import List

from connect.client import ConnectClient
from connect.eaas.core.decorators import (
    module_pages,
    router,
    web_app,
)
from connect.eaas.core.inject.synchronous import get_installation, get_installation_client
from connect.eaas.core.extension import WebApplicationBase
from fastapi import Depends

from connect_ext_ppr.db import create_db, get_db, VerboseBaseSession
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.service import add_deployments
from connect_ext_ppr.schemas import (
    DeploymentRequestSchema,
    DeploymentSchema,
)
from connect_ext_ppr.utils import (
    _get_extension_client,
    _get_installation,
    filter_object_list_by_id,
    get_all_info,
)


@web_app(router)
@module_pages(
    label='Deployments',
    url='/static/index.html',
)
class ConnectExtensionXvsWebApplication(WebApplicationBase):

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
        products = [li['product'] for li in listings]
        vendors = [li['vendor'] for li in listings]
        hubs = [hub['hub'] for li in listings for hub in li['contract']['marketplace']['hubs']]
        response_list = []
        for dep in deployments:
            prod = filter_object_list_by_id(products, dep.product_id)
            vendor = filter_object_list_by_id(vendors, dep.vendor_id)
            hub = filter_object_list_by_id(hubs, dep.hub_id)
            response_list.append(
                DeploymentSchema(
                    id=dep.id,
                    account_id=dep.account_id,
                    hub={
                        'id': dep.hub_id,
                        'name': hub['name'],
                    },
                    product={
                        'id': dep.product_id,
                        'name': prod['name'],
                        'icon': prod.get('icon', None),
                    },
                    owner={
                        'id': dep.vendor_id,
                        'name': vendor['name'],
                        'icon': vendor['icon'],
                    },
                    status=dep.status,
                    last_sync_at=dep.last_sync_at,
                    events={
                        'created': {'at': dep.created_at},
                        'updated': {'at': dep.updated_at},
                    },
                ),
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
        instance = DeploymentRequest(deployment=deployment.id)
        db.set_next_verbose(instance, 'deployment')
        db.commit()
        db.refresh(instance)
        return instance

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
