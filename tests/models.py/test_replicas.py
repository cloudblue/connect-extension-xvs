from connect_ext_ppr.models.replicas import Product, ProductItem


def test_create_product_item(dbsession, product, item_response):
    prod = Product(
        id=product['id'],
        name=product['name'],
        version=product['version'],
        logo=product['icon'],
        owner=product['owner']['id'],
    )
    dbsession.add(prod)
    dbsession.commit()

    resource = ProductItem(
        id=item_response['id'],
        product_id=prod.id,
        product=prod,
        name=item_response['name'],
        description=item_response['description'],
        mpn=item_response['mpn'],
        unit=item_response['unit']['id'],
        type=item_response['type'],
    )
    dbsession.add(resource)
    dbsession.commit()

    assert resource.id == item_response['id']
    assert resource.product_id == prod.id
    assert resource.to_ppr_dict() == {
        "Name_EN": resource.name,
        "Description_EN": resource.description,
        "ResourceCategory": prod.name,
        "MPN": resource.mpn,
        "UOM": resource.unit,
        "Measurable": resource.measurable,
    }
