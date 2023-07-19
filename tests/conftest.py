# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from contextlib import contextmanager
import json
import random

import pandas as pd
import pytest
from connect.client import AsyncConnectClient, ConnectClient
from sqlalchemy.orm import sessionmaker

from connect_ext_ppr.client import CBCClient
from connect_ext_ppr.db import create_db, get_db, get_engine, Model, VerboseBaseSession
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.webapp import ConnectExtensionXvsWebApplication


@pytest.fixture(scope="session")
def engine():
    return get_engine({})


@pytest.fixture(scope="session")
def tables(engine):
    engine = create_db({})
    yield
    Model.metadata.drop_all(engine)


@pytest.fixture(scope="session", autouse=True)
def conn(engine, tables):
    connection = engine.connect()
    yield connection
    connection.close()


@pytest.fixture
def dbsession(conn):
    """Returns an sqlalchemy session, and after the test, tears down everything properly."""
    session = sessionmaker(class_=VerboseBaseSession)(bind=conn)
    transaction = conn.begin()

    yield session

    transaction.rollback()
    session.close()


@pytest.fixture(autouse=True)
def mocked_get_db_ctx(dbsession, mocker):

    @contextmanager
    def mocked_context(config):
        yield dbsession

    mocker.patch(
        'connect_ext_ppr.service.get_db_ctx_manager',
        wraps=mocked_context,
    )


@pytest.fixture
def product_factory(dbsession):
    def _build_product(
        id=None,
        name='Chat GPT',
        logo='/media/VA-000-000/PRD-000-000-000/media/PRD-000-000-000-logo_cLqk6Vm.png',
        owner_id='VA-000-000',
    ):
        if not id:
            id = 'PR-{0}'.format(random.randint(10000, 99999))
        product = Product(id=id, name=name, logo=logo, owner_id=owner_id)
        dbsession.add(product)
        dbsession.commit()
        return product
    return _build_product


@pytest.fixture
def deployment(dbsession, product_factory):
    product = product_factory()
    dbsession.add(product)
    dbsession.commit()
    dep = Deployment(
        product_id=product.id,
        account_id='PA-000-000',
        vendor_id='VA-000-000',
        hub_id='HB-0000-0000',
    )
    dbsession.set_verbose(dep)
    dbsession.commit()
    return dep


@pytest.fixture
def deployment_factory(product_factory):
    def _build_deployment(
            dbsession,
            product_id=None,
            account_id='PA-000-000',
            vendor_id='VA-000-000',
            hub_id='HB-0000-0000',
    ):
        if not product_id:
            product = product_factory()
            product_id = product.id

        dep = Deployment(
            product_id=product_id,
            account_id=account_id,
            vendor_id=vendor_id,
            hub_id=hub_id,
        )
        dbsession.set_verbose(dep)
        dbsession.commit()
        return dep
    return _build_deployment


@pytest.fixture
def deployment_request_factory(dbsession):
    def _build_deployment_request(
            deployment=None,
            ppr_id='PPRFL-12345',
    ):
        if not deployment:
            deployment = deployment_factory(dbsession, id='DPLR-123-123-123')

        ppr = PPRVersion(id=ppr_id, product_version=1)
        dep_req = DeploymentRequest(
            deployment_id=deployment.id,
            ppr_id=ppr_id,
            created_by=deployment.account_id,
        )
        dbsession.add(ppr)
        dbsession.set_verbose(dep_req)
        dbsession.commit()
        return dep_req
    return _build_deployment_request


