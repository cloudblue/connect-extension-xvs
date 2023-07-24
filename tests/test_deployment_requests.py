def test_get_deployments_requests(
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
