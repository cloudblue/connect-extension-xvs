from copy import deepcopy
from unittest import TestCase
from unittest.mock import patch

import pytest
import responses
from connect.client import ClientError
from connect.client.rql import R
from openpyxl import load_workbook

from connect_ext_ppr.services.cbc_hub import CBCService
from connect_ext_ppr.services.pricing import (
    determine_dataset,
    fetch_and_validate_batch,
    get_reseller_id,
    identify_marketplaces,
    identify_reseller_id,
    prepare_file,
    process_batch,
)


def test_identify_marketplaces_positive(
    connect_client,
    client_mocker_factory,
    marketplace,
):
    hub_id = 'HB-000-000'
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces.filter(
        R().hubs.id.eq(hub_id),
    ).mock(
        return_value=[marketplace],
    )

    marketplace_ids = identify_marketplaces(connect_client, hub_id)

    TestCase().assertListEqual(marketplace_ids, [marketplace['id']])


def test_identify_marketplaces_negative_no_marketplace(
    connect_client,
    client_mocker_factory,
):
    hub_id = 'HB-000-000'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces.filter(
        R().hubs.id.eq(hub_id),
    ).mock(
        return_value=[],
    )

    with pytest.raises(ClientError):
        identify_marketplaces(connect_client, hub_id)