@pytest.fixture
def file(dbsession, media_response):
    file = File(
        id=media_response['id'],
        account_id=media_response['owner']['id'],
        location=media_response['file'],
        name=media_response['name'],
        size=media_response['size'],
        mime_type=media_response['mime_type'],
        created_by=media_response['events']['created']['by']['id'],
    )
    dbsession.add(file)
    dbsession.commit()
    dbsession.refresh(file)
    return file


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
            "name": "Contract of Distribution Agreement for the Marketplace M00",
            "marketplace": {
                "id": "MP-0000",
                "name": "Marketplace M00",
                "icon": "/media/PA-000-000/marketplaces/MP-0000/icon.png",
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
def marketplace():
    return {
        "id": "MP-0000",
        "name": "Marketplace M00",
        "description": "This marketplace provides you access to customers of "
        "account 00 of the imaginary Hub H01 in the North America region",
        "owner": {
            "id": "PA-000-000",
            "name": "Provider account 00",
            "icon": "/media/PA-065-102/media/icon.png",
        },
        "icon": "/media/PA-000-000/marketplaces/MP-0000/icon.png",
        "hubs": [
            {
                "hub": {
                    "id": "HB-0000-0000",
                    "name": "Demo Hub",
                },
                "external_id": "readfilmaa",
            },
            {
                "hub": {
                    "id": "HB-8320-5285",
                    "name": "Hub Hub",
                },
                "external_id": "readfilmoo",
            },
        ],
        "active_contracts": 1,
        "countries": [
            {
                "id": "US",
                "name": "United States",
            },
        ],
        "currency": "USD",
        "attributes": [
            {
                "id": "st0p",
                "name": "Suggested T0 Price",
                "description": "Vendor's (manufacturer's) suggested Retail Customer"
                " (Tier-0) price, also known as MSRP.",
            },
        ],
        "stats": {
            "hubs": 2,
            "contracts": 1,
        },
        "events": {
            "created": {
                "at": "2023-06-27T09:18:49+00:00",
            },
            "updated": {
                "at": "2023-07-03T20:02:13+00:00",
                "by": {
                    "id": "UR-000-000-000",
                    "name": "Jhon Doe",
                },
            },
        },
    }


@pytest.fixture
def product():
    return {
        'id': 'PRD-000-000-000',
        'name': 'Product name',
        'icon': 'http://icon.png',
        'version': 2,
        'owner': {'id': 'VA-000-000'},
    }


@pytest.fixture
def cbc_endpoint():
    return 'https://example.com/api/v1'


@pytest.fixture
def cbc_oauth_key():
    return 'd3d292a4-9f72-492c-8e1b-889f0ad001cd'


@pytest.fixture
def cbc_oauth_secret():
    return '7b534af1-4110-4520-abf3-e78503ef78a6'


@pytest.fixture
def cbc_app_id():
    return '30a22e97-c8b0-4e6f-bb6a-87fbcb724830'


@pytest.fixture
def cbc_client(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    cbc_app_id,
):
    return CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
        app_id=cbc_app_id,
    )


@pytest.fixture
def flat_catalog_type_object():
    return {
        'refreshStatsUUID': '83dc93d4-2722-4cb9-b581-9a26aeeb0fe0',
        'aps': {
            'modified': '2023-06-30T22:28:16Z',
            'id': '3e123a60-b055-45d1-b838-b35d34405927',
            'type': 'http://ingrammicro.com/pa/flat-catalog/1.4',
            'status': 'aps:ready',
            'revision': 4,
        },
    }


@pytest.fixture
def flat_catalog_type_objects(flat_catalog_type_object):
    return [flat_catalog_type_object]


@pytest.fixture
def flat_catalog_type():
    return 'http://ingrammicro.com/pa/flat-catalog'


@pytest.fixture
def media_response():
    return {
        "id": "MFL-6390-1110-0832",
        "file": "/files/media/public/accounts/PA-000-000/"
        "configurations/dc08ea505ec483394494/test.json",
        "size": 17,
        "folder": {
            "name": "PA-000-000/configurations",
            "type": "accounts",
        },
        "owner": {
            "id": "PA-000-000",
            "name": "Provider account 00",
            "icon": "/media/PA-065-101/media/icon.jpg",
        },
        "name": "test.json",
        "mime_type": "application/json",
        "events": {
            "created": {
                "at": "2023-07-05T18:17:55+00:00",
                "by": {
                    "id": "SU-295-689-628",
                    "name": "xvs-ext-token",
                },
            },
            "confirmed": {
                "at": "2023-07-05T18:17:55+00:00",
                "by": {
                    "id": "SU-295-689-628",
                    "name": "xvs-ext-token",
                },
            },
        },
        "access": {
            "PA-065-101": {
                "view": True,
                "delete": True,
            },
        },
    }


@pytest.fixture
def api_client(test_client_factory, dbsession):
    client = test_client_factory(ConnectExtensionXvsWebApplication)
    client.app.dependency_overrides = {
        get_db: lambda: dbsession,
    }
    yield client


@pytest.fixture
def configuration(dbsession, deployment, file):
    conf = Configuration(
        file=file.id,
        deployment=deployment.id,
    )
    dbsession.set_verbose(conf)
    dbsession.commit()
    return conf


@pytest.fixture
def ppr_workbook():
    return pd.ExcelFile('./tests/fixtures/test_PPR_file.xlsx')


@pytest.fixture
def ppr_valid_schema():
    with open('./tests/fixtures/ppr_valid_schema.json') as json_file:
        return json.load(json_file)
