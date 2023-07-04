from unittest import TestCase
from unittest.mock import patch

import pytest
import responses
from requests import Session

from connect_ext_ppr.client import CBCClient
from connect_ext_ppr.client.exception import ClientError


@responses.activate
def test_client_get(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    flat_catalog_type_object,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    object_id = flat_catalog_type_object['aps']['id']

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/{object_id}',
        json=flat_catalog_type_object,
    )

    obj = cbc_client.get(object_id)

    TestCase().assertDictEqual(obj, flat_catalog_type_object)


@responses.activate
def test_client_get_empty_identifier(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(ValueError):
        cbc_client.get('')


@responses.activate
def test_client_get_invalid_type(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(TypeError):
        cbc_client.get(100.05)


def test_client_collection_with_underscore(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    collection = cbc_client.flat_catalog

    assert collection.path == f'{cbc_endpoint}/flat-catalog'


def test_client_collection_without_underscore(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    collection = cbc_client.flat

    assert collection.path == f'{cbc_endpoint}/flat'


def test_client_resource(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    resource = cbc_client['identifier']

    assert resource.path == f'{cbc_endpoint}/aps/2/resources/identifier'


def test_client_resource_invalid_type(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(TypeError):
        cbc_client[100.05]


def test_client_resource_empty_value(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(ValueError):
        cbc_client['']


def test_client_with_default_headers(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    headers = {'Custom': 'Value'}

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
        default_headers=headers,
    )

    assert cbc_client.default_headers == headers


def test_collection_service_discovery_empty_type(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(ValueError):
        cbc_client('')


def test_collection_service_discovery_invalid_type(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(TypeError):
        cbc_client(100.05)


@patch.object(Session, 'send', side_effect=Exception('Mock error!'))
def test_client_get_connection_error(
    mock_send,
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(ClientError):
        cbc_client.get('identifier')
