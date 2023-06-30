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
from connect_ext_ppr.utils import filter_products_list, get_products


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
        self.logger.info(f"Received {request['id']}")
        with model_manager(self.config) as db:
            q = db.query(Deployment).filter(Deployment.product_id == request['product']['id'])
            if db.query(q.exists()).scalar():
                dep = q.first()
                self.logger.info(
                    f"Deployment {dep.id} for product {request['product']['id']} already exists.",
                )
            else:
                products = get_products(self.installation_client)
                prod = filter_products_list(products, request['product']['id'])
                instance = Deployment(
                    product_id=prod['id'],
                    version=prod['version'],
                    vendor_id=prod['owner']['id'],
                    account_id=self.installation['owner']['id'],
                )
                db.set_verbose(instance)
                db.commit()
                db.refresh(instance)
                self.logger.info(
                    f"Added new deployment {instance.id} for product {request['product']['id']}.",
                )
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
        with model_manager(self.config) as db:
            q = db.query(Deployment).filter(Deployment.product_id == request['id'])
            if db.query(q.exists()).scalar():
                dep = q.first()
                if request["version"] == dep.version:
                    self.logger.info(
                        f"Product {request['id']} version of Deployment"
                        f" {dep.id} already up to date.",
                    )
                else:
                    previous_version = dep.version
                    dep.version = request['version']
                    db.commit()
                    self.logger.info(
                        f"Product {request['id']} version of Deployment {dep.id} was updated: "
                        f"{previous_version} -> {request['version']}.",
                    )
            else:
                instance = Deployment(
                    product_id=request['id'],
                    version=request['version'],
                    vendor_id=request['owner']['id'],
                    account_id=self.installation['owner']['id'],
                )
                db.set_verbose(instance)
                db.commit()
                db.refresh(instance)
                self.logger.info(
                    f"Added new Deployment {instance.id} for product {request['id']}.",
                )

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
                products = get_products(self.installation_client)
                add_deployments(self.installation, products, self.config, self.logger)
            except (ClientError, DBAPIError):
                return BackgroundResponse.reschedule()
        else:
            self.logger.info(
                f'This extension has removed by {account}: '
                f'id={request["id"]}, environment={request["environment"]["id"]}',
            )
        return BackgroundResponse.done()
