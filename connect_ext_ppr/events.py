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

from connect_ext_ppr.models.deployment import Deployment
from connect_ext_ppr.models.utils import add_deployments, model_manager
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
            'unlisted', 'listed',
        ],
    )
    def handle_listing_processing(self, request):
        '''
        Listing processing event: create or not a new Deployment object base on the
        product contained in the listing.
        '''
        self.logger.info(f"Received listing {request['id']} status={request['status']}")
        if request['status'] == 'listed':
            mp = get_marketplaces(self.client, [request['contract']['marketplace']['id']]).first()
            request['contract']['marketplace'] = mp
            with model_manager(self.config) as db:
                for hub in request['contract']['marketplace']['hubs']:
                    q = db.query(Deployment).filter_by(
                        account_id=self.installation['owner']['id'],
                        product_id=request['product']['id'],
                        hub_id=hub['hub']['id'],
                    )
                    if db.query(q.exists()).scalar():
                        dep = q.first()
                        self.logger.info(
                            f"Deployment {dep.id} for hub {hub['hub']['id']} already exists.",
                        )
                    else:
                        instance = Deployment(
                            product_id=request['product']['id'],
                            hub_id=hub['hub']['id'],
                            account_id=self.installation['owner']['id'],
                            vendor_id=request['vendor']['id'],
                        )
                        db.set_verbose(instance)
                        db.commit()
                        db.refresh(instance)
                        self.logger.info(
                            f"Added new deployment {instance.id} for hub {hub['hub']['id']}.",
                        )
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
