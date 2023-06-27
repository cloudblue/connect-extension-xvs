# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from connect.eaas.core.decorators import (
    event,
    variables,
)
from connect.eaas.core.extension import EventsApplicationBase
from connect.eaas.core.responses import (
    BackgroundResponse,
)


@variables([
    {
        "name": "DATABASE_URL",
        "initial_value": "postgresql+psycopg2://postgres:1q2w3e@db/extension_xvs",
        "secure": True,
    },
])
class ConnectExtensionXvsEventsApplication(EventsApplicationBase):
    @event(
        'listing_processing',
        statuses=[
            'unlisted', 'listed',
        ],
    )
    def handle_listing_processing(self, request):
        self.logger.info(f'Received {request["id"]}')
        return BackgroundResponse.done()

    @event(
        'product_changed',
        statuses=[
            'draft', 'indevelopment', 'oncertification',
            'published', 'initializationfailed', 'deleted',
            'endofsale',
        ],
    )
    def handle_product_changed(self, request):
        self.logger.info(f'Received {request["id"]}')
        return BackgroundResponse.done()

    @event(
        'installation_status_change',
        statuses=['installed', 'uninstalled'],
    )
    def on_installation_status_change(self, request):
        self.logger.info(f'Installation status: {request["status"]}')
        return BackgroundResponse.done()
