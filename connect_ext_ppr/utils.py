import os

from connect.client import ClientError, ConnectClient
from connect.client.rql import R
from connect.eaas.core.logging import RequestLogger

from connect_ext_ppr.schemas import DeploymentSchema


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


def get_deployment_schema(deployment, product, vendor, hub):
    """
    Returns DeploymentSchema for the deployment
    :param deployment: Deployment model
    :param product: Product model from Connect
    :param vendor: Vendor Account model from Connect
    :param hub: Hub model from Connect
    :rtype: DeploymentSchema
    """
    return DeploymentSchema(
        id=deployment.id,
        account_id=deployment.account_id,
        hub={
            'id': deployment.hub_id,
            'name': hub['name'],
        },
        product={
            'id': deployment.product_id,
            'name': product['name'],
            'icon': product.get('icon'),
        },
        owner={
            'id': deployment.vendor_id,
            'name': vendor['name'],
            'icon': vendor.get('icon'),
        },
        status=deployment.status,
        last_sync_at=deployment.last_sync_at,
        events={
            'created': {'at': deployment.created_at},
            'updated': {'at': deployment.updated_at},
        },
    )


def get_client_object(client, collection_name, obj_id):
    """
    Get client object by id
    :param ConnectClient client:
    :param str collection_name:
    :param str obj_id:
    """
    try:
        return getattr(client, collection_name)[obj_id].get()
    except ClientError as exc:
        raise _process_exc(exc)
