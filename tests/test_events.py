# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from connect_ext_ppr.events import ConnectExtensionXvsEventsApplication


def test_handle_listing_processing(
    connect_client,
    client_mocker_factory,
    logger,
    listing,
    product,
    installation,
):
    config = {}
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products.all().mock(
        return_value=[product],
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
