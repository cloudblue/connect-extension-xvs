# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from connect.client import ClientError
from connect.client.rql import R
import pytest

from connect_ext_ppr.events import ConnectExtensionXvsEventsApplication
from connect_ext_ppr.models.replicas import Product


def test_handle_listing_processing_listed(
    connect_client,
    client_mocker_factory,
    logger,
    listing,
    marketplace,
    installation,
    dbsession,
):
    config = {}
    listing['status'] = 'listed'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces.filter(R().id.in_([marketplace['id']])).limit(1).mock(
        return_value=[marketplace],
    )

    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.handle_listing_processing(listing)
    assert result.status == 'success'

    product_data = listing['product']
    q = dbsession.query(Product).filter_by(id=product_data['id'])
    assert q.count() == 1
    product = q.first()
    assert product.name == product_data['name']
    assert product.owner_id == listing['vendor']['id']
    assert product.logo == product_data['icon']


def test_handle_listing_processing_unlisted(
    connect_client,
    logger,
    listing,
    installation,
    dbsession,
):
    config = {}
    listing['status'] = 'unlisted'

    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.handle_listing_processing(listing)
    assert result.status == 'success'

    product_data = listing['product']
    q = dbsession.query(Product).filter_by(id=product_data['id'])
    assert q.count() == 0


def test_handle_listing_processing_deployment_exists(
    connect_client,
    client_mocker_factory,
    logger,
    listing,
    marketplace,
    installation,
    dbsession,
    deployment,
):
    config = {}
    listing['status'] = 'listed'
    listing['product']['id'] = deployment.product.id
    marketplace['hubs'][0]['hub']['id'] = deployment.hub_id
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.marketplaces.filter(R().id.in_([marketplace['id']])).limit(1).mock(
        return_value=[marketplace],
    )
    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.handle_listing_processing(listing)
    assert result.status == 'success'


def test_handle_product_changed(
    connect_client,
    dbsession,
    logger,
    installation,
    product,
    product_factory,
):
    config = {}
    product_obj = product_factory(id=product['id'], owner_id='VA-123-123')
    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.handle_product_changed(product)
    assert result.status == 'success'
    dbsession.refresh(product_obj)
    assert product_obj.name == product['name']
    assert product_obj.owner_id == 'VA-123-123'
    assert product_obj.owner_id != product['owner']['id']
    assert product_obj.logo == product['icon']


def test_ignore_product_changed(
    connect_client,
    dbsession,
    logger,
    installation,
    product,
):
    config = {}

    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.handle_product_changed(product)
    assert result.status == 'success'
    q = dbsession.query(Product).filter_by(id=product['id'])
    assert not dbsession.query(q.exists()).scalar()


@pytest.mark.parametrize(
    'status',
    ('installed', 'uninstalled'),
)
def test_handle_installation_changed(
    connect_client,
    client_mocker_factory,
    dbsession,
    logger,
    installation,
    listing,
    marketplace,
    status,
):
    config = {}

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    if status == 'installed':
        client_mocker.listings.filter(status="listed").mock(
            return_value=[listing],
        )
        client_mocker.marketplaces.filter(id__in=[marketplace['id']]).mock(
            return_value=[marketplace],
        )
    installation['status'] = status
    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.on_installation_status_change(installation)
    assert result.status == 'success'


def test_on_installation_reschedule(
    connect_client,
    mocker,
    dbsession,
    logger,
    installation,
):
    config = {}

    mocker.patch(
        'connect_ext_ppr.utils.get_marketplaces',
        side_effect=ClientError(),
    )
    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
    )
    result = ext.on_installation_status_change(installation)
    assert result.status == 'reschedule'
