def test_products(
    deployment_factory,
    installation,
    api_client,
    product_factory,
):
    product1 = product_factory(id='PRD-000-001', name='Product 1')
    product2 = product_factory(id='PRD-000-002', name='Product 2')

    deployment_factory(account_id='PA-159-159')
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id=product1.id,
    )
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id=product2.id,
    )
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id=product2.id,
        hub_id='HB-123-12',
    )

    response = api_client.get(
        '/api/products',
        installation=installation,
    )

    assert response.status_code == 200
    assert len(response.json()) == 2

    assert response.json() == [
        {
            'id': product1.id,
            'name': product1.name,
            'icon': product1.logo,
        },
        {
            'id': product2.id,
            'name': product2.name,
            'icon': product2.logo,
        },
    ]
