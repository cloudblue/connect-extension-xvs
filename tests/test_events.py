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
):
    config = {}
    request = {'id': 1}
    ext = ConnectExtensionXvsEventsApplication(connect_client, logger, config)
    result = ext.handle_listing_processing(request)
    assert result.status == 'success'


def test_handle_product_changed(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = ConnectExtensionXvsEventsApplication(connect_client, logger, config)
    result = ext.handle_product_changed(request)
    assert result.status == 'success'
