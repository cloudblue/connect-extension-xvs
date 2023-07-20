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
from connect_ext_ppr.db import (
    create_db,
    get_cbc_extension_db_ctx_manager,
    get_db,
    get_engine,
    Model,
    VerboseBaseSession,
)
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.services.cbc_extension import get_hub_credentials
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.models.task import Task
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

    mocker.patch(
        'connect_ext_ppr.tasks_manager.get_db_ctx_manager',
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
            delegate_l2=False,
    ):
        if not deployment:
            deployment = deployment_factory(dbsession, id='DPLR-123-123-123')

        ppr = PPRVersion(id=ppr_id, product_version=1)
        dep_req = DeploymentRequest(
            deployment_id=deployment.id,
            ppr_id=ppr_id,
            created_by=deployment.account_id,
            delegate_l2=delegate_l2,
        )
        dbsession.add(ppr)
        dbsession.set_verbose(dep_req)
        dbsession.commit()
        return dep_req
    return _build_deployment_request


@pytest.fixture
def task_factory(dbsession, deployment_request_factory):
    def _build_task(
        deployment_request=None,
        task_index='001',
    ):
        if not deployment_request:
            deployment_request = deployment_request_factory()

        task_id = f'TSK-{deployment_request.id[4:]}-{task_index}'
        task = Task(
            id=task_id,
            deployment_request=deployment_request.id,
            title=f'Title Task {task_index}',
        )
        dbsession.add(task)
        dbsession.commit()
        return task
    return _build_task


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


@pytest.fixture
def cbc_db_session():
    with get_cbc_extension_db_ctx_manager({}) as db:
        transaction = db.begin()
        queries = [
            'CREATE TABLE IF NOT EXISTS configuration ('
            ' oauth_key varchar(100) primary key,'
            ' oauth_secret varchar(100) not null,'
            ' product_id varchar(100) not null,'
            ' api_key varchar(100) null,'
            ' provider_api_key varchar(100) null,'
            ' api_url varchar(100) not null'
            ')',
            'CREATE TABLE IF NOT EXISTS global_app_configuration('
            ' app_instance_id varchar(100) primary key,'
            ' hub_uuid varchar(100) not null'
            ')',
            'CREATE TABLE IF NOT EXISTS hub_instances('
            ' hub_id varchar(100) primary key,'
            ' app_instance_id varchar(100) null,'
            ' extension_resource_uid varchar(100) null,'
            ' controller_uri varchar(400) null,'
            ' last_check timestamp DEFAULT CURRENT_TIMESTAMP'
            ')',
            "INSERT INTO configuration values ("
            " '91b56e8f-cdc9-4352-8d6d-ccaa510be770',"
            " 'a4a279ec-ee05-4d03-9aca-f043975f5104',"
            " 'e4608f13-0582-4780-876f-224add5fa4fd',"
            " null,"
            " null,"
            " 'https://api.connect.cloudblue.com/v1/api'"
            ")",
            "INSERT INTO global_app_configuration values ("
            " '15965e86-62cc-43e3-b5fb-338e69c53725',"
            " 'e4608f13-0582-4780-876f-224add5fa4fd'"
            ")",
            "INSERT INTO hub_instances values ("
            " 'HB-000-000',"
            " '39deb31d-d6ad-48bb-ba0f-82e99a88a7e9',"
            " 'e4608f13-0582-4780-876f-224add5fa4fd',"
            " 'https://example.com/api/v1'"
            ")",
        ]
        for query in queries:
            db.execute(query)

        yield db

        transaction.rollback()


@pytest.fixture
def hub_credentials(cbc_db_session):
    return get_hub_credentials(
        'HB-000-000',
        cbc_db_session,
    )


@pytest.fixture
def aps_controller_details():
    return json.load(open('./tests/fixtures/aps_controller_details.json'))


@pytest.fixture
def product_details():
    return {
        'id': 'PRD-000-000-000',
        'name': 'Product F9',
        'vendor': "Adrian's Inc",
        'isImporting': False,
        'isInstalled': False,
        'isUpdateAvailable': False,
        'version': '1',
        'isSyndicated': False,
        'availableCountries': [],
        'category': 'Finance',
        'vendorLinks': [
            {
                'description': 'Admin Manual',
                'linkUrl': 'https://example.com/manual/admin',
            },
        ],
        'releaseInformation': [
            {
                'version': '1',
                'releaseNotes': '',
            },
        ],
    }


