# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from typing import List

from connect.client import ConnectClient
from connect.eaas.core.decorators import (
    router,
    web_app,
)
from connect.eaas.core.inject.synchronous import get_installation_client
from connect.eaas.core.extension import WebApplicationBase
from fastapi import Depends

from connect_ext_ppr.db import create_db, get_db, VerboseBaseSession
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest as Request
from connect_ext_ppr.models.utils import add_deployments
from connect_ext_ppr.schemas import (
    DeploymentRequestSchema,
    DeploymentSchema,
)
from connect_ext_ppr.utils import (
    _get_extension_client,
    _get_installation,
    filter_products_list,
    get_products,
)


@web_app(router)
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
    ):
        deployments = db.query(Deployment).all()
        products = get_products(client)
        response_list = []
        for dep in deployments:
            prod = filter_products_list(products, dep.product_id)
            response_list.append(
                DeploymentSchema(
                    id=dep.id,
                    account_id=dep.account_id,
                    product={
                        'id': dep.product_id,
                        'name': prod['name'],
                        'version': prod['version'],
                        'icon': prod.get('icon', None),
                    },
                    owner={
                        'id': dep.vendor_id,
                        'name': prod['owner']['name'],
                        'icon': prod['owner']['icon'],
                    },
                    events={'created': {'at': dep.created_at}},
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
        instance = Request(deployment=deployment.id)
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
            products = get_products(client)
            # For extension owner we do not have available the installation
            # event to handle populate Deployment table, so for this particular case
            # we make use of `on_startup` webapplication event function.
            add_deployments(installation, products, config, logger)