@responses.activate
def test_prepare_file_positive(
    connect_client,
    batch_file,
    batch_output_file,
):
    batch_id = 'BAT-0000-0000-0000'

    responses.add(
        method='GET',
        url=f'{connect_client.endpoint}/pricing/batches/BAT-0000-0000-0000/files?'
            f'eq(type,output)&limit=100&offset=0',
        json=[batch_file],
    )
    responses.add(
        method='GET',
        url=f'{connect_client.endpoint}/media/folders/streams_batches/BAT-0000-0000-0000/'
            f'files/MFL-0000-0000-0000/BAT-0000-0000-0000-out.xlsx',
        body=batch_output_file.read(),
        status=200,
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    file_name, dataset = prepare_file(connect_client, batch_id)

    assert file_name == f"{batch_file['id']}.xlsx"
    TestCase().assertDictEqual(
        dataset,
        {
            'cost': True,
            'price': True,
            'msrp': True,
            'effective_date': '07/26/2023',
        },
    )


def test_prepare_file_negative_no_batch_file(
    connect_client,
    client_mocker_factory,
):
    batch_id = 'BAT-0000-0000-0000'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('pricing').batches[batch_id].files.filter(
        type='output',
    ).mock(
        return_value=[],
    )

    with pytest.raises(ClientError):
        prepare_file(connect_client, batch_id)


def test_prepare_file_negative_more_than_one_batch_file(
    connect_client,
    client_mocker_factory,
    batch_file,
):
    batch_id = 'BAT-0000-0000-0000'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('pricing').batches[batch_id].files.filter(
        type='output',
    ).mock(
        return_value=[batch_file, batch_file],
    )

    with pytest.raises(ClientError):
        prepare_file(connect_client, batch_id)


def test_fetch_and_validate_batch_positive(
    connect_client,
    client_mocker_factory,
    batch,
    no_db_deployment,
):
    batch_id = 'BAT-0000-0000-0000'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('pricing').batches.filter(
        id=batch_id,
    ).select(
        '+stream.context',
    ).mock(
        return_value=[batch],
    )

    response = fetch_and_validate_batch(
        connect_client,
        batch_id,
        no_db_deployment,
    )

    TestCase().assertDictEqual(response, batch)


def test_fetch_and_validate_batch_negative_no_batch(
    connect_client,
    client_mocker_factory,
):
    batch_id = 'BAT-0000-0000-0000'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('pricing').batches.filter(
        id=batch_id,
    ).select(
        '+stream.context',
    ).mock(
        return_value=[],
    )

    with pytest.raises(ClientError):
        fetch_and_validate_batch(
            connect_client,
            batch_id,
            None,
        )


def test_fetch_and_validate_batch_negative_batch_does_not_belong_to_deployment(
    connect_client,
    client_mocker_factory,
    batch,
    no_db_deployment,
):
    batch_id = 'BAT-0000-0000-0000'
    deployment = deepcopy(no_db_deployment)
    deployment.product_id = 'PRD-NO-MATCH'

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('pricing').batches.filter(
        id=batch_id,
    ).select(
        '+stream.context',
    ).mock(
        return_value=[batch],
    )

    with pytest.raises(ClientError):
        fetch_and_validate_batch(
            connect_client,
            batch_id,
            deployment,
        )


def test_identify_reseller_id_positive(
    connect_client,
    client_mocker_factory,
    batch,
    no_db_deployment,
    marketplace,
    hub,
):
    marketplace_id = batch['stream']['context']['marketplace']['id']

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces[marketplace_id].get(
        return_value=marketplace,
    )
    client_mocker.hubs.filter(
        R().id.in_([hub['hub']['id'] for hub in marketplace['hubs']]),
        R().instance.type.eq('OA'),
    ).mock(
        return_value=[hub],
    )

    reseller_id = identify_reseller_id(connect_client, batch, no_db_deployment)

    assert reseller_id == marketplace['hubs'][0]['external_id']


def test_identify_reseller_id_negative_deployment_hub_not_present_in_batch_marketplace(
    connect_client,
    client_mocker_factory,
    batch,
    no_db_deployment,
    marketplace,
):
    marketplace_id = batch['stream']['context']['marketplace']['id']

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces[marketplace_id].get(
        return_value=marketplace,
    )
    client_mocker.hubs.filter(
        R().id.in_([hub['hub']['id'] for hub in marketplace['hubs']]),
        R().instance.type.eq('OA'),
    ).mock(
        return_value=[],
    )

    with pytest.raises(ClientError):
        identify_reseller_id(connect_client, batch, no_db_deployment)


def test_identify_reseller_id_negative_hubs_not_configured_in_batch_marketplace(
    connect_client,
    client_mocker_factory,
    batch,
    no_db_deployment,
    marketplace,
):
    marketplace_id = batch['stream']['context']['marketplace']['id']
    modified_marketplace = deepcopy(marketplace)
    modified_marketplace.pop('hubs')

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces[marketplace_id].get(
        return_value=modified_marketplace,
    )

    with pytest.raises(ClientError):
        identify_reseller_id(connect_client, batch, no_db_deployment)


def test_get_reseller_id_negative_hubs_not_configured(
    marketplace,
):
    modified_marketplace = deepcopy(marketplace)
    modified_marketplace.pop('hubs')

    reseller_id = get_reseller_id(modified_marketplace, 'HUB-0000-0000')

    assert reseller_id is None


def test_identify_reseller_id_negative_reseller_id_not_mapped(
    connect_client,
    client_mocker_factory,
    batch,
    no_db_deployment,
    marketplace,
    hub,
):
    marketplace_id = batch['stream']['context']['marketplace']['id']
    modified_marketplace = deepcopy(marketplace)
    modified_marketplace['hubs'][0].pop('external_id')

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces[marketplace_id].get(
        return_value=modified_marketplace,
    )
    client_mocker.hubs.filter(
        R().id.in_([hub['hub']['id'] for hub in marketplace['hubs']]),
        R().instance.type.eq('OA'),
    ).mock(
        return_value=[hub],
    )

    with pytest.raises(ClientError):
        identify_reseller_id(connect_client, batch, no_db_deployment)


@patch.object(CBCService, 'parse_price_file')
@patch.object(CBCService, 'prepare_price_proposal')
@patch.object(CBCService, 'apply_prices')
@patch.object(CBCService, '__init__')
def test_process_batch_positive(
    mock___init__,
    mock_apply_prices,
    mock_prepare_price_proposal,
    mock_parse_price_file,
    parse_price_file_response,
    price_proposal_response,
    cbc_db_session,
    no_db_deployment,
    batch_dataset,
):
    reseller_id = '10000001'

    mock_parse_price_file.return_value = parse_price_file_response
    mock_prepare_price_proposal.return_value = price_proposal_response
    mock_apply_prices.return_value = 'Request Accepted.'
    mock___init__.return_value = None

    data_id = process_batch(
        cbc_db_session,
        './tests/fixtures/MFL-0000-0000-0000.xlsx',
        reseller_id,
        no_db_deployment,
        batch_dataset,
    )

    assert data_id == parse_price_file_response['dataId']


def test_process_batch_negative_hub_credential_not_found(
    cbc_db_session,
    no_db_deployment,
):
    deployment = deepcopy(no_db_deployment)
    deployment.hub_id = 'HB-0000-0001'

    with pytest.raises(ClientError):
        process_batch(
            cbc_db_session,
            None,
            None,
            deployment,
            None,
        )


def test_determine_dataset_negative_effective_date_column_not_present():
    wb = load_workbook(
        filename='./tests/fixtures/MFL-0000-0000-0001.xlsx',
    )
    ws = wb['Data']
    with pytest.raises(ClientError):
        determine_dataset(ws, 'BAT-000-000-000')


def test_determine_dataset_negative_empty_effective_date():
    wb = load_workbook(
        filename='./tests/fixtures/MFL-0000-0000-0002.xlsx',
    )
    ws = wb['Data']
    with pytest.raises(ClientError):
        determine_dataset(ws, 'BAT-000-000-000')


def test_determine_dataset_negative_effective_date_wrong_format():
    wb = load_workbook(
        filename='./tests/fixtures/MFL-0000-0000-0003.xlsx',
    )
    ws = wb['Data']
    with pytest.raises(ClientError):
        determine_dataset(ws, 'BAT-000-000-000')
