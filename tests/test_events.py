# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from connect.client import ClientError
from connect.client.rql import R
import pytest

from connect_ext_ppr.events import ConnectExtensionXvsEventsApplication


@pytest.mark.parametrize(
    'status',
    ('listed', 'unlisted'),
)
def test_handle_listing_processing(
    connect_client,
    client_mocker_factory,
    logger,
    listing,
    marketplace,
    installation,
    dbsession,
    status,
):
    config = {}
    listing['status'] = status
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
    client_mocker_factory,
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
