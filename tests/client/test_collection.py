import io
from unittest import TestCase

import pytest
import responses

from connect_ext_ppr.client import CBCClient


def test_collection(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    collection = cbc_client.test_collection

    assert collection.path == f'{cbc_endpoint}/test-collection'


def test_collection_blank_collection_value(
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
        cbc_client.collection('')


def test_collection_wrong_collection_value_type(
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
        cbc_client.collection(1)


@responses.activate
def test_collection_get(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
    flat_catalog_type_objects,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/flat-catalog',
        json=flat_catalog_type_objects,
    )

    objs = cbc_client.flat_catalog.get()

    TestCase().assertListEqual(objs, flat_catalog_type_objects)


@responses.activate
def test_sub_collection(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    sub_collection = cbc_client.flat_catalog.wizard

    assert sub_collection.path == f'{cbc_endpoint}/flat-catalog/wizard'


@responses.activate
def test_sub_collection_blank(
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
        cbc_client.flat_catalog.collection('')


@responses.activate
def test_sub_collection_wrong_type(
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
        cbc_client.flat_catalog.collection(1)


@responses.activate
def test_collection_resource(
    cbc_endpoint,
    cbc_oauth_key,
    cbc_oauth_secret,
):
    cbc_client = CBCClient(
        endpoint=cbc_endpoint,
        oauth_key=cbc_oauth_key,
        oauth_secret=cbc_oauth_secret,
    )

    sub_collection = cbc_client.flat_catalog.sub_collection.wizard['identifier']

    assert sub_collection.path == f'{cbc_endpoint}/flat-catalog/sub-collection/wizard/identifier'


@responses.activate
def test_collection_resource_blank(
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
        cbc_client.flat_catalog.wizard['']


@responses.activate
def test_collection_resource_wrong_type(
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
        cbc_client.flat_catalog.wizard[67567.87]


@responses.activate
def test_collection_get_with_identifier(
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
        url=f'{cbc_endpoint}/flat-catalog/wizard/{object_id}',
        json=flat_catalog_type_object,
    )

    obj = cbc_client.flat_catalog.wizard[object_id].get()

    TestCase().assertDictEqual(obj, flat_catalog_type_object)


@responses.activate
def test_collection_action(
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

    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/flat-catalog/wizard/upload',
        json=flat_catalog_type_object,
    )

    obj = cbc_client.flat_catalog.wizard.action(
        name='upload',
        payload={},
    )

    TestCase().assertDictEqual(obj, flat_catalog_type_object)


def test_collection_action_with_both_payload_and_file(
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
        cbc_client.flat_catalog.wizard.action(
            name='upload',
            payload={'a': 'b'},
            file=io.StringIO("some initial text data"),
        )
