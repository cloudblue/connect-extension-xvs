import os

from connect.client import ClientError, ConnectClient
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


def _process_exc(exc: ClientError, error_code='EXT_000', errors=None):
    if not exc.error_code:  # pragma: no branch
        exc.error_code = error_code
    if not exc.errors:  # pragma: no branch
        exc.errors = [errors or str(exc)]
    return exc


def get_listings(client):
    rql = R().status.eq("listed")
    return client.listings.filter(rql)


def get_marketplaces(client, mkp_ids):
    rql = R().id.in_(mkp_ids)
    return client.marketplaces.filter(rql)


def get_all_info(client):
    try:
        listings = get_listings(client)
        mkp_ids = list({li['contract']['marketplace']['id'] for li in listings})
        marketplaces = get_marketplaces(client, mkp_ids)
        for list_ in listings:
            mkp_id = list_['contract']['marketplace']['id']
            list_['contract']['marketplace'] = filter_object_list_by_id(marketplaces, mkp_id)
        return listings
    except ClientError as exc:
        raise _process_exc(exc)


def filter_object_list_by_id(object_list, key):
    for o in object_list:
        if key == o['id']:  # pragma: no branch
            return o
    raise KeyError(key)
