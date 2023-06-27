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
from connect.eaas.core.inject.synchronous import get_installation, get_installation_client
from connect.eaas.core.extension import WebApplicationBase
from fastapi import Depends

from connect_ext_ppr.db import create_database
from connect_ext_ppr.schemas import Product as ProductSchema
from connect_ext_ppr.utils import get_products


@web_app(router)
class ConnectExtensionXvsWebApplication(WebApplicationBase):

    @router.get(
        '/products',
        summary='List all available products',
        response_model=List[ProductSchema],
    )
    def get_products(
        self,
        client: ConnectClient = Depends(get_installation_client),
        installation: dict = Depends(get_installation),
    ):
        products = get_products(client)
        return [
            ProductSchema(
                id=p['id'],
                account_id=installation['owner']['id'],
                owner=p['owner'],
                version=p['version'],
                icon=p.get('icon', None),
                events={'created': {'at': p['events']['created']['at']}},
            ) for p in products
        ]

    @classmethod
    def on_startup(cls, logger, config):
        create_database(config)
        logger.info('Database created...')
