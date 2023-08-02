import copy

import pytest
from sqlalchemy import null

from connect_ext_ppr.models.deployment import DeploymentRequest, MarketplaceConfiguration
from connect_ext_ppr.models.task import Task


def test_list_deployments_requests(
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
        'connect_ext_ppr.webapp.get_hubs',
        side_effect=[[hub_data]],
    )
    dep1 = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    dr1 = deployment_request_factory(deployment=dep1)
    dr2 = deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    response = api_client.get(
        '/api/deployments/requests',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == 2

    for response_item, dr in zip(response.json(), [dr1, dr2]):
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


def test_get_deployment_request(
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
    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    response = api_client.get(
        f'/api/deployments/requests/{dr1.id}',
        installation=installation,
    )
    response_item = response.json()
    events = response_item.pop('events')
    assert response.status_code == 200
    assert response_item == {
        'id': dr1.id,
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
            'id': dr1.ppr_id,
            'version': dr1.ppr.version,
        },
        'status': dr1.status.value,
        'manually': dr1.manually,
        'delegate_l2': dr1.delegate_l2,

    }
    assert list(events.keys()) == ['created']
    assert list(events['created'].keys()) == ['at', 'by']


def test_get_deployment_request_not_found(
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }

    dep1 = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep1)
    bad_dr = deployment_request_factory(deployment=dep2)

    response = api_client.get(
        f'/api/deployments/requests/{bad_dr.id}',
        installation=installation,
    )
    error = response.json()

    assert response.status_code == 404
    assert error == {
        'error_code': 'EXT_001', 'errors': [f'Object `{bad_dr.id}` not found.'],
    }


