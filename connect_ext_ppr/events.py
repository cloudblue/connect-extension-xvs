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
from connect.eaas.core.responses import BackgroundResponse
from sqlalchemy.exc import DBAPIError

from connect_ext_ppr.service import (
    add_deployments,
    deactivate_marketplaces,
    process_ppr_from_product_update,
)
from connect_ext_ppr.utils import get_all_listing_info, get_marketplaces, get_products


@variables([
    {
        'name': 'DATABASE_URL',
        'initial_value': 'postgresql+psycopg2://postgres:1q2w3e@db/extension_xvs',
        'secure': True,
    },
    {
        'name': 'CBC_EXTENSION_DATABASE_URL',
        'initial_value': 'postgresql+psycopg2://postgres:1q2w3e@cbc_db/cbc_extension',
        'secure': True,
    },
    {
        'name': 'CBC_EXTENSION_SSL_ENABLED',
        'initial_value': 'True',
        'secure': False,
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
        mp = get_marketplaces(
            self.installation_client,
            [request['contract']['marketplace']['id']],
        ).first()

        request['contract']['marketplace'] = mp
        if request['status'] == 'listed':
            prod = get_products(self.installation_client, [request['product']['id']]).first()
            request['product'] = prod
            add_deployments(self.installation, [request], self.config, self.logger)
        else:
            deactivate_marketplaces(self.installation, [request], self.config, self.logger)
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
        in the Deployment object. If Deployment object does not exist in
        db, create a new one.
        '''
        self.logger.info(f"Product {request['id']} changed.")
        self.context.account_id = self.installation['owner']['id']
        self.context.user_id = self.installation['events']['installed']['by']['id']
        try:
            process_ppr_from_product_update(
                request, self.config, self.context, self.installation_client, self.logger,
            )
        except (ClientError, DBAPIError):
            return BackgroundResponse.reschedule()
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
                listings = get_all_listing_info(self.installation_client)
                add_deployments(self.installation, listings, self.config, self.logger)

                listings = get_all_listing_info(self.installation_client, status='unlisted')
                deactivate_marketplaces(self.installation, listings, self.config, self.logger)
            except (ClientError, DBAPIError):
                return BackgroundResponse.reschedule()
        else:
            self.logger.info(
                f'This extension has removed by {account}: '
                f'id={request["id"]}, environment={request["environment"]["id"]}',
            )
        return BackgroundResponse.done()
