from copy import deepcopy
from unittest import TestCase
from unittest.mock import patch, PropertyMock

import pytest
import responses

from connect_ext_ppr.client.exception import ClientError
from connect_ext_ppr.client.ns import Service
from connect_ext_ppr.services.cbc_hub import CBCService


def __mock_common_services(
    cbc_endpoint,
    aps_controller_details,
    services,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps',
        json=aps_controller_details,
    )
    # responses library treats following urls as same
    # /aps/2/resources/
    # /aps/2/resources/?implementing(abc)
    # /aps/2/resources/?implementing(xyz)
    # That means only one service implementation is enough for all services for identification
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/',
        json=services,
    )


@responses.activate
def test_get_product_details_positive(
    hub_credentials,
    cbc_endpoint,
    services,
    aps_controller_details,
    product_details,
):
    product_id = 'PRD-000-000-000'
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
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
    services,
    get_product_details_not_found_response,
):
    product_id = 'PRD-000-000-000'
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
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
    services,
    subscriptions,
):
    product_id = 'PRD-000-000-000'
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
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
    services,
    subscriptions,
    import_product_not_found_response,
):
    product_id = 'PRD-000-000-000'
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
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
    services,
    subscriptions,
    update_product_response,
):
    product_id = 'PRD-000-000-000'
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
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
    services,
    aps_controller_details,
    subscriptions,
    product_not_installed_response,
):
    product_id = 'PRD-000-000-000'
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
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


@responses.activate
def test_parse_ppr_positive(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    sample_ppr_file,
    parse_ppr_success_response,
):
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/parseConfig',
        json=parse_ppr_success_response,
    )

    cbc_service = CBCService(hub_credentials)
    response = cbc_service.parse_ppr(sample_ppr_file)

    TestCase().assertDictEqual(response, parse_ppr_success_response)


@responses.activate
def test_apply_ppr_positive(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    parse_ppr_success_response,
):
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/applyConfig',
        status=202,
        headers={
            'APS-Info': 'Importing configuration for request b09b2497-484c-4b1c-92a6-73a0443193ac',
        },
    )

    cbc_service = CBCService(hub_credentials)
    tracking_id = cbc_service.apply_ppr(parse_ppr_success_response)

    assert tracking_id == 'b09b2497-484c-4b1c-92a6-73a0443193ac'


@responses.activate
def test_apply_ppr_negative_no_tracking_provided(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    parse_ppr_success_response,
):
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/applyConfig',
        status=202,
    )

    cbc_service = CBCService(hub_credentials)
    tracking_id = cbc_service.apply_ppr(parse_ppr_success_response)

    assert not tracking_id


@responses.activate
def test_apply_ppr_negative_tracking_id_not_present_in_header(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    parse_ppr_success_response,
):
    service_id = services[0]['aps']['id']

    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
    )
    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/'
            f'{service_id}/applyConfig',
        status=202,
        headers={
            'APS-Info': 'Importing configuration for request.',
        },
    )

    cbc_service = CBCService(hub_credentials)
    tracking_id = cbc_service.apply_ppr(parse_ppr_success_response)

    assert not tracking_id


@responses.activate
def test_search_task_logs_by_name_positive(
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    task_logs_response,
):
    __mock_common_services(
        cbc_endpoint,
        aps_controller_details,
        services,
    )

    service_id = services[0]['aps']['id']
    tracking_id = 'b09b2497-484c-4b1c-92a6-73a0443193ac'

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/getTaskLog?task_name=%25{tracking_id}%25',
        json=task_logs_response,
    )

    cbc_service = CBCService(hub_credentials)

    task_logs = cbc_service.search_task_logs_by_name(tracking_id)

    TestCase().assertListEqual(task_logs, task_logs_response)


def __mock_for_price_operations(
    account_id,
    service_id,
    cbc_endpoint,
    aps_controller_details,
    reseller_accounts,
    reseller_admin_users,
    aps_token_response,
):
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps',
        json=aps_controller_details,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.ACCOUNT_TYPE})&id={account_id}',
        json=reseller_accounts,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/collections/admin-users?organization.id={account_id}',
        json=reseller_admin_users,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/getToken?'
            f"user_id={reseller_admin_users[0]['userId']}",
        json=aps_token_response,
    )


