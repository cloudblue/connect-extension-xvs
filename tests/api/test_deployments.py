import copy

from connect.eaas.core.constants import PROXIED_CONNECT_API_ATTR_NAME


def test_proxied_connect_endpoints(api_client):
    proxied = getattr(api_client._webapp_class, PROXIED_CONNECT_API_ATTR_NAME)
    assert isinstance(proxied, dict)
    assert proxied == {
        '/public/v1/media': 'edit',
    }


def test_get_deployments(
    mocker,
    deployment,
    installation,
    api_client,
):
    mocker.patch(
        'connect_ext_ppr.webapp.get_all_info',
        return_value=[
            {
                'product': {
                    'id': 'PRD-XXX-XXX-XXX',
                    'icon': '/media/VA-000-000/PRD-XXX-XXX-XXX/media/beer.png',
                    'name': 'Bottle of beer',
                    'status': 'published',
                },
                'vendor': {
                    'id': 'VA-000-000',
                    'name': 'Vendor account 00 for El Loro',
                    'icon': '/media/VA-000-000/media/icon.png',
                },
                'contract': {
                    'marketplace': {
                        'hubs': [
                            {
                                'hub': {'id': 'HB-0000-0000', 'name': 'Hub for the best'},
                            },
                        ],
                    },
                },
            },
        ],
    )
    response = api_client.get(
        '/api/deployments',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == 1
    data = response.json()[0]
    assert 'id' in data
    assert 'last_sync_at' in data
    assert 'at' in data['events']['created']
    assert 'at' in data['events']['updated']
    assert data['account_id'] == 'PA-000-000'

    product = deployment.product
    assert data['product'] == {
        'id': product.id,
        'name': product.name,
        'icon': product.logo,
    }
    assert data['owner'] == {
        'id': 'VA-000-000',
        'name': 'Vendor account 00 for El Loro',
        'icon': '/media/VA-000-000/media/icon.png',
    }
    assert data['hub'] == {
        'id': 'HB-0000-0000',
        'name': 'Hub for the best',
    }
    assert data['status'] == 'pending'


def test_get_deployments_empty(
    mocker,
    installation,
    api_client,
):
    mocker.patch(
        'connect_ext_ppr.webapp.get_all_info',
        return_value=[],
    )
    response = api_client.get(
        '/api/deployments',
        installation=installation,
    )
    assert response.status_code == 200
    assert response.json() == []


def test_get_deployment(
    mocker,
    deployment,
    installation,
    api_client,
):
    mocker.patch(
        'connect_ext_ppr.webapp.get_client_object',
        side_effect=[
            {
                'id': 'HB-0000-0000',
                'name': 'Hub for the best',
            },
            {
                'owner': {
                    'id': 'VA-000-000',
                    'name': 'Vendor account 00 for El Loro',
                    'icon': '/media/VA-000-000/media/icon.png',
                },
            },
        ],
    )
    response = api_client.get(
        f'/api/deployments/{deployment.id}',
        installation=installation,
    )
    assert response.status_code == 200
    data = response.json()
    assert 'id' in data
    assert 'last_sync_at' in data
    assert 'at' in data['events']['created']
    assert 'at' in data['events']['updated']
    assert data['account_id'] == 'PA-000-000'
    product = deployment.product
    assert data['product'] == {
        'id': product.id,
        'name': product.name,
        'icon': product.logo,
    }
    assert data['owner'] == {
        'id': 'VA-000-000',
        'name': 'Vendor account 00 for El Loro',
        'icon': '/media/VA-000-000/media/icon.png',
    }
    assert data['hub'] == {
        'id': 'HB-0000-0000',
        'name': 'Hub for the best',
    }
    assert data['status'] == 'pending'


def test_get_deployment_not_found(
    deployment,
    installation,
    api_client,
):
    response = api_client.get(
        '/api/deployments/DPL-YYY-YYY',
        installation=installation,
    )
    assert response.status_code == 404
    assert response.json() == {
        'error_code': 'EXT_001',
        'errors': [
            'Object `DPL-YYY-YYY` not found.',
        ],
    }


def test_get_deployments_marketplaces(
    mocker,
    installation,
    api_client,
    marketplace,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
):
    m1 = marketplace
    m2 = copy.deepcopy(marketplace)
    m2['id'] = 'MP-123-123'
    m3 = copy.deepcopy(marketplace)
    m3['id'] = 'MP-123-123'
    marketplaces = [m1, m2]

    mocker.patch(
        'connect_ext_ppr.webapp.get_marketplaces',
        return_value=marketplaces,
    )
    deployment = deployment_factory(account_id=installation['owner']['id'])
    another_dep = deployment_factory(account_id='PA-123-123')
    ppr = ppr_version_factory(deployment=deployment)
    marketplace_config_factory(deployment=deployment, marketplace_id=m1['id'], ppr_id=ppr.id)
    marketplace_config_factory(deployment=deployment, marketplace_id=m2['id'])
    marketplace_config_factory(deployment=another_dep, marketplace_id=m3['id'])

    response = api_client.get(
        f'/api/deployments/{deployment.id}/marketplaces',
        installation=installation,
    )

    assert response.status_code == 200

    expected_response = [
        {
            'id': m['id'],
            'name': m['name'],
            'icon': m['icon'],
        } for m in marketplaces
    ]

    expected_response[0].update({'ppr': {'id': ppr.id, 'version': ppr.version}})
    assert response.json() == expected_response


def test_get_deployments_marketplaces_not_accounts_deployment(
    installation,
    api_client,
    marketplace,
    deployment_factory,
    marketplace_config_factory,
):
    deployment = deployment_factory(account_id="INVALID")
    marketplace_config_factory(deployment=deployment, marketplace_id=marketplace['id'])

    response = api_client.get(
        f'/api/deployments/{deployment.id}/marketplaces',
        installation=installation,
    )

    assert response.status_code == 404
