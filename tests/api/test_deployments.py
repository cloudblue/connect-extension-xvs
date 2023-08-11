import copy

import pytest
from connect.eaas.core.constants import PROXIED_CONNECT_API_ATTR_NAME


def test_proxied_connect_endpoints(api_client):
    proxied = getattr(api_client._webapp_class, PROXIED_CONNECT_API_ATTR_NAME)
    assert isinstance(proxied, dict)
    assert proxied == {
        '/public/v1/media': 'edit',
        '/files': 'view',
    }


def test_get_deployments(
    mocker,
    deployment,
    installation,
    api_client,
):
    mocker.patch(
        'connect_ext_ppr.webapp.get_all_listing_info',
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
        'connect_ext_ppr.webapp.get_all_listing_info',
        return_value=[],
    )
    response = api_client.get(
        '/api/deployments',
        installation=installation,
    )
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.parametrize(
    ('filters', 'res_length'),
    (
        ('', 3),  # no filters - all results
        ('?abra=cadabra', 3),  # just wrong name of field - ignored
        ('?product_id=PRD-YYY-YYY-YYY', 1),
        ('?product_id=PRD-XXX-XXX-XXX', 2),
        ('?product_id=PRD-ZZZ-ZZZ-ZZZ', 0),  # deployment with this product_id doesn't exist
        ('?hub_id=HB-0000-0000', 2),
        ('?hub_id=HB-0000-0001', 1),
        ('?product_id=PRD-XXX-XXX-XXX&hub_id=HB-0000-0000', 1),
        ('?product_id=PRD-XXX-XXX-XXX&hub_id=HB-0000-0001', 1),
        ('?product_id=PRD-YYY-YYY-YYY&hub_id=HB-0000-0000', 1),
        ('?product_id=PRD-YYY-YYY-YYY&hub_id=HB-0000-0001', 0),
    ),
)
def test_get_deployments_w_filter(
    filters,
    res_length,
    mocker,
    deployment_factory,
    installation,
    api_client,
):
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id='PRD-XXX-XXX-XXX',
        hub_id='HB-0000-0000',
    )
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id='PRD-XXX-XXX-XXX',
        hub_id='HB-0000-0001',
    )
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id='PRD-YYY-YYY-YYY',
        hub_id='HB-0000-0000',
    )
    listing_data = {
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
                    {
                        'hub': {'id': 'HB-0000-0001', 'name': 'Hub for the worst'},
                    },
                ],
            },
        },
    }
    listing_data2 = copy.deepcopy(listing_data)
    listing_data2['product']['id'] = 'PRD-YYY-YYY-YYY'
    del listing_data2['contract']['marketplace']['hubs'][1]

    mocker.patch(
        'connect_ext_ppr.webapp.get_all_listing_info',
        return_value=[
            listing_data,
            listing_data2,
        ],
    )
    response = api_client.get(
        f'/api/deployments{filters}',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == res_length


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
    marketplace_config_factory(deployment=deployment, marketplace_id='MP-657', active=False)
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


def test_list_deployments_requests_for_deployment(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch(
        'connect_ext_ppr.webapp.get_hub',
        return_value=hub_data,
    )
    dep1 = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    dr1 = deployment_request_factory(deployment=dep1)
    dr2 = deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    response = api_client.get(
        f'/api/deployments/{dep1.id}/requests',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == 2

    for response_item, dr in zip(response.json(), [dr2, dr1]):
        events = response_item.pop('events')
        assert response_item == {
            'id': dr.id,
            'deployment': {
                'id': dep1.id,
                'product': {
                    'id': dep1.product.id,
                    'name': dep1.product.name,
                    'icon': dep1.product.logo,
                },
                'hub': hub_data,
            },
            'ppr': {
                'id': dr.ppr_id,
                'version': dr.ppr.version,
            },
            'status': dr.status.value,
            'manually': dr.manually,
            'delegate_l2': dr.delegate_l2,

        }
        assert list(events.keys()) == ['created']
        assert list(events['created'].keys()) == ['at', 'by']


def test_list_deployment_request_deployment_not_found(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
):

    dep1 = deployment_factory(account_id=installation['owner']['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep1)

    response = api_client.get(
        f'/api/deployments/{dep2.id}/requests',
        installation=installation,
    )
    error = response.json()

    assert response.status_code == 404
    assert error == {
        'error_code': 'EXT_001', 'errors': [f'Object `{dep2.id}` not found.'],
    }
