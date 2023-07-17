# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from connect.client import ClientError
from connect.eaas.core.decorators import (
    event,
    variables,
)
from connect.eaas.core.extension import EventsApplicationBase
from connect.eaas.core.responses import (
    BackgroundResponse,
)
from sqlalchemy.exc import DBAPIError

from connect_ext_ppr.service import add_deployments, update_product
from connect_ext_ppr.utils import get_all_info, get_marketplaces


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
            'listed',
        ],
    )
    def handle_listing_processing(self, request):
        '''
        Listing processing event: create or not a new Deployment object base on the
        product contained in the listing.
        '''
        self.logger.info(f"Received listing {request['id']} status={request['status']}")
        if request['status'] == 'listed':
            mp = get_marketplaces(
                self.installation_client,
                [request['contract']['marketplace']['id']],
            ).first()
            request['contract']['marketplace'] = mp
            add_deployments(self.installation, [request], self.config, self.logger)
        else:
            self.logger.info(f"Skipping event for listing {request['id']}.")
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
        '''
        Product change event: update or not the product version present
        in the Deployment object. If Deployment object does not exists in
        db, create a new one.
        '''
        self.logger.info(f"Product {request['id']} changed.")
        update_product(request, self.config, self.logger)
        return BackgroundResponse.done()

    @event(
        'installation_status_change',
        statuses=['installed', 'uninstalled'],
    )
    def on_installation_status_change(self, request):
        '''
        Installation status change event: populate Deployment table
        creating new Deployment object for each product visible by
        the installation owner.
        TODO: remove all data if extension is removed.
        '''
        account = f"{request['owner']['name']} ({request['owner']['id']})"
        if request['status'] == 'installed':
            self.logger.info(
                f"This extension has been installed by {account}: "
                f"id={request['id']}, environment={request['environment']['id']}",
            )
            try:
                listings = get_all_info(self.installation_client)
                add_deployments(self.installation, listings, self.config, self.logger)
            except (ClientError, DBAPIError):
                return BackgroundResponse.reschedule()
        else:
            self.logger.info(
                f'This extension has removed by {account}: '
                f'id={request["id"]}, environment={request["environment"]["id"]}',
            )
        return BackgroundResponse.done()
