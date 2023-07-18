
def test_get_deployments_requests(
    dbsession,
    mocker,
    deployment_factory,
    deployment_request_factory,
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
                'id': 'VA-000-000',
                'name': 'Vendor account 00 for El Loro',
                'icon': '/media/VA-000-000/media/icon.png',
            },
        ],
    )
    dep1 = deployment_factory(dbsession, account_id=installation['owner']['id'])
    dep2 = deployment_factory(dbsession, account_id='PA-123-456')

    dr1 = deployment_request_factory(deployment=dep1, ppr_id='PPRFL-12345')
    dr2 = deployment_request_factory(deployment=dep1, ppr_id='PPRFL-12346')
    deployment_request_factory(deployment=dep2, ppr_id='PPRFL-12347')

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
