# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
import pytest
from connect.client import AsyncConnectClient, ConnectClient

from connect_ext_ppr.db import create_db as create, Model


@pytest.fixture(scope="session", autouse=True)
def setup_db(request):
    engine = create({})
    Model.metadata.bind = engine

    def teardown():
        Model.metadata.drop_all()

    request.addfinalizer(teardown)


@pytest.fixture
def connect_client():
    return ConnectClient(
        'ApiKey fake_api_key',
        endpoint='https://localhost/public/v1',
    )


@pytest.fixture
def async_connect_client():
    return AsyncConnectClient(
        'ApiKey fake_api_key',
        endpoint='https://localhost/public/v1',
    )


@pytest.fixture
def logger(mocker):
    return mocker.MagicMock()


@pytest.fixture
def listing():
    return {
        "id": "LST-000-000-000",
        "status": "unlisted",
        "contract": {
            "id": "CRD-065-001-001",
            "type": "distribution",
            "name": "Contract of Distribution Agreement for the Marketplace XX",
            "marketplace": {
                "id": "MP-06511",
                "name": "Marketplace XX",
                "icon": "/media/PA-000-000/marketplaces/MP-06511/icon.png",
            },
        },
        "product": {
            "id": "PRD-000-000-000",
            "icon": "/media/VA-000-000/PRD-000-000-000/media/PRD-000-000-000-logo_cLqk6Vm.png",
            "name": "Chat GPT",
            "status": "published",
        },
        "created": "2023-06-27T12:29:06+00:00",
        "updated": "2023-06-27T12:45:31+00:00",
        "vendor": {
            "id": "VA-000-000",
            "name": "Vendor account 00",
            "icon": "/media/VA-000-000/media/icon.png",
        },
        "provider": {
            "id": "PA-000-000",
            "name": "Provider account 00",
            "icon": "/media/PA-000-000/media/icon.jpg",
        },
    }


@pytest.fixture
def installation():
    return {
        "id": "EIN-8436-7221-8308",
        "environment": {
            "id": "ENV-2244-9935-01",
            "type": "development",
            "icon": "googleExtensionBaseline",
            "extension": {
                "id": "SRVC-2244-9935",
                "name": "xvs ext",
                "owner": {
                    "id": "PA-000-000",
                    "name": "Provider account 00",
                    "icon": "/media/PA-000-000/media/icon.png",
                    "role": "distributor",
                },
                "icon": "https://portal.cnct.info/files/media/public/eaas_icons/"
                "SRVC-2244-9935/5f5def84784825c0a74b.png",
                "extension_id": "EXT-426-640",
            },
            "hostname": "srvc-2244-9935-dev",
            "domain": "ext.cnct.info",
            "git": {},
            "runtime": "local",
        },
        "owner": {
            "id": "PA-000-000",
            "name": "Provider account 00",
            "icon": "/media/PA-000-000/media/icon.png",
            "role": "distributor",
        },
        "settings": {},
        "events": {
            "installed": {
                "at": "2023-06-27T11:22:01+00:00",
                "by": {
                    "id": "UR-000-000-000",
                    "name": "Jhon Doe",
                },
            },
            "updated": {
                "at": "2023-06-27T11:22:01+00:00",
            },
        },
        "status": "installed",
    }


@pytest.fixture
def product():
    return {
        'id': 'PRD-000-000-000',
        'version': 2,
        'owner': {'id': 'VA-000-000'},
    }