@pytest.mark.parametrize(
    'status,error',
    (('pending', None), ('error', 'An Error message!')),
)
def test_list_deployment_request_tasks(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
    task_factory,
    status,
    error,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    dep1 = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    dr1 = deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    t1 = task_factory(deployment_request=dr1, status=status, error_message=error)
    t2 = task_factory(deployment_request=dr1, task_index='002', status=status, error_message=error)

    response = api_client.get(
        f'/api/deployments/requests/{dr1.id}/tasks',
        installation=installation,
    )
    assert response.status_code == 200
    assert len(response.json()) == 2

    for response_item, task, idx in zip(response.json(), [t1, t2], ['001', '002']):
        events = response_item.pop('events')
        error_message = response_item.pop('error_message', None)
        assert response_item['id'].endswith(idx)
        assert response_item == {
            'id': task.id,
            'title': task.title,
            'status': task.status,
        }
        assert error_message == error
        assert list(events.keys()) == ['created']
        assert list(events['created'].keys()) == ['at', 'by']


def test_list_deployment_request_tasks_not_found(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
    task_factory,
):

    dep1 = deployment_factory(account_id=installation['owner']['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    dr1 = deployment_request_factory(deployment=dep1, status='done')
    bad_dr = deployment_request_factory(deployment=dep2)

    task_factory(deployment_request=dr1)
    task_factory(deployment_request=dr1, task_index='002')

    response = api_client.get(
        f'/api/deployments/requests/{bad_dr.id}/tasks',
        installation=installation,
    )
    error = response.json()

    assert response.status_code == 404
    assert error == {
        'error_code': 'EXT_001', 'errors': [f'Object `{bad_dr.id}` not found.'],
    }


def test_create_deployment_request(
    mocker,
    dbsession,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep)

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {
            'choices': [{'id': 'MP-123'}],
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    deployment_request = dbsession.query(DeploymentRequest).first()

    assert response.status_code == 200, response.json()
    data = response.json()
    events = data.pop('events')
    assert data == {
        'id': deployment_request.id,
        'deployment': {
            'id': dep.id,
            'product': {
                'id': dep.product.id,
                'name': dep.product.name,
                'icon': dep.product.logo,
            },
            'hub': hub_data,
        },
        'ppr': {
            'id': ppr.id,
            'version': ppr.version,
        },
        'status': DeploymentRequest.STATUSES.pending.value,
        'manually': True,
        'delegate_l2': True,
    }
    assert list(events.keys()) == ['created']
    assert list(events['created'].keys()) == ['at', 'by']
    assert events['created']['by'] == installation['owner']['id']

    assert dbsession.query(MarketplaceConfiguration).filter_by(
        marketplace='MP-123',
        deployment_request=deployment_request.id,
    ).filter(
        MarketplaceConfiguration.deployment_id.is_(null()),
        MarketplaceConfiguration.ppr_id.is_(null()),
    ).count() == 1

    tasks = dbsession.query(Task).order_by(Task.id)
    assert tasks.count() == 3
    assert tasks[0].id == f'TSK-{deployment_request.id[5:]}-000'
    assert tasks[0].type == Task.TYPES.ppr_validation
    assert tasks[1].id == f'TSK-{deployment_request.id[5:]}-001'
    assert tasks[1].type == Task.TYPES.apply_and_delegate
    assert tasks[2].id == f'TSK-{deployment_request.id[5:]}-002'
    assert tasks[2].type == Task.TYPES.delegate_to_l2


def test_create_deployment_request_without_delegation_to_l2(
    mocker,
    dbsession,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep)

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': False,
        'marketplaces': {
            'choices': [{'id': 'MP-123'}],
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    deployment_request = dbsession.query(DeploymentRequest).first()

    assert response.status_code == 200, response.json()
    data = response.json()
    events = data.pop('events')
    assert data == {
        'id': deployment_request.id,
        'deployment': {
            'id': dep.id,
            'product': {
                'id': dep.product.id,
                'name': dep.product.name,
                'icon': dep.product.logo,
            },
            'hub': hub_data,
        },
        'ppr': {
            'id': ppr.id,
            'version': ppr.version,
        },
        'status': DeploymentRequest.STATUSES.pending.value,
        'manually': True,
        'delegate_l2': False,
    }
    assert list(events.keys()) == ['created']
    assert list(events['created'].keys()) == ['at', 'by']
    assert events['created']['by'] == installation['owner']['id']

    tasks = dbsession.query(Task).order_by(Task.id)
    assert tasks.count() == 2
    assert tasks[0].id == f'TSK-{deployment_request.id[5:]}-000'
    assert tasks[0].type == Task.TYPES.ppr_validation
    assert tasks[1].id == f'TSK-{deployment_request.id[5:]}-001'
    assert tasks[1].type == Task.TYPES.apply_and_delegate


def test_create_deployment_request_with_all_marketplaces(
    mocker,
    dbsession,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep)

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'marketplaces': {
            'choices': [],
            'all': True,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    deployment_request = dbsession.query(DeploymentRequest).first()

    assert response.status_code == 200, response.json()
    data = response.json()
    events = data.pop('events')
    assert data == {
        'id': deployment_request.id,
        'deployment': {
            'id': dep.id,
            'product': {
                'id': dep.product.id,
                'name': dep.product.name,
                'icon': dep.product.logo,
            },
            'hub': hub_data,
        },
        'ppr': {
            'id': ppr.id,
            'version': ppr.version,
        },
        'status': DeploymentRequest.STATUSES.pending.value,
        'manually': True,
        'delegate_l2': False,
    }
    assert list(events.keys()) == ['created']
    assert list(events['created'].keys()) == ['at', 'by']
    assert events['created']['by'] == installation['owner']['id']

    assert dbsession.query(MarketplaceConfiguration).filter_by(
        deployment_request=deployment_request.id,
    ).filter(MarketplaceConfiguration.deployment_id.is_(null())).count() == 2


def test_create_deployment_request_invalid_deployment(
    deployment_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    deployment_factory(account_id=installation['owner']['id'])
    dep = deployment_factory(account_id='PA-123-456')
    ppr = ppr_version_factory(deployment=dep)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {
            'id': ppr.id,
        },
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {'all': True},
    }

    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'VAL_001'
    assert response.json()['errors'] == [f'deployment: {dep.id} not found.']


def test_create_deployment_request_invalid_ppr(
    deployment_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    dep = deployment_factory(account_id=installation['owner']['id'])
    other_dep = deployment_factory(account_id='PA-123-456')
    ppr = ppr_version_factory(deployment=other_dep)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {'all': True},
    }

    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'VAL_001'
    assert response.json()['errors'] == [f'ppr: {ppr.id} not found.']


def test_create_deployment_invalid_marketplace(
    mocker,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep)
    other_dep = deployment_factory(hub_id=hub_data['id'])

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)
    marketplace_config_factory(deployment=other_dep, marketplace_id='MP-126', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {
            'choices': [{'id': 'MP-125'}, {'id': 'MP-123'}, {'id': 'MP-126'}],
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'VAL_002', response.json()
    assert response.json()['errors'] == [
        'marketplaces: This values [\'MP-125\', \'MP-126\'] are invalid.',
    ]


@pytest.mark.parametrize('choices', ([], None))
def test_create_deployment_invalid_all_false_w_empty_choices(
    choices,
    mocker,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep)
    other_dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)
    marketplace_config_factory(deployment=other_dep, marketplace_id='MP-126', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {
            'choices': choices,
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'VAL_003'
    assert response.json()['errors'] == ['At least one choice needs to be specified.']


def test_create_deployment_invalid_all_false_wo_choices(
    mocker,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep)
    other_dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)
    marketplace_config_factory(deployment=other_dep, marketplace_id='MP-126', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'VAL_003'
    assert response.json()['errors'] == ['At least one choice needs to be specified.']


def test_create_deployment_invalid_ppr_for_marketplace(
    mocker,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    file_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    ppr = ppr_version_factory(deployment=dep, version=1, id='PPRFL-123')
    ppr_file = file_factory(id='FL-123')
    ppr2 = ppr_version_factory(deployment=dep, version=2, id='PPRFL-124', file=ppr_file.id)

    marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr2.id)
    marketplace_config_factory(deployment=dep, marketplace_id='MP-126', ppr_id=ppr.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {
            'choices': [{'id': 'MP-123'}, {'id': 'MP-126'}, {'id': 'MP-124'}],
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'VAL_004', response.json()
    assert response.json()['errors'] == [
        'Cannot applied PPR to marketplaces [\'MP-123\'].',
    ]


def test_create_deployment_request_w_open_request(
    mocker,
    deployment_factory,
    deployment_request_factory,
    marketplace_config_factory,
    ppr_version_factory,
    file_factory,
    installation,
    api_client,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }

    mocker.patch('connect_ext_ppr.webapp.get_client_object', side_effect=[hub_data])

    dep = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    deployment_request_factory(deployment=dep, status='pending')
    ppr = ppr_version_factory(deployment=dep, version=1, id='PPRFL-123')
    ppr_file = file_factory(id='FL-123')
    ppr2 = ppr_version_factory(deployment=dep, version=2, id='PPRFL-124', file=ppr_file.id)

    marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr2.id)

    body = {
        'deployment': {'id': dep.id},
        'ppr': {'id': ppr.id},
        'manually': True,
        'delegate_l2': True,
        'marketplaces': {
            'choices': [{'id': 'MP-123'}],
            'all': False,
        },
    }
    response = api_client.post(
        '/api/deployments/requests',
        installation=installation,
        json=body,
    )

    assert response.status_code == 400
    assert response.json()['error_code'] == 'EXT_017', response.json()
    assert response.json()['errors'] == [
        'Cannot create a new request, an open one already exists.',
    ]


def test_list_deployment_request_marketplaces(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
    marketplace,
    marketplace_config_factory,
    ppr_version_factory,
):
    m1 = marketplace
    m2 = copy.deepcopy(marketplace)
    m2['id'] = 'MP-123-123'
    marketplaces = [m1, m2]

    mocker.patch(
        'connect_ext_ppr.webapp.get_marketplaces',
        return_value=marketplaces,
    )
    dep1 = deployment_factory(account_id=installation['owner']['id'])
    ppr = ppr_version_factory(deployment=dep1)

    dr1 = deployment_request_factory(deployment=dep1)

    marketplace_config_factory(deployment_request=dr1, marketplace_id=m1['id'])
    marketplace_config_factory(deployment_request=dr1, marketplace_id=m2['id'], ppr_id=ppr.id)

    marketplace_config_factory(deployment=dep1, marketplace_id=m1['id'])
    marketplace_config_factory(deployment=dep1, marketplace_id=m2['id'])
    marketplace_config_factory(deployment=dep1, marketplace_id='MP-124-114')

    expected_response = [
        {
            'id': m['id'],
            'name': m['name'],
            'icon': m['icon'],
        } for m in marketplaces
    ]
    expected_response[1]['ppr'] = {'id': ppr.id, 'version': ppr.version}

    response = api_client.get(
        f'/api/deployments/requests/{dr1.id}/marketplaces',
        installation=installation,
    )

    assert response.status_code == 200
    assert response.json() == expected_response


def test_list_deployment_request_marketplaces_not_found(
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
):
    dep1 = deployment_factory(account_id=installation['owner']['id'])
    dep2 = deployment_factory(account_id='PA-098-890')

    deployment_request_factory(deployment=dep1)
    dr2 = deployment_request_factory(deployment=dep2)

    response = api_client.get(
        f'/api/deployments/requests/{dr2.id}/marketplaces',
        installation=installation,
    )

    error = response.json()

    assert response.status_code == 404
    assert error == {
        'error_code': 'EXT_001', 'errors': [f'Object `{dr2.id}` not found.'],
    }


def test_abort_deployment_request_aborted(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
    task_factory,
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

    dr1 = deployment_request_factory(deployment=dep1, status='pending')
    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    t1 = task_factory(deployment_request=dr1, status='pending')
    t2 = task_factory(deployment_request=dr1, task_index='002', status='pending')

    response = api_client.post(
        f'/api/deployments/requests/{dr1.id}/abort',
        installation=installation,
        headers={
            "connect-auth": (
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7Im9pZCI6IlNVLTI5NS02ODktN"
                "jI4IiwibmFtZSI6Ik5lcmkifX0.U_T6vuXnD293hcWNTJZ9QBViteNv8JXUL2gM0BezQ-k"
            ),
        },
    )
    response_item = response.json()
    events = response_item.pop('events')
    assert response.status_code == 200
    assert dr1.status == 'aborted'
    assert response_item == {
        'id': dr1.id,
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
            'id': dr1.ppr_id,
            'version': dr1.ppr.version,
        },
        'status': dr1.status.value,
        'manually': dr1.manually,
        'delegate_l2': dr1.delegate_l2,

    }
    assert list(events.keys()) == ['created', 'aborted', 'aborting']
    assert list(events['created'].keys()) == ['at', 'by']
    assert list(events['aborted'].keys()) == ['at', 'by']
    assert list(events['aborting'].keys()) == ['at', 'by']
    for task in (t1, t2):
        assert task.status == 'aborted'
        assert task.aborted_at > dr1.aborting_at
        assert task.aborted_by == dr1.aborted_by


def test_abort_deployment_request_aborting(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
    task_factory,
):
    dep1 = deployment_factory(account_id=installation['owner']['id'])
    dep2 = deployment_factory(account_id='PA-098-890')

    deployment_request_factory(deployment=dep1)

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

    dr1 = deployment_request_factory(deployment=dep1, status='processing')
    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    t1 = task_factory(deployment_request=dr1, status='done')
    t2 = task_factory(deployment_request=dr1, task_index='002', status='pending')

    response = api_client.post(
        f'/api/deployments/requests/{dr1.id}/abort',
        installation=installation,
        headers={
            "connect-auth": (
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7Im9pZCI6IlNVLTI5NS02ODktN"
                "jI4IiwibmFtZSI6Ik5lcmkifX0.U_T6vuXnD293hcWNTJZ9QBViteNv8JXUL2gM0BezQ-k"
            ),
        },
    )
    response_item = response.json()
    events = response_item.pop('events')
    assert response.status_code == 200
    assert dr1.status == 'aborting'
    assert response_item == {
        'id': dr1.id,
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
            'id': dr1.ppr_id,
            'version': dr1.ppr.version,
        },
        'status': dr1.status.value,
        'manually': dr1.manually,
        'delegate_l2': dr1.delegate_l2,

    }
    assert not dr1.aborted_at
    assert not dr1.aborted_by
    assert list(events.keys()) == ['created', 'aborting']
    assert list(events['created'].keys()) == ['at', 'by']
    assert list(events['aborting'].keys()) == ['at', 'by']
    for task, task_status in ((t1, 'done'), (t2, 'aborted')):
        assert task.status == task_status
    assert not t1.aborted_at
    assert not t1.aborted_by
    assert t2.aborted_at > dr1.aborting_at
    assert t2.aborted_by == dr1.aborting_by


def test_abort_deployment_request_not_allow(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
    installation,
    api_client,
    task_factory,
):
    hub_data = {
        'id': 'HB-0000-0001',
        'name': 'Another Hub for the best',
    }
    dep1 = deployment_factory(account_id=installation['owner']['id'], hub_id=hub_data['id'])
    dep2 = deployment_factory(account_id='PA-123-456')

    origin_status = 'done'
    dr1 = deployment_request_factory(deployment=dep1, status=origin_status)
    deployment_request_factory(deployment=dep1)
    deployment_request_factory(deployment=dep2)

    t1 = task_factory(deployment_request=dr1, status='pending')
    t2 = task_factory(deployment_request=dr1, task_index='002', status='pending')

    response = api_client.post(
        f'/api/deployments/requests/{dr1.id}/abort',
        installation=installation,
        headers={
            "connect-auth": (
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7Im9pZCI6IlNVLTI5NS02ODktN"
                "jI4IiwibmFtZSI6Ik5lcmkifX0.U_T6vuXnD293hcWNTJZ9QBViteNv8JXUL2gM0BezQ-k"
            ),
        },
    )
    error = response.json()

    assert response.status_code == 400
    assert (t1.status, t2.status) == ('pending', 'pending')
    assert dr1.status == origin_status
    assert error == {
        'error_code': 'VAL_005', 'errors': [
            "Transition not allowed: can not set status from `done` to 'aborting'"
            ", allowed status sources for 'aborting' are 'pending, processing'.",
        ],
    }