@pytest.fixture
def get_product_details_not_found_response():
    return {
        'error': 'com.ingrammicro.imcp.library.aps.exception.APSError',
        'packageId': '04f3fca3-9a61-4af5-b722-dd0e8e25b51b',
        'message': '404 Not Found '
                   'ConnectError(error_code=CNCT_001, errors=[Not found.], params=null)',
        'http_request': 'GET https://inhouse-products:8081/rest/application/'
                        '4b4b65ec-149a-4a8c-9897-dc32f2e9e379/appDetails/'
                        'PRD-361-577-149?fulfillmentSystem=connect',
    }


@pytest.fixture
def import_product_not_found_response():
    return {
        'error': 'com.ingrammicro.imcp.library.aps.exception.APSError',
        'packageId': '04f3fca3-9a61-4af5-b722-dd0e8e25b51b',
        'message': 'java.lang.NullPointerException: Cannot invoke '
                   '"com.odin.platform.application.rest.FulfillmentProduct.getFulfillmentSystem()"'
                   ' because "product" is null',
        'http_request': 'POST https://inhouse-products:8081/rest/application/'
                        '4b4b65ec-149a-4a8c-9897-dc32f2e9e379/appDetails/PRD-361-577-149/import',
    }


@pytest.fixture
def update_product_response():
    return {
        'aps': {
            'id': '25ef793d-9a6e-4176-83b2-55d4849bdddb',
            'type': 'http://aps-standard.org/inhouse-products/connectProduct/1.0',
            'status': 'aps:ready',
            'revision': 5,
            'modified': '2023-07-13T09:05:21Z',
        },
        'productId': 'PRD-000-000-000',
        'version': 1,
        'paAccountId': '2fe324f0-68bc-45fa-91d6-d081c76f29d6',
        'subscriptionId': '7c83c18d-1d3d-40e5-973c-26a26c6eac4f',
        'cartValidation': False,
        'tierConfigValidation': False,
        'tierConfigUpdateValidation': False,
        'changeRequestValidation': False,
        'editableOrderingParameters': False,
        'payAsYouGo': False,
        'dynamicPAYG': False,
        'createNotificationId': 'f9650d3f-77da-49de-a240-5575ab4df3ec',
        'status': 'installed',
        'tenant': {
            'aps': {
                'id': '2c638143-bf4f-4520-90c0-981e36a15acb',
            },
        },
    }


@pytest.fixture
def product_not_installed_response():
    return {
        'error': 'com.ingrammicro.imcp.library.aps.exception.APSError',
        'packageId': '04f3fca3-9a61-4af5-b722-dd0e8e25b51b',
        'message': 'java.lang.NullPointerException: Cannot invoke '
                   '"com.odin.platform.application.rest.FulfillmentProduct.getFulfillmentSystem()"'
                   ' because "product" is null',
        'http_request': 'POST https://inhouse-products:8081/rest/application/'
                        '4b4b65ec-149a-4a8c-9897-dc32f2e9e379/appDetails/PRD-361-577-149/import',
    }


@pytest.fixture
def subscriptions():
    return [
        {
            'name': 'License key',
            'trial': False,
            'oneTime': False,
            'disabled': False,
            'description': 'Parallels Automation License Key',
            'subscriptionId': 1,
            'serviceTemplateId': 0,
            'aps': {
                'modified': '2023-07-13T06:57:12Z',
                'id': '7c83c18d-1d3d-40e5-973c-26a26c6eac4f',
                'type': 'http://parallels.com/aps/types/pa/subscription/1.0',
                'status': 'aps:ready',
                'revision': 1,
            },
        },
    ]


@pytest.fixture
def plm_service():
    return {
        'aps':
            {
                'modified': '2023-07-13T07:01:38Z',
                'id': '4b4b65ec-149a-4a8c-9897-dc32f2e9e379',
                'type': 'http://com.odin.platform/inhouse-products/application/1.0',
                'status': 'aps:ready',
                'revision': 3,
            },
    }


@pytest.fixture
def plm_services(plm_service):
    return [plm_service]


@pytest.fixture
def sample_ppr_file():
    return open('./tests/fixtures/Sweet_Pies_v2.xlsx', 'rb')


@pytest.fixture
def parse_ppr_success_response():
    return json.load(open('./tests/fixtures/parse_ppr_success_response.json'))
