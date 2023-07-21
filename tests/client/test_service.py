from unittest import TestCase

import pytest
import responses

from connect_ext_ppr.client.exception import ClientError


@responses.activate
def test_service_discovery(
    cbc_endpoint,
    cbc_client,
    flat_catalog_type,
        services,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=services,
    )

    services = cbc_client(flat_catalog_type).get()
    TestCase().assertListEqual(services, services)


@responses.activate
def test_service_discovery_client_error(
    cbc_endpoint,
    cbc_client,
    flat_catalog_type,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        status=401,
    )

    with pytest.raises(ClientError):
        cbc_client(flat_catalog_type).get()


@responses.activate
def test_service_discovery_no_service(
    cbc_endpoint,
    cbc_client,
    flat_catalog_type,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=[],
    )

    with pytest.raises(TypeError):
        cbc_client(flat_catalog_type).property1


@responses.activate
def test_service_discovery_more_than_one_service(
    cbc_endpoint,
    cbc_client,
    flat_catalog_type,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=['service1', 'service2'],
    )

    with pytest.raises(TypeError):
        cbc_client(flat_catalog_type).property1


@responses.activate
def test_service_discovery_collection_with_underscore(
        cbc_endpoint,
        cbc_client,
        flat_catalog_type,
        services,
):
    service_id = services[0]['aps']['id']
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=services,
    )

    collection = cbc_client(flat_catalog_type).flat_catalog

    assert collection.path == f'{cbc_endpoint}/aps/2/resources/{service_id}/flat-catalog'


@responses.activate
def test_service_discovery_collection(
        cbc_endpoint,
        cbc_client,
        flat_catalog_type,
        services,
):
    service_id = services[0]['aps']['id']
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=services,
    )

    service = cbc_client(flat_catalog_type)

    # First time -  calls service discovery API
    collection = service.flatcatalog

    assert collection.path == f'{cbc_endpoint}/aps/2/resources/{service_id}/flatcatalog'

    # 2nd time - no call to service discovery API
    collection = service.subscriptions

    assert collection.path == f'{cbc_endpoint}/aps/2/resources/{service_id}/subscriptions'


@responses.activate
def test_service_discovery_collection_wrong_collection_value_type(
        cbc_endpoint,
        cbc_client,
        flat_catalog_type,
        services,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=services,
    )

    with pytest.raises(TypeError):
        cbc_client(flat_catalog_type).collection(1)


@responses.activate
def test_service_discovery_collection_blank_collection_value(
        cbc_endpoint,
        cbc_client,
        flat_catalog_type,
        services,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({flat_catalog_type})',
        json=services,
    )

    with pytest.raises(ValueError):
        cbc_client(flat_catalog_type).collection('')
