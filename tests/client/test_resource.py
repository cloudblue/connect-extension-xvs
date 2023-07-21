import io
from unittest import TestCase

import responses


def test_resource(cbc_endpoint, cbc_client):
    resource = cbc_client.test_collection['identifier']

    assert resource.path == f'{cbc_endpoint}/test-collection/identifier'


@responses.activate
def test_resource_get(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/test-collection/identifier',
        json=service,
    )

    obj = cbc_client.test_collection['identifier'].get()

    TestCase().assertDictEqual(obj, service)


@responses.activate
def test_resource_action_with_payload(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/test-collection/identifier/upload',
        json=service,
    )

    obj = cbc_client.test_collection['identifier'].action(
        name='upload',
        payload={},
    )

    TestCase().assertDictEqual(obj, service)


@responses.activate
def test_resource_action_not_json_response(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/test-collection/identifier/upload',
        body='Not a JSON',
    )

    obj = cbc_client.test_collection['identifier'].action(
        name='upload',
        payload={},
    )

    assert obj is None


@responses.activate
def test_resource_action_with_extra_headers(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/test-collection/identifier/upload',
        json=service,
    )

    obj = cbc_client.test_collection['identifier'].action(
        name='upload',
        payload={},
        headers={'Content-Type': 'application/json'},
    )

    TestCase().assertDictEqual(obj, service)


@responses.activate
def test_resource_action_with_file(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/test-collection/identifier/upload',
        json=service,
    )

    obj = cbc_client.test_collection['identifier'].action(
        name='upload',
        file=io.StringIO("some initial text data"),
    )

    TestCase().assertDictEqual(obj, service)


@responses.activate
def test_resource_action_with_headers_output(
    cbc_endpoint,
    cbc_client,
        service,
):
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/test-collection/identifier/upload',
        json=service,
    )

    obj = cbc_client.test_collection['identifier'].action(
        name='upload',
        payload={},
        output='headers',
    )

    assert 'Content-Type' in obj.keys()
