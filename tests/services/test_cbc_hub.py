from copy import deepcopy
from unittest import TestCase

import pytest
import responses

from connect_ext_ppr.client.exception import ClientError
from connect_ext_ppr.services.cbc_hub import CBCService


def __mock_common_services(
    cbc_endpoint,
    aps_controller_details,
    plm_services,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps',
        json=aps_controller_details,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?implementing({CBCService.PLM_TYPE})',
        json=plm_services,
    )


@responses.activate
def test_get_product_details_positive(
    hub_credentials,
    cbc_endpoint,
    plm_services,
    aps_controller_details,
    product_details,
):
    product_id = 'PRD-000-000-000'
    service_id = plm_services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        plm_services,
    )

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/'
            f'appDetails/{product_id}?fulfillmentSystem=connect',
        json=product_details,
    )

    cbc_service = CBCService(hub_credentials)
    product = cbc_service.get_product_details(product_id)

    TestCase().assertDictEqual(product, product_details)


@responses.activate
def test_get_product_details_not_found(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    plm_services,
    get_product_details_not_found_response,
):
    product_id = 'PRD-000-000-000'
    service_id = plm_services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        plm_services,
    )

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/'
            f'appDetails/{product_id}?fulfillmentSystem=connect',
        status=500,
        json=get_product_details_not_found_response,
    )

    cbc_service = CBCService(hub_credentials)
    with pytest.raises(ClientError):
        cbc_service.get_product_details(product_id)


@responses.activate
def test_install_product_positive(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    plm_services,
    subscriptions,
):
    product_id = 'PRD-000-000-000'
    service_id = plm_services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        plm_services,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.SUBSCRIPTION_TYPE})&subscriptionId=1',
        json=subscriptions,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/appDetails/{product_id}/import',
        status=202,
    )

    cbc_service = CBCService(hub_credentials)
    response = cbc_service.install_product(product_id)

    assert response is None


@responses.activate
def test_install_product_not_found(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    plm_services,
    subscriptions,
    import_product_not_found_response,
):
    product_id = 'PRD-000-000-000'
    service_id = plm_services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        plm_services,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.SUBSCRIPTION_TYPE})&subscriptionId=1',
        json=subscriptions,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/appDetails/{product_id}/import',
        status=500,
        json=import_product_not_found_response,
    )

    cbc_service = CBCService(hub_credentials)
    with pytest.raises(ClientError):
        cbc_service.install_product(product_id)


@responses.activate
def test_update_product_positive(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    plm_services,
    subscriptions,
    update_product_response,
):
    product_id = 'PRD-000-000-000'
    service_id = plm_services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        plm_services,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.SUBSCRIPTION_TYPE})&subscriptionId=1',
        json=subscriptions,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/appDetails/{product_id}/upgrade',
        status=202,
        json=update_product_response,
    )

    cbc_service = CBCService(hub_credentials)
    response = cbc_service.update_product(product_id)

    TestCase().assertDictEqual(response, update_product_response)


@responses.activate
def test_update_product_negative_product_not_installed(
    hub_credentials,
    cbc_endpoint,
    plm_services,
    aps_controller_details,
    subscriptions,
    product_not_installed_response,
):
    product_id = 'PRD-000-000-000'
    service_id = plm_services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        plm_services,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.SUBSCRIPTION_TYPE})&subscriptionId=1',
        json=subscriptions,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/appDetails/{product_id}/upgrade',
        status=500,
        json=product_not_installed_response,
    )

    cbc_service = CBCService(hub_credentials)
    with pytest.raises(ClientError):
        cbc_service.update_product(product_id)


def test_hub_credential_validation_none():
    with pytest.raises(ValueError):
        CBCService(None)


def test_hub_credential_validation_wrong_type():
    with pytest.raises(TypeError):
        CBCService('Wrong_value')


def test_hub_credential_validation_empty_controller_url(
        hub_credentials,
):
    wrong_hub_credentials = deepcopy(hub_credentials)
    wrong_hub_credentials.controller_url = None

    with pytest.raises(ValueError):
        CBCService(wrong_hub_credentials)


def test_hub_credential_validation_empty_oauth_key(
        hub_credentials,
):
    wrong_hub_credentials = deepcopy(hub_credentials)
    wrong_hub_credentials.oauth_key = None

    with pytest.raises(ValueError):
        CBCService(wrong_hub_credentials)


def test_hub_credential_validation_empty_oauth_secret(
        hub_credentials,
):
    wrong_hub_credentials = deepcopy(hub_credentials)
    wrong_hub_credentials.oauth_secret = None

    with pytest.raises(ValueError):
        CBCService(wrong_hub_credentials)


@responses.activate
def test_client_validation_invalid(
    cbc_endpoint,
    hub_credentials,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps',
        status=404,
    )

    with pytest.raises(ValueError):
        CBCService(hub_credentials)