@responses.activate
@patch.object(Service, 'service_path', new_callable=PropertyMock)
def test_parse_price_file(
    mock_service_path,
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    reseller_accounts,
    reseller_admin_users,
    aps_token_response,
    parse_price_file_response,
):
    service_id = services[0]['aps']['id']
    account_id = 1000001
    vendor_id = 'VA-000-000'

    mock_service_path.return_value = f'{cbc_endpoint}/aps/2/resources/{service_id}'
    __mock_for_price_operations(
        account_id,
        service_id,
        cbc_endpoint,
        aps_controller_details,
        reseller_accounts,
        reseller_admin_users,
        aps_token_response,
    )

    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/flat-catalog/'
            f'price-import-wizard/upload?vendorId={vendor_id}',
        json=parse_price_file_response,
    )

    with open('./tests/fixtures/Sweet_Pies_Price_List_USD.xlsx', 'rb') as file:
        cbc_service = CBCService(hub_credentials)
        response = cbc_service.parse_price_file(
            account_id, vendor_id, file,
        )

        TestCase().assertDictEqual(response, parse_price_file_response)


@responses.activate
@patch.object(Service, 'service_path', new_callable=PropertyMock)
def test_prepare_price_proposal(
    mock_service_path,
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    reseller_accounts,
    reseller_admin_users,
    aps_token_response,
    parse_price_file_response,
    price_proposal_response,
):
    service_id = services[0]['aps']['id']
    account_id = 1000001

    mock_service_path.return_value = f'{cbc_endpoint}/aps/2/resources/{service_id}'
    __mock_for_price_operations(
        account_id,
        service_id,
        cbc_endpoint,
        aps_controller_details,
        reseller_accounts,
        reseller_admin_users,
        aps_token_response,
    )

    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/flat-catalog/'
            f"price-import-wizard/{parse_price_file_response['dataId']}/prepare-proposals",
        json=price_proposal_response,
    )

    cbc_service = CBCService(hub_credentials)
    response = cbc_service.prepare_price_proposal(
        account_id,
        parse_price_file_response,
        True,
        True,
        True,
        '07/20/2023',
    )
    TestCase().assertDictEqual(response, price_proposal_response)


@responses.activate
@patch.object(Service, 'service_path', new_callable=PropertyMock)
def test_apply_prices(
    mock_service_path,
    hub_credentials,
    cbc_endpoint,
    aps_controller_details,
    services,
    reseller_accounts,
    reseller_admin_users,
    aps_token_response,
    parse_price_file_response,
    price_proposal_response,
):
    service_id = services[0]['aps']['id']
    account_id = 1000001
    file_name = 'Sweet_Pies_Price_List_USD.xlsx'

    mock_service_path.return_value = f'{cbc_endpoint}/aps/2/resources/{service_id}'
    __mock_for_price_operations(
        account_id,
        service_id,
        cbc_endpoint,
        aps_controller_details,
        reseller_accounts,
        reseller_admin_users,
        aps_token_response,
    )

    responses.add(
        method='POST',
        url=f'{cbc_endpoint}/aps/2/resources/{service_id}/flat-catalog/'
            f"price-import-wizard/{parse_price_file_response['dataId']}/set-prices",
        headers={
            'APS-Info': f'Update prices by {file_name}',
        },
    )

    cbc_service = CBCService(hub_credentials)
    response = cbc_service.apply_prices(
        account_id,
        parse_price_file_response,
        True,
        True,
        True,
        '07/20/2023',
        file_name,
    )

    assert response == f'Update prices by {file_name}'


@responses.activate
@patch.object(Service, 'service_path', new_callable=PropertyMock)
def test_get_aps_token_auth_reseller_account_not_found(
    mock_service_path,
    hub_credentials,
    cbc_endpoint,
    services,
    aps_controller_details,
):
    service_id = services[0]['aps']['id']
    account_id = 1000001
    mock_service_path.return_value = f'{cbc_endpoint}/aps/2/resources/{service_id}'

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps',
        json=aps_controller_details,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.ACCOUNT_TYPE})&id={account_id}',
        json=[],
    )

    with pytest.raises(ValueError):
        cbc_service = CBCService(hub_credentials)
        cbc_service.get_aps_token_auth(account_id)


@responses.activate
@patch.object(Service, 'service_path', new_callable=PropertyMock)
def test_get_aps_token_auth_reseller_admin_not_found(
    mock_service_path,
    hub_credentials,
    cbc_endpoint,
    services,
    aps_controller_details,
    reseller_accounts,
):
    service_id = services[0]['aps']['id']
    account_id = 1000001
    mock_service_path.return_value = f'{cbc_endpoint}/aps/2/resources/{service_id}'

    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps',
        json=aps_controller_details,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/resources/?'
            f'implementing({CBCService.ACCOUNT_TYPE})&id={account_id}',
        json=reseller_accounts,
    )
    responses.add(
        method='GET',
        url=f'{cbc_endpoint}/aps/2/collections/admin-users?organization.id={account_id}',
        json=[],
    )

    with pytest.raises(ValueError):
        cbc_service = CBCService(hub_credentials)
        cbc_service.get_aps_token_auth(account_id)
