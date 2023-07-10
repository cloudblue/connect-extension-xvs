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
    assert data['product'] == {
        'id': 'PRD-XXX-XXX-XXX',
        'name': 'Bottle of beer',
        'icon': '/media/VA-000-000/PRD-XXX-XXX-XXX/media/beer.png',
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
                'id': 'PRD-XXX-XXX-XXX',
                'icon': '/media/VA-000-000/PRD-XXX-XXX-XXX/media/beer.png',
                'name': 'Bottle of beer',
                'status': 'published',
                'owner': {
                    'id': 'VA-000-000',
                    'name': 'Vendor account 00 for El Loro',
                    'icon': '/media/VA-000-000/media/icon.png',
                },
            },
            {
                'id': 'HB-0000-0000',
                'name': 'Hub for the best',
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
    assert data['product'] == {
        'id': 'PRD-XXX-XXX-XXX',
        'name': 'Bottle of beer',
        'icon': '/media/VA-000-000/PRD-XXX-XXX-XXX/media/beer.png',
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
            'Object DPL-YYY-YYY not found',
        ],
    }
