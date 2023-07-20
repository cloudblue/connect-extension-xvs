import io
from unittest import TestCase

import pytest
import responses


def test_collection(cbc_endpoint, cbc_client):
    collection = cbc_client.test_collection

    assert collection.path == f'{cbc_endpoint}/test-collection'


def test_collection_blank_collection_value(cbc_client):
    with pytest.raises(ValueError):
        cbc_client.collection('')


def test_collection_wrong_collection_value_type(cbc_client):
    with pytest.raises(TypeError):
        cbc_client.collection(1)


@responses.activate
def test_collection_get(
    cbc_endpoint,
    cbc_client,
        services,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/flat-catalog',
        json=services,
    )

    objs = cbc_client.flat_catalog.get()

    TestCase().assertListEqual(objs, services)


def test_sub_collection(cbc_endpoint, cbc_client):
    sub_collection = cbc_client.flat_catalog.wizard

    assert sub_collection.path == f'{cbc_endpoint}/flat-catalog/wizard'


def test_sub_collection_blank(cbc_endpoint, cbc_client):
    with pytest.raises(ValueError):
        cbc_client.flat_catalog.collection('')


def test_sub_collection_wrong_type(cbc_client):
    with pytest.raises(TypeError):
        cbc_client.flat_catalog.collection(1)


def test_collection_resource(cbc_endpoint, cbc_client):
    sub_collection = cbc_client.flat_catalog.sub_collection.wizard['identifier']

    assert sub_collection.path == f'{cbc_endpoint}/flat-catalog/sub-collection/wizard/identifier'


def test_collection_resource_blank(cbc_client):
    with pytest.raises(ValueError):
        cbc_client.flat_catalog.wizard['']


def test_collection_resource_wrong_type(cbc_client):
    with pytest.raises(TypeError):
        cbc_client.flat_catalog.wizard[67567.87]


@responses.activate
def test_collection_get_with_identifier(
    cbc_endpoint,
    cbc_client,
        service,
):
    object_id = service['aps']['id']

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/flat-catalog/wizard/{object_id}',
        json=service,
    )

    obj = cbc_client.flat_catalog.wizard[object_id].get()

    TestCase().assertDictEqual(obj, service)


@responses.activate
def test_collection_action(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/flat-catalog/wizard/upload',
        json=service,
    )

    obj = cbc_client.flat_catalog.wizard.action(
        name='upload',
        payload={},
    )

    TestCase().assertDictEqual(obj, service)


def test_collection_action_with_both_payload_and_file(cbc_client):
    with pytest.raises(ValueError):
        cbc_client.flat_catalog.wizard.action(
            name='upload',
            payload={'a': 'b'},
            file=io.StringIO("some initial text data"),
        )
