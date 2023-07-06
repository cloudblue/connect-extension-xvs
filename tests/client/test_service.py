from unittest import TestCase

import pytest
import responses

from connect_ext_ppr.client import CBCClient
from connect_ext_ppr.client.exception import ClientError


@responses.activate
def test_service_discovery(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    flat_catalog_type,
    flat_catalog_type_objects,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=flat_catalog_type_objects,
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    services = cbc_client(flat_catalog_type).get()
    TestCase().assertListEqual(services, flat_catalog_type_objects)


@responses.activate
def test_service_discovery_client_error(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    flat_catalog_type,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        status=401,
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(ClientError):
        cbc_client(flat_catalog_type).get()


@responses.activate
def test_service_discovery_no_service(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    flat_catalog_type,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=[],
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(TypeError):
        cbc_client(flat_catalog_type).property1


@responses.activate
def test_service_discovery_more_than_one_service(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    flat_catalog_type,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=['service1', 'service2'],
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(TypeError):
        cbc_client(flat_catalog_type).property1


@responses.activate
def test_service_discovery_collection_with_underscore(
        cbc_endpoint,
        cbc_oauth_key,
        cbc_oauth_secret,
        flat_catalog_type,
        flat_catalog_type_objects,
):
    service_id = flat_catalog_type_objects[0]['aps']['id']
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=flat_catalog_type_objects,
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    collection = cbc_client(flat_catalog_type).flat_catalog

    assert collection.path == f'{cbc_endpoint}/aps/2/resources/{service_id}/flat-catalog'


@responses.activate
def test_service_discovery_collection_without_underscore(
        cbc_endpoint,
        cbc_oauth_key,
        cbc_oauth_secret,
        flat_catalog_type,
        flat_catalog_type_objects,
):
    service_id = flat_catalog_type_objects[0]['aps']['id']
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=flat_catalog_type_objects,
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    collection = cbc_client(flat_catalog_type).flatcatalog

    assert collection.path == f'{cbc_endpoint}/aps/2/resources/{service_id}/flatcatalog'


@responses.activate
def test_service_discovery_collection_wrong_collection_value_type(
        cbc_endpoint,
        cbc_oauth_key,
        cbc_oauth_secret,
        flat_catalog_type,
        flat_catalog_type_objects,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=flat_catalog_type_objects,
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(TypeError):
        cbc_client(flat_catalog_type).collection(1)


@responses.activate
def test_service_discovery_collection_blank_collection_value(
        cbc_endpoint,
        cbc_oauth_key,
        cbc_oauth_secret,
        flat_catalog_type,
        flat_catalog_type_objects,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=flat_catalog_type_objects,
    )

    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    with pytest.raises(ValueError):
        cbc_client(flat_catalog_type).collection('')
