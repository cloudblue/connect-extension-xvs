import json

import pytest

from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.ppr import PPRVersion


def test_get_pprs(
    deployment_factory,
    configuration_factory,
    file_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    deployment = deployment_factory()
    description = (
        '\n**Description**\nWhat a lovely day\n\nSummary:\n* Resources\n'
        '    * Created\n        * PRD-000-068-001-00001\n        * PRD-000-068-001-00002\n\n'
    )
    ppr_file = file_factory(
        id='MFL-XXX',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    ppr_version = ppr_version_factory(
        deployment=deployment,
        file=ppr_file.id,
        product_version=None,
        summary=None,
        description=None,
    )
    configuration2 = configuration_factory(deployment=deployment.id)
    ppr_file2 = file_factory(
        id='MFL-YYY',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    ppr_version2 = ppr_version_factory(
        deployment=deployment,
        configuration=configuration2.id,
        file=ppr_file2.id,
        product_version=5,
        summary={
            'Resources': {'created': ['PRD-000-068-001-00001', 'PRD-000-068-001-00002']},
            'ResourceCategories': {},
        },
        description=description,
        status='ready',
    )
    response = api_client.get(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == 2
    data = response.json()[0]
    events = data.pop('events')
    assert data == {
        'id': ppr_version2.id,
        'file': {
            'id': ppr_file2.id,
            'name': ppr_file2.name,
            'location': ppr_file2.location,
            'size': ppr_file2.size,
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'configuration': {
            'id': configuration2.id,
            'state': 'active',
        },
        'version': 2,
        'product_version': 5,
        'description': description,
        'status': 'ready',
    }
    assert isinstance(events['created']['at'], str)
    assert events['created']['by'] == ppr_version.created_by

    data = response.json()[1]
    events = data.pop('events')
    assert data == {
        'id': ppr_version.id,
        'version': 1,
        'file': {
            'id': ppr_file.id,
            'name': ppr_file.name,
            'location': ppr_file.location,
            'size': ppr_file.size,
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'status': 'pending',
    }
    assert isinstance(events['created']['at'], str)
    assert events['created']['by'] == ppr_version.created_by


@pytest.mark.parametrize(
    ('pagination', 'expected_amount', 'expected_header'),
    (
        ('limit=10&offset=0', 10, 'items 0-9/12'),
        ('limit=6&offset=9', 3, 'items 9-11/12'),
        ('limit=7&offset=14', 0, 'items 14-14/12'),
    ),
)
def test_get_pprs_pagination(
    pagination,
    expected_amount,
    expected_header,
    deployment_factory,
    file_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    deployment = deployment_factory()

    for i in range(12):
        ppr_file = file_factory(
            id=f'MFL-XX{i}',
            mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        ppr_version_factory(
            deployment=deployment,
            file=ppr_file.id,
            product_version=None,
            summary=None,
            description=None,
        )

    response = api_client.get(
        f'/api/deployments/{deployment.id}/pprs?{pagination}',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == expected_amount
    assert response.headers['Content-Range'] == expected_header


@pytest.mark.parametrize(
    ('filters', 'expected_amount', 'expected_header'),
    (
        ('id=PPRFL-123', 1, 'items 0-0/1'),
        ('version=2', 1, 'items 0-0/1'),
    ),
)
def test_get_pprs_filters(
    filters,
    expected_amount,
    expected_header,
    deployment_factory,
    file_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    deployment = deployment_factory()
    ppr_file = file_factory(
        id='MFL-001',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    ppr_version_factory(
        id='PPRFL-123',
        deployment=deployment,
        file=ppr_file.id,
        product_version=None,
        summary=None,
        description=None,
    )

    for i in range(12):
        ppr_file = file_factory(
            id=f'MFL-XX{i}',
            mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        ppr_version_factory(
            deployment=deployment,
            file=ppr_file.id,
            product_version=None,
            summary=None,
            description=None,
        )

    response = api_client.get(
        f'/api/deployments/{deployment.id}/pprs?{filters}',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == expected_amount
    assert response.headers['Content-Range'] == expected_header


def test_get_pprs_empty(
    deployment_factory,
    installation,
    api_client,
):
    deployment = deployment_factory()
    response = api_client.get(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
    )
    assert response.status_code == 200
    assert response.json() == []


def test_get_ppr(
    deployment_factory,
    configuration_factory,
    file_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    deployment = deployment_factory()
    ppr_file = file_factory(
        id='MFL-XXX',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    ppr_version = ppr_version_factory(
        deployment=deployment,
        file=ppr_file.id,
        product_version=None,
        summary=None,
        description='Add items',
    )
    response = api_client.get(
        f'/api/deployments/{deployment.id}/pprs/{ppr_version.id}',
        installation=installation,
    )
    assert response.status_code == 200
    data = response.json()
    events = data.pop('events')
    assert data == {
        'id': ppr_version.id,
        'version': 1,
        'file': {
            'id': ppr_file.id,
            'name': ppr_file.name,
            'location': ppr_file.location,
            'size': ppr_file.size,
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'description': 'Add items',
        'status': 'pending',
    }
    assert isinstance(events['created']['at'], str)
    assert events['created']['by'] == ppr_version.created_by


def test_get_ppr_not_found(
    deployment_factory,
    installation,
    api_client,
):
    deployment = deployment_factory()
    response = api_client.get(
        f'/api/deployments/{deployment.id}/pprs/PPRFL-XXX-XXX',
        installation=installation,
    )
    assert response.status_code == 404
    assert response.json() == {
        'error_code': 'EXT_001',
        'errors': [
            'Object `PPRFL-XXX-XXX` not found.',
        ],
    }


def test_upload_ppr(
    deployment_factory,
    file_factory,
    connect_auth_header,
    installation,
    api_client,
    mocker,
    dbsession,
):
    deployment = deployment_factory()

    with open('./tests/fixtures/test_PPR_file.xlsx', 'rb') as f:
        binary_data = f.read()
    mocker.patch(
        'connect_ext_ppr.service.get_ppr_from_media',
        return_value=binary_data,
    )

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
        json={
            'file': {
                'id': 'MFL-C00L',
                'name': 'test_PPR_file.xlsx',
                'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                            'test_PPR_file.xlsx',
                'size': 87657,
                'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            'description': 'What a lovely day',
        },
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 201
    data = response.json()
    events = data.pop('events')
    id = data.pop('id')
    assert data == {
        'version': 1,
        'file': {
            'id': 'MFL-C00L',
            'name': 'test_PPR_file.xlsx',
            'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                        'test_PPR_file.xlsx',
            'size': 87657,
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'description': '\n**Description**\nWhat a lovely day\n\n\n',
        'status': 'ready',
        'product_version': 3,
    }
    assert id[:6] == 'PPRFL-'
    assert isinstance(events['created']['at'], str)
    assert events['created']['by'] == 'SU-295-689-628'

    assert dbsession.query(PPRVersion).count() == 1
    assert dbsession.query(File).count() == 1


def test_upload_ppr_invalid(
    deployment_factory,
    file_factory,
    connect_auth_header,
    installation,
    api_client,
    mocker,
):
    deployment = deployment_factory()

    with open('./tests/fixtures/test_PPR_file_invalid.xlsx', 'rb') as f:
        binary_data = f.read()
    mocker.patch(
        'connect_ext_ppr.service.get_ppr_from_media',
        return_value=binary_data,
    )

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
        json={
            'file': {
                'id': 'MFL-C00L',
                'name': 'test_PPR_file_invalid.xlsx',
                'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                            'test_PPR_file_invalid.xlsx',
                'size': 87690,
                'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            'description': 'What a lovely day',
        },
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 201
    data = response.json()
    events = data.pop('events')
    id = data.pop('id')
    assert data == {
        'version': 1,
        'file': {
            'id': 'MFL-C00L',
            'name': 'test_PPR_file_invalid.xlsx',
            'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                        'test_PPR_file_invalid.xlsx',
            'size': 87690,
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'description': (
            "\n**Description**\nWhat a lovely day\n\nSummary:\n* Errors\n    "
            "* ['Name_EN', 'Description_EN', 'ResourceCategory', 'MPÑ', 'UOM', 'Measurable'] "
            "does not contain items matching the given schema\n\n"
        ),
        'status': 'failed',
        'product_version': 3,
    }
    assert id[:6] == 'PPRFL-'
    assert isinstance(events['created']['at'], str)
    assert events['created']['by'] == 'SU-295-689-628'


def test_post_ppr_new_version(
    deployment_factory,
    file_factory,
    ppr_version_factory,
    connect_auth_header,
    installation,
    api_client,
    mocker,
    dbsession,
):
    deployment = deployment_factory()
    ppr_version_factory(deployment=deployment)
    assert dbsession.query(PPRVersion).count() == 1
    assert dbsession.query(File).count() == 1

    with open('./tests/fixtures/test_PPR_file.xlsx', 'rb') as f:
        binary_data = f.read()
    mocker.patch(
        'connect_ext_ppr.service.get_ppr_from_media',
        return_value=binary_data,
    )

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
        json={
            'file': {
                'id': 'MFL-C00L',
                'name': 'test_PPR_file.xlsx',
                'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                            'test_PPR_file.xlsx',
                'size': 87657,
                'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            'description': 'What a lovely day',
        },
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 201
    data = response.json()
    events = data.pop('events')
    id = data.pop('id')
    assert data == {
        'version': 2,
        'file': {
            'id': 'MFL-C00L',
            'name': 'test_PPR_file.xlsx',
            'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                        'test_PPR_file.xlsx',
            'size': 87657,
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'description': '\n**Description**\nWhat a lovely day\n\n\n',
        'status': 'ready',
        'product_version': 3,
    }
    assert id[:6] == 'PPRFL-'
    assert isinstance(events['created']['at'], str)
    assert events['created']['by'] == 'SU-295-689-628'

    assert dbsession.query(PPRVersion).count() == 2
    assert dbsession.query(File).count() == 2


def test_post_ppr_wrong_deployment(
    media_response,
    installation,
    api_client,
):
    response = api_client.post(
        '/api/deployments/DPL-YYY-YYY/pprs',
        installation=installation,
        json={
            'file': {
                'id': media_response['id'],
                'name': media_response['name'],
                'location': media_response['file'],
                'size': media_response['size'],
                'mime_type': media_response['mime_type'],
            },
        },
    )
    assert response.status_code == 404
    assert response.json() == {
        'error_code': 'EXT_001',
        'errors': [
            'Object `DPL-YYY-YYY` not found.',
        ],
    }


def test_post_ppr_file_already_exists(
    deployment_factory,
    file_factory,
    connect_auth_header,
    installation,
    api_client,
    dbsession,
    mocker,
):
    deployment = deployment_factory()
    file = file_factory(
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    with open('./tests/fixtures/test_PPR_file.xlsx', 'rb') as f:
        binary_data = f.read()
    mocker.patch(
        'connect_ext_ppr.service.get_ppr_from_media',
        return_value=binary_data,
    )

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
        json={
            'file': {
                'id': file.id,
                'name': file.name,
                'location': file.location,
                'size': file.size,
                'mime_type': file.mime_type,
            },
        },
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 400
    assert response.json() == {
        'error_code': 'EXT_002',
        'errors': [
            f'Object `{file.id}` already exists, cannot create a new one.',
        ],
    }


def test_generate_ppr(
    deployment_factory,
    configuration_factory,
    connect_auth_header,
    installation,
    api_client,
    mocker,
):
    deployment = deployment_factory(product_id='PRD-XXX-XXX-XXX')
    configuration = configuration_factory(deployment=deployment.id)

    with open('./tests/fixtures/configuration.json', 'rb') as f:
        conf_data = json.load(f)
    mocker.patch(
        'connect_ext_ppr.service.get_configuration_from_media',
        return_value=conf_data,
    )

    items = [
        {
            "id": "PRD-XXX-XXX-XXX-00001",
            "name": "Prd XXX XXX XXX 00001",
            "description": "MPN-A",
            "mpn": "MPN-A",
            "unit": {
                "name": "Gb",
            },
            "type": "reservation",
        },
        {
            "id": "PRD-XXX-XXX-XXX-00002",
            "name": "Prd XXX XXX XXX 00002",
            "description": "MPN-B",
            "mpn": "MPN-B",
            "status": "published",
            "unit": {
                "name": "Devices",
            },
            "type": "reservation",
        },
    ]
    mocker.patch(
        'connect_ext_ppr.service.get_product_items',
        return_value=items,
    )
    mocker.patch(
        'connect_ext_ppr.service.create_ppr_to_media',
        return_value={
            'id': 'MFL-NEW-PPR',
            'file': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                    'New_PPR.xlsx',
        },
    )

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
        json={},
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 201
    data = response.json()
    events = data.pop('events')
    id = data.pop('id')
    file_name = data['file'].pop('name')
    file_size = data['file'].pop('size')
    assert data == {
        'file': {
            'id': 'MFL-NEW-PPR',
            'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                        'New_PPR.xlsx',
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'configuration': {
            'id': configuration.id,
            'state': 'active',
        },
        'version': 1,
        'product_version': 3,
        'description': (
            f"\n**Description**\n{file_name.rsplit('.', 1)[0]}\n\nSummary:\n* Resources\n"
            f"    * Created\n        * PRD-XXX-XXX-XXX-00001\n        * PRD-XXX-XXX-XXX-00002\n\n"
        ),
        'status': 'ready',
    }
    assert id[:6] == 'PPRFL-'
    assert isinstance(events['created']['at'], str)
    assert file_name[:23] == 'PPR_PRD-XXX-XXX-XXX_v1_'
    assert events['created']['by'] == 'SU-295-689-628'
    assert 10000 < file_size < 20000


def test_generate_ppr_no_configuration(
    deployment_factory,
    connect_auth_header,
    installation,
    api_client,
    mocker,
):
    deployment = deployment_factory(product_id='PRD-XXX-XXX-XXX')

    items = [
        {
            "id": "PRD-XXX-XXX-XXX-00001",
            "name": "Prd XXX XXX XXX 00001",
            "description": "MPN-A",
            "mpn": "MPN-A",
            "unit": {
                "name": "Gb",
            },
            "type": "reservation",
        },
        {
            "id": "PRD-XXX-XXX-XXX-00002",
            "name": "Prd XXX XXX XXX 00002",
            "description": "MPN-B",
            "mpn": "MPN-B",
            "status": "published",
            "unit": {
                "name": "Devices",
            },
            "type": "reservation",
        },
    ]
    mocker.patch(
        'connect_ext_ppr.service.get_product_items',
        return_value=items,
    )
    mocker.patch(
        'connect_ext_ppr.service.create_ppr_to_media',
        return_value={
            'id': 'MFL-NEW-PPR',
            'file': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                    'New_PPR.xlsx',
        },
    )

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pprs',
        installation=installation,
        json={},
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 201
    data = response.json()
    events = data.pop('events')
    id = data.pop('id')
    file_name = data['file'].pop('name')
    file_size = data['file'].pop('size')
    assert data == {
        'file': {
            'id': 'MFL-NEW-PPR',
            'location': '/files/media/public/accounts/PA-000-000/pprs/dc08ea505ec483394494/'
                        'New_PPR.xlsx',
            'mime_type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        'version': 1,
        'product_version': 3,
        'description': (
            f"\n**Description**\n{file_name.rsplit('.', 1)[0]}\n\nSummary:\n* Resources\n"
            f"    * Created\n        * PRD-XXX-XXX-XXX-00001\n        * PRD-XXX-XXX-XXX-00002\n\n"
        ),
        'status': 'ready',
    }
    assert id[:6] == 'PPRFL-'
    assert isinstance(events['created']['at'], str)
    assert file_name[:23] == 'PPR_PRD-XXX-XXX-XXX_v1_'
    assert events['created']['by'] == 'SU-295-689-628'
    assert 10000 < file_size < 20000
