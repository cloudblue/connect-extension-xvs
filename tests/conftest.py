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
from requests_oauthlib import OAuth1
from connect.eaas.core.inject.models import Context
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
from connect_ext_ppr.models.deployment import (
    Deployment,
    DeploymentRequest,
    MarketplaceConfiguration,
)
from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.services.cbc_extension import get_hub_credentials
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.utils import get_base_workbook
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
        version=3,
    ):
        if not id:
            id = 'PR-{0}'.format(random.randint(10000, 99999))
        product = dbsession.query(Product).filter_by(id=id).first()
        if not product:
            product = Product(id=id, name=name, logo=logo, owner_id=owner_id, version=version)
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
def deployment_factory(dbsession, product_factory):
    def _build_deployment(
            product_id=None,
            account_id='PA-000-000',
            vendor_id='VA-000-000',
            hub_id='HB-0000-0000',
    ):
        product = product_factory(id=product_id, owner_id=vendor_id)
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
            ppr=None,
            delegate_l2=False,
            status=None,
            started_at=None,
            finished_at=None,
    ):
        if not deployment:
            deployment = deployment_factory(id='DPLR-123-123-123')

        if not ppr:
            ppr = PPRVersion(id=f'PPR-{random.randint(1000, 9999)}', product_version=1)

        dep_req = DeploymentRequest(
            deployment_id=deployment.id,
            ppr_id=ppr.id,
            created_by=deployment.account_id,
            delegate_l2=delegate_l2,
            status=status,
            started_at=started_at,
            finished_at=finished_at,
        )
        dbsession.add(ppr)
        dbsession.set_next_verbose(dep_req, 'deployment_id')
        return dep_req
    return _build_deployment_request


@pytest.fixture
def task_factory(dbsession, deployment_request_factory):
    def _build_task(
        deployment_request=None,
        task_index='001',
        type=None,
        status=Task.STATUSES.pending,
        error_message=None,
        started_at=None,
        finished_at=None,
    ):
        if not deployment_request:
            deployment_request = deployment_request_factory()

        _, suffix = deployment_request.id.split('-', 1)
        task_id = f'TSK-{suffix}-{task_index}'
        task = Task(
            id=task_id,
            deployment_request=deployment_request.id,
            title=f'Title Task {task_index}',
            type=type,
            status=status,
            error_message=error_message,
            created_by=deployment_request.created_by,
            started_at=started_at,
            finished_at=finished_at,
        )
        dbsession.add(task)
        dbsession.commit()
        return task
    return _build_task


@pytest.fixture
def ppr_version_factory(dbsession, file_factory):
    def _build_ppr(
        id=None,
        file=None,
        deployment=None,
        configuration=None,  # configuration id
        summary=None,
        version=None,
        product_version=3,
        description='Some',
        created_by='SU-295-689-628',
        status='pending',
    ):
        ppr = PPRVersion(
            file=file or file_factory().id,
            deployment=deployment.id,
            configuration=configuration,
            summary=summary or {},
            product_version=product_version,
            created_by=created_by,
            status=status,
            description=description,
        )
        if version:
            ppr.version = version
        if id:
            ppr.id = id
            dbsession.add(ppr)
        else:
            dbsession.set_verbose(ppr)
        dbsession.commit()
        dbsession.refresh(ppr)
        return ppr
    return _build_ppr


@pytest.fixture
def file_factory(dbsession, media_response):
    def _build_file(
        id=media_response['id'],
        account_id=media_response['owner']['id'],
        location=media_response['file'],
        name=media_response['name'],
        size=media_response['size'],
        mime_type=media_response['mime_type'],
        created_by=media_response['events']['created']['by']['id'],
    ):
        file = File(
            id=id,
            account_id=account_id,
            location=location,
            name=name,
            size=size,
            mime_type=mime_type,
            created_by=created_by,
        )
        dbsession.add(file)
        dbsession.commit()
        dbsession.refresh(file)
        return file
    return _build_file


@pytest.fixture
def marketplace_config_factory(dbsession):
    def _build_mc(
        marketplace_id,
        deployment=None,
        deployment_request=None,
        ppr_id=None,
        active=True,
    ):
        mp = MarketplaceConfiguration(
            marketplace=marketplace_id,
            ppr_id=ppr_id,
            active=active,
        )
        if deployment:
            mp.deployment_id = deployment.id
        else:
            mp.deployment_request = deployment_request.id
        dbsession.add(mp)
        dbsession.commit()
        dbsession.refresh(mp)
        return mp
    return _build_mc


