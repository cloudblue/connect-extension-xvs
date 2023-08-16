import pytest


def test_products(
    deployment_factory,
    installation,
    api_client,
    product_factory,
):
    product1 = product_factory(id='PRD-000-001', name='Product 1', owner_id='VA-000-001')
    product2 = product_factory(id='PRD-000-002', name='Product 2', owner_id='VA-000-002')
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
            'owner': {
                'id': product1.owner_id,
                'name': product1.owner.name,
                'icon': product1.owner.logo,
            },
        },
        {
            'id': product2.id,
            'name': product2.name,
            'icon': product2.logo,
            'owner': {
                'id': product2.owner_id,
                'name': product2.owner.name,
                'icon': product2.owner.logo,
            },
        },
    ]


@pytest.mark.parametrize(
    ('pagination', 'expected_amount', 'expected_header'),
    (
        ('limit=10&offset=0', 10, 'items 0-9/12'),
        ('limit=6&offset=9', 3, 'items 9-11/12'),
        ('limit=7&offset=14', 0, 'items 14-14/12'),
    ),
)
def test_products_with_pagination(
    pagination,
    expected_amount,
    expected_header,
    deployment_factory,
    installation,
    api_client,
    product_factory,
):

    for i in range(12):
        product = product_factory(id=f'PRD-000-00{i}', name='Product 1')
        deployment_factory(
            account_id=installation['owner']['id'],
            product_id=product.id,
            hub_id=f'HB-000-00{i}',
        )

    response = api_client.get(f'/api/products?{pagination}', installation=installation)

    assert response.status_code == 200
    assert len(response.json()) == expected_amount
    assert response.headers['Content-Range'] == expected_header


def test_hubs_by_product(
    deployment_factory,
    installation,
    api_client,
    mocker,
    product_factory,
):
    product1 = product_factory(id='PRD-000-001', name='Product 1')
    product2 = product_factory(id='PRD-000-002', name='Product 2')

    deployment_factory(account_id='PA-159-159')
    deployment_factory(
        account_id=installation['owner']['id'],
        product_id=product1.id,
    )
    dep1 = deployment_factory(
        account_id=installation['owner']['id'],
        product_id=product2.id,
    )
    dep2 = deployment_factory(
        account_id=installation['owner']['id'],
        product_id=product2.id,
        hub_id='HB-123-12',
    )

    hubs = [
        {'id': dep1.hub_id, 'name': 'An awesome hub', 'instance': {'id': '37624yu2gr-34535rwew'}},
        {'id': dep2.hub_id, 'name': 'Another awesome hub', 'instance': {'id': '37624yu2g-1231231'}},
    ]
    mocker.patch('connect_ext_ppr.webapp.get_hubs', side_effect=[hubs])

    response = api_client.get(
        f'/api/products/{product2.id}/hubs',
        installation=installation,
    )

    assert response.status_code == 200
    assert len(response.json()) == 2

    assert response.json() == hubs
