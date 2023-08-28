import pytest

from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.enums import ConfigurationStateChoices, DeploymentStatusChoices
from connect_ext_ppr.models.file import File


def test_get_configurations(
    deployment,
    configuration,
    installation,
    api_client,
):
    response = api_client.get(
        f'/api/deployments/{deployment.id}/configurations',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == 1
    data = response.json()[0]
    assert 'id' in data
    assert 'at' in data['events']['created']
    assert 'at' in data['events']['updated']
    assert data['file'] == {
        'name': 'test.json',
        'location': '/files/media/public/accounts/PA-000-000/configurations/dc08ea505ec483394494'
                    '/test.json',
        'size': 17,
        'id': 'MFL-6390-1110-0832',
        'mime_type': 'application/json',
    }
    assert data['state'] == ConfigurationStateChoices.inactive


@pytest.mark.parametrize(
    ('pagination', 'expected_amount', 'expected_header'),
    (
        ('limit=10&offset=0', 10, 'items 0-9/12'),
        ('limit=5&offset=10', 2, 'items 10-11/12'),
        ('limit=5&offset=21', 0, 'items 21-21/12'),
    ),
)
def test_get_configurations_with_pagination(
    pagination,
    expected_amount,
    expected_header,
    deployment_factory,
    file_factory,
    configuration_factory,
    installation,
    api_client,
):
    deployment = deployment_factory(account_id=installation['owner']['id'])
    for i in range(12):
        ppr_file = file_factory(id=f'ML-{i}')
        configuration_factory(file=ppr_file.id, deployment=deployment.id)

    response = api_client.get(
        f'/api/deployments/{deployment.id}/configurations?{pagination}',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == expected_amount
    assert response.headers['Content-Range'] == expected_header


@pytest.mark.parametrize(
    ('filters', 'expected_amount', 'expected_header'),
    (
        ('id=CFL-2', 1, 'items 0-0/1'),
    ),
)
def test_get_configurations_with_filters(
    filters,
    expected_amount,
    expected_header,
    deployment_factory,
    file_factory,
    configuration_factory,
    installation,
    api_client,
):
    deployment = deployment_factory(account_id=installation['owner']['id'])
    for i in range(12):
        ppr_file = file_factory(id=f'ML-{i}')
        configuration_factory(id=f'CFL-{i}', file=ppr_file.id, deployment=deployment.id)

    response = api_client.get(
        f'/api/deployments/{deployment.id}/configurations?{filters}',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == expected_amount
    assert response.headers['Content-Range'] == expected_header


def test_get_configurations_empty(
    deployment,
    installation,
    api_client,
):
    response = api_client.get(
        f'/api/deployments/{deployment.id}/configurations',
        installation=installation,
    )
    assert response.status_code == 200
    assert response.json() == []


def test_get_configuration(
    deployment,
    configuration,
    installation,
    api_client,
):
    response = api_client.get(
        f'/api/deployments/{deployment.id}/configurations/{configuration.id}',
        installation=installation,
    )
    assert response.status_code == 200
    data = response.json()
    assert 'id' in data
    assert 'at' in data['events']['created']
    assert 'at' in data['events']['updated']
    assert data['file'] == {
        'name': 'test.json',
        'location': '/files/media/public/accounts/PA-000-000/configurations/dc08ea505ec483394494'
                    '/test.json',
        'size': 17,
        'id': 'MFL-6390-1110-0832',
        'mime_type': 'application/json',
    }
    assert data['state'] == ConfigurationStateChoices.inactive


def test_get_configuration_not_found(
    deployment,
    installation,
    api_client,
):
    response = api_client.get(
        f'/api/deployments/{deployment.id}/configurations/CFL-XXX-XXX',
        installation=installation,
    )
    assert response.status_code == 404
    assert response.json() == {
        'error_code': 'EXT_001',
        'errors': [
            'Object `CFL-XXX-XXX` not found.',
        ],
    }


def test_post_configuration(
    deployment_factory,
    media_response,
    configuration_json,
    connect_auth_header,
    installation,
    api_client,
    dbsession,
    mocker,
):
    deployment = deployment_factory(product_id='PRD-XXX-XXX-XXX')
    mocker.patch(
        'connect_ext_ppr.service.get_configuration_from_media',
        return_value=configuration_json,
    )
    response = api_client.post(
        f'/api/deployments/{deployment.id}/configurations',
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
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert 'id' in data
    assert 'at' in data['events']['created']
    assert 'at' in data['events']['updated']
    assert data['file'] == {
        'id': 'MFL-6390-1110-0832',
        'name': 'test.json',
        'location': (
            '/files/media/public/accounts/PA-000-000/configurations/dc08ea505ec483394494/test.json'
        ),
        'size': 17,
        'mime_type': 'application/json',
    }
    assert data['state'] == ConfigurationStateChoices.active
    assert data['events']['created']['by'] == {
        'id': 'SU-295-689-628',
        'name': 'Neri',
    }
    assert data['events']['updated']['by'] == {
        'id': 'SU-295-689-628',
        'name': 'Neri',
    }

    assert dbsession.query(Configuration).count() == 1
    assert dbsession.query(File).count() == 1


def test_post_configuration_deactivate_previous(
    deployment_factory,
    file,
    configuration,
    configuration_json,
    connect_auth_header,
    installation,
    api_client,
    dbsession,
    mocker,
):
    deployment = deployment_factory(product_id='PRD-XXX-XXX-XXX')
    mocker.patch(
        'connect_ext_ppr.service.get_configuration_from_media',
        return_value=configuration_json,
    )
    response = api_client.post(
        f'/api/deployments/{deployment.id}/configurations',
        installation=installation,
        json={
            'file': {
                'id': 'MFL-212-85-06',
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
    assert response.status_code == 201

    assert dbsession.query(Configuration).count() == 2
    assert dbsession.query(File).count() == 2

    prev_conf = dbsession.query(Configuration).get(configuration.id)
    assert prev_conf.state == ConfigurationStateChoices.inactive
    new_conf = dbsession.query(Configuration).get(response.json()['id'])
    assert new_conf.state == ConfigurationStateChoices.active


def test_post_configuration_wrong_deployment(
    media_response,
    installation,
    api_client,
):
    response = api_client.post(
        '/api/deployments/DPL-YYY-YYY/configurations',
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


def test_post_configuration_file_already_exists(
    deployment,
    file,
    configuration,
    installation,
    api_client,
    dbsession,
):
    response = api_client.post(
        f'/api/deployments/{deployment.id}/configurations',
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
    )
    assert response.status_code == 400
    assert response.json() == {
        'error_code': 'EXT_002',
        'errors': [
            f'Object `{file.id}` already exists, cannot create a new one.',
        ],
    }


def test_post_configuration_invalid(
    deployment_factory,
    media_response,
    configuration_json,
    connect_auth_header,
    installation,
    api_client,
    dbsession,
    mocker,
):
    deployment = deployment_factory(product_id='PRD-YYY-YYY-YYY')
    mocker.patch(
        'connect_ext_ppr.service.get_configuration_from_media',
        return_value=configuration_json,
    )
    response = api_client.post(
        f'/api/deployments/{deployment.id}/configurations',
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
        headers={
            "connect-auth": connect_auth_header,
        },
    )
    assert response.status_code == 400
    assert response.json() == {
        'error_code': 'VAL_000',
        'errors': [
            '["\'PRD-YYY-YYY-YYY\' is a required property"]',
        ],
    }


def test_delete_configuration(
    deployment,
    configuration,
    file,
    installation,
    api_client,
    dbsession,
    client_mocker_factory,
    connect_client,
):
    deployment.status = DeploymentStatusChoices.synced
    dbsession.commit()
    client_mocker = client_mocker_factory()
    client_mocker.delete(
        f'media/folders/accounts/{deployment.account_id}/{deployment.id}/'
        f'configurations/files/{file.id}',
    )

    response = api_client.delete(
        f'/api/deployments/{deployment.id}/configurations/{configuration.id}',
        installation=installation,
    )
    assert response.status_code == 204
    assert response._content == b''

    assert dbsession.query(Configuration).count() == 0
    assert dbsession.query(File).count() == 0


def test_delete_configuration_not_found(
    deployment,
    installation,
    api_client,
):
    response = api_client.delete(
        f'/api/deployments/{deployment.id}/configurations/CFL-XXX-XXX',
        installation=installation,
    )
    assert response.status_code == 404
    assert response.json() == {
        'error_code': 'EXT_001',
        'errors': [
            'Object `CFL-XXX-XXX` not found.',
        ],
    }


def test_delete_configuration_active(
    deployment,
    configuration,
    file,
    installation,
    api_client,
    dbsession,
    client_mocker_factory,
    connect_client,
):
    configuration.state = ConfigurationStateChoices.active
    deployment.status = DeploymentStatusChoices.synced
    dbsession.commit()

    response = api_client.delete(
        f'/api/deployments/{deployment.id}/configurations/{configuration.id}',
        installation=installation,
    )
    assert response.status_code == 400
    assert response.json() == {
        'error_code': 'EXT_004',
        'errors': [
            f'Active configuration `{configuration.id}` cannot be deleted.',
        ],
    }


@pytest.mark.parametrize(
    ('conf_state', 'dep_status'),
    (
        (ConfigurationStateChoices.inactive, DeploymentStatusChoices.pending),
        (ConfigurationStateChoices.inactive, DeploymentStatusChoices.processing),
        (ConfigurationStateChoices.deleted, DeploymentStatusChoices.pending),
        (ConfigurationStateChoices.deleted, DeploymentStatusChoices.processing),
    ),
)
def test_delete_configuration_deployment_not_synced(
    deployment,
    configuration,
    file,
    installation,
    api_client,
    dbsession,
    client_mocker_factory,
    connect_client,
    conf_state,
    dep_status,
):
    configuration.state = conf_state
    deployment.status = dep_status
    dbsession.commit()

    response = api_client.delete(
        f'/api/deployments/{deployment.id}/configurations/{configuration.id}',
        installation=installation,
    )
    assert response.status_code == 400
    assert response.json() == {
        'error_code': 'EXT_005',
        'errors': [
            f'Configuration `{configuration.id}` cannot be deleted, because related deployment is '
            'not synced.',
        ],
    }
