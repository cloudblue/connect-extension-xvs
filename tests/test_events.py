# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
import json

from connect.client import ClientError
from connect.client.rql import R
import pytest

from connect_ext_ppr.events import ConnectExtensionXvsEventsApplication
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Product


def test_handle_listing_processing_listed(
    connect_client,
    client_mocker_factory,
    logger,
    listing,
    marketplace,
    installation,
    dbsession,
    product,
):
    config = {}
    listing['status'] = 'listed'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces.filter(R().id.in_([marketplace['id']])).limit(1).mock(
        return_value=[marketplace],
    )
    rql = R().visibility.listing.eq(True)
    rql |= R().visibility.syndication.eq(True)
    rql & R().id.in_([product['id']])
    client_mocker.products.filter(rql).limit(1).mock(
        return_value=[product],
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
    common_context,
    deployment_factory,
):
    config = {}
    deployment = deployment_factory(product_id=product['id'], vendor_id='VA-123-123')
    product_obj = deployment.product
    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
        context=common_context,
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
    common_context,
):
    config = {}

    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
        context=common_context,
    )
    result = ext.handle_product_changed(product)
    assert result.status == 'success'
    q = dbsession.query(Product).filter_by(id=product['id'])
    assert not dbsession.query(q.exists()).scalar()


def test_handle_ppr_creation_from_product_update(
    product,
    item_response,
    media_response,
    dbsession,
    logger,
    installation,
    common_context,
    connect_client,
    deployment_factory,
    configuration_factory,
    configuration_json,
    client_mocker_factory,
    file_factory,
):
    config = {}
    new_product_version = product['version'] = 4
    dep1 = deployment_factory(product_id=product['id'])
    prod_obj = dep1.product
    dep2 = deployment_factory(product_id=product['id'], hub_id='HB-1111-3333')
    config_file = file_factory(
        id='MFL-YYY',
        mime_type='application/json',
    )
    for dep, media_id in ((dep1, 'MFL-WWW'), (dep2, 'MFL-ZZZ')):
        configuration_factory(file=config_file.id, deployment=dep.id)
        client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
        client_mocker.ns('media').ns('folders').ns('accounts').collection(
            f'{dep.account_id}/{dep.id}/configurations/files',
        )[config_file.id].get(
            return_value=configuration_json,
        )

        client_mocker.products[dep.product_id].items.all().mock(
            return_value=[item_response],
        )
        media_response['id'] = media_id
        client_mocker.ns('media').ns('folders').ns('accounts').collection(
            f'{dep.account_id}/{dep.id}/pprs/files',
        ).create(
            return_value=json.dumps(media_response),
        )

    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
        context=common_context,
    )
    qs = dbsession.query(PPRVersion).filter_by(product_version=new_product_version)
    result = ext.handle_product_changed(product)
    assert result.status == 'success'
    assert qs.count() == 2
    assert prod_obj.version == new_product_version


def test_reschedule_product_change(
    product,
    dbsession,
    logger,
    installation,
    common_context,
    connect_client,
    mocker,
):
    config = {}
    ext = ConnectExtensionXvsEventsApplication(
        connect_client, logger, config,
        installation=installation,
        installation_client=connect_client,
        context=common_context,
    )
    mocker.patch(
        'connect_ext_ppr.events.process_ppr_from_product_update',
        side_effect=ClientError,
    )
    result = ext.handle_product_changed(product)
    assert result.status == 'reschedule'


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
    product,
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
        rql = R().visibility.listing.eq(True)
        rql |= R().visibility.syndication.eq(True)
        rql & R().id.in_([product['id']])
        client_mocker.products.filter(rql).mock(
            return_value=[product],
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