@pytest.fixture
def file(file_factory):
    return file_factory()


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
def common_context():
    return Context(call_type='user', user_id='UR-000-000-000', account_id='PA-000-000')


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
def hub():
    return {
        "id": "HB-0000-0000",
        "name": "Extension Test Hub",
        "description": "",
        "company": {
            "id": "PA-000-000",
            "name": "Extension Test Account",
            "icon": "/media/PA-000-000/media/icon.png",
        },
        "events": {
            "created": {
                "at": "2019-11-08T10:37:28+00:00",
                "by": {
                    "id": "UR-000-000-000",
                    "name": "Some User",
                },
            },
            "updated": {
                "at": "2019-11-11T18:21:58+00:00",
                "by": {
                    "id": "UR-000-000-000",
                    "name": "Some User",
                },
            },
        },
        "stats": {
            "connections": 1,
            "marketplaces": 0,
        },
        "instance": {
            "id": "00000000-0000-0000-0000-000000000000",
            "type": "OA",
        },
        "version": "",
        "extension_version": "",
        "creds": {
            "key": "HB-0000-0000-v1-0000000000000000",
            "secret": "0000000000000000000000000000000000",
            "url": "https://aps.connect.cloudblue.com/hub",
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
        auth=OAuth1(cbc_oauth_key, cbc_oauth_secret),
        app_id=cbc_app_id,
    )


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
def item_response():
    return {
        "id": "PRD-000-000-000-00001",
        "name": "New name",
        "status": "published",
        "unit": {
            "id": "licenses",
            "name": "Licenses",
            "title": "Licenses",
            "unit": "unit",
        },
        "mpn": "MPN-B",
        "position": 20000,
        "type": "reservation",
        "local_id": "PRD_000_000_000_00001",
        "display_name": "New name",
        "period": "monthly",
        "precision": "integer",
        "commitment": {
            "multiplier": "billing_period",
            "count": 1,
        },
        "dynamic": False,
        "description": "Some",
        "depth": 0,
        "ui": {
            "visibility": True,
        },
        "ui_visibility": True,
        "events": {
            "created": {
                "at": "2023-07-11T04:45:41+00:00",
            },
            "updated": {
                "at": "2023-07-17T09:16:20+00:00",
                "by": {
                    "id": "UR-000-000-000",
                    "name": "Jhon Doe",
                },
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
def configuration_factory(dbsession, deployment_factory, file_factory, user):
    def _build_configuration(
        file=None,
        deployment=None,
        state='active',
    ):
        conf = Configuration(
            file=file or file_factory().id,
            deployment=deployment or deployment_factory().id,
            state=state,
            created_by=user,
            updated_by=user,
        )
        dbsession.set_verbose(conf)
        dbsession.commit()
        return conf
    return _build_configuration


@pytest.fixture
def configuration(dbsession, deployment, file, user):
    conf = Configuration(
        file=file.id,
        deployment=deployment.id,
        created_by=user,
        updated_by=user,
    )
    dbsession.set_verbose(conf)
    dbsession.commit()
    return conf


@pytest.fixture
def ppr_workbook():
    return pd.ExcelFile('./tests/fixtures/test_PPR_file.xlsx')


@pytest.fixture
def bytes_ppr_workbook_factory():
    def _bytes_ppr_workbook(with_errors=False):
        file_name = './tests/fixtures/test_PPR_file.xlsx'
        if with_errors:
            file, _, wb = get_base_workbook(None)
            new_writer = pd.ExcelWriter(file.name)
            for sheet_name in wb.sheet_names[1:]:
                df = wb.parse(sheet_name=sheet_name)
                df.to_excel(new_writer, sheet_name, index=False)
            new_writer.book.save(file.name)
            file_name = file.name
        with open(file_name, 'rb') as rf:
            return rf.read()
    return _bytes_ppr_workbook


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
            " 'HB-0000-0000',"
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
        'HB-0000-0000',
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
def service():
    return {
        'aps':
            {
                'modified': '2023-07-13T07:01:38Z',
                'id': '4b4b65ec-149a-4a8c-9897-dc32f2e9e379',
                'status': 'aps:ready',
                'revision': 3,
            },
    }


@pytest.fixture
def services(service):
    return [service]


@pytest.fixture
def sample_ppr_file():
    return open('./tests/fixtures/Sweet_Pies_v2.xlsx', 'rb')


@pytest.fixture
def parse_ppr_success_response():
    return json.load(open('./tests/fixtures/parse_ppr_success_response.json'))


@pytest.fixture
def task_logs_response():
    return [
        {
            'actionOutput': '',
            'location': 'SCREF:JMSQueue:0',
            'method': 'APSAsyncOperations',
            'mutex': 'PL:8',
            'name': "Execute operation '/applyConfig'(eebc63a9-ed15-4a7f-83d5-bb2d262c7650)"
                    ' on resource application(4b4b65ec-149a-4a8c-9897-dc32f2e9e379)',
            'orderId': 0,
            'startedAt': 1689262873,
            'status': 's',
            'subscription_id': 0,
            'task_id': 106,
        },
    ]


@pytest.fixture
def parse_price_file_response():
    return {
        'status': 'PARSED',
        'priceListStructure': [
            'MPN', 'Vendor ID', 'Vendor Name',
            'Service Template / Product Line', 'Product',
            'Billing Period', 'Subscription Period',
            'Billing Model', 'UOM', 'Lower Limit',
            'Effective Date', 'Cost Billing Period',
            'Cost Currency', 'Cost', 'Price Currency',
            'Price', 'MSRP', 'Margin', 'Reseller Margin',
            'Fee Type', 'Subscriptions', 'Seats',
            'Active'],
        'pricingModel': 'FLAT',
        'feeType': 'RECURRING',
        'vendorId': 'VA-000-000',
        'dataId': 1,
    }


@pytest.fixture
def reseller_accounts():
    return json.load(open('./tests/fixtures/reseller_accounts.json'))


@pytest.fixture
def reseller_admin_users():
    return json.load(open('./tests/fixtures/reseller_admin_users.json'))


@pytest.fixture
def aps_token_response():
    return {
        'aps_token': 'Fake Token',
        'controller_uri': 'https://iamcontroller.com/',
    }


@pytest.fixture
def price_proposal_response():
    return {
        'status': 'PREPARED',
        'dataId': 1,
        'overridings': {
            'effectiveDate': [
                'CFQ7TTC0LF8S:0002', 'CFQ7TTC0LF8R:0001',
                'CFQ7TTC0LF8S:0002', 'CFQ7TTC0LF8R:0001',
                'CFQ7TTC0LF8R:0001', 'CFQ7TTC0LF8S:0002',
            ],
            'currency': [],
        },
    }


@pytest.fixture
def batch():
    return {
        'id': 'BAT-0000-0000-0000',
        'name': 'Pricing Batch (PLV-000-000-000-0001)',
        'status': 'published',
        'stream': {
            'id': 'STR-0000-0000-0000',
            'name': 'Pricing Stream',
            'status': 'active',
            'context': {
                "account": {
                    "id": "VA-000-000",
                    "name": "Front Street Inc.",
                },
                "product": {
                    "id": "PRD-000-000-000",
                    "name": "Sweet Pies",
                    "icon": "/media/VA-000-000/PRD-000-000-000/media/PRD-000-000-000-logo.png",
                },
                "marketplace": {
                    "id": "MP-00000",
                    "name": "US Marketplace",
                    "currency": "USD",
                },
                "listing": {
                    "id": "LST-000-000-000",
                },
                "pricelist": {
                    "id": "PL-000-000-000",
                    "name": "New Price",
                    "status": "active",
                },
            },
        },
        'test': False,
        'stream_updated': True,
    }


@pytest.fixture
def batch_file():
    return {
        'type': 'output',
        'position': 1,
        'id': 'MFL-0000-0000-0000',
        'name': '/public/v1/media/folders/streams_batches/BAT-0000-0000-0000/'
                'files/MFL-0000-0000-0000/BAT-0000-0000-0000-out.xlsx',
    }


@pytest.fixture
def batch_output_file():
    return open('./tests/fixtures/MFL-0000-0000-0000.xlsx', 'rb')


@pytest.fixture
def no_db_deployment(batch):
    return Deployment(
        id='DP-000-000-000',
        product_id=batch['stream']['context']['product']['id'],
        account_id='PA-000-000',
        vendor_id='VA-000-000',
        hub_id='HB-0000-0000',
    )


@pytest.fixture
def batch_dataset():
    return {
        'cost': True,
        'price': True,
        'msrp': True,
        'effective_date': '07/26/2023',
    }


@pytest.fixture
def user():
    return {
        'id': 'SU-295-689-628',
        'name': 'Neri',
    }


@pytest.fixture
def connect_auth_header():
    """Connect-Auth header for the user fixture ('SU-295-689-628', 'Neri')"""
    return (
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7Im9pZCI6IlNVLTI5NS02ODktN"
        "jI4IiwibmFtZSI6Ik5lcmkifX0.U_T6vuXnD293hcWNTJZ9QBViteNv8JXUL2gM0BezQ-k"
    )


@pytest.fixture
def configuration_json():
    with open('./tests/fixtures/configuration.json') as json_file:
        return json.load(json_file)
