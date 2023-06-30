import os

from connect.client import ConnectClient
from connect.client.rql import R
from connect.eaas.core.logging import RequestLogger


def _get_extension_client(logger):
    return ConnectClient(
        os.getenv('API_KEY'),
        endpoint=f"https://{os.getenv('SERVER_ADDRESS')}/public/v1",
        use_specs=False,
        logger=RequestLogger(logger),
    )


def _get_installation(client):
    rql = R().external_id.eq(os.getenv('ENVIRONMENT_ID'))
    return client('devops').installations.filter(rql).first()


def get_products(client):
    rql = R().visibility.listing.eq(True)
    rql |= R().visibility.syndication.eq(True)
    return client.products.filter(rql)


def filter_products_list(product_list, key):
    for p in product_list:
        if key == p['id']:
            return p
    raise KeyError(key)
