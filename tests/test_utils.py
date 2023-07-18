import copy

from jsonschema import ValidationError
import pandas as pd
import pytest
from connect.client import ClientError
from connect.client.rql import R

from connect_ext_ppr.utils import (
    _parse_json_schema_error,
    clean_empties_from_dict,
    filter_object_list_by_id,
    get_all_info,
    get_marketplaces,
    workbook_to_dict,
)


def test_fail_get_all_info_exc(mocker, connect_client):
    mocker.patch(
        'connect_ext_ppr.utils.get_marketplaces',
        side_effect=ClientError(),
    )
    with pytest.raises(ClientError) as ex:
        get_all_info(connect_client)
    assert '400 Bad Request: EXT_000 - Unexpected error.' in str(ex.value)


def test_get_all_info_success(
    connect_client,
    client_mocker_factory,
    marketplace,
    listing,
    product,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.listings.filter(R().status.eq("listed")).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(R().id.in_([marketplace['id']])).mock(
        return_value=[marketplace],
    )
    rql = R().visibility.listing.eq(True)
    rql |= R().visibility.syndication.eq(True)
    rql & R().id.in_([product['id']])
    client_mocker.products.filter(rql).mock(
        return_value=[product],
    )
    all_info = get_all_info(connect_client)
    listing['contract']['marketplace'] = marketplace
    listing['product'] = product
    assert all_info[0] == listing


def test_get_marketplaces(
        connect_client,
        marketplace,
        client_mocker_factory,
):

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces.filter(R().id.in_([marketplace['id']])).mock(
        return_value=[marketplace],
    )
    mkps = get_marketplaces(connect_client, [marketplace['id']])

    assert list(mkps) == [marketplace]


def test_filter_objects(marketplace):
    mkp_2 = copy.copy(marketplace)
    mkp_2['id'] = 'MP-XXXX'
    mkp_list = [marketplace, mkp_2]

    assert filter_object_list_by_id(mkp_list, mkp_2['id']) == mkp_2


def test_filter_key_error(marketplace):
    mkp_list = [marketplace]

    with pytest.raises(KeyError) as ex:
        filter_object_list_by_id(mkp_list, 'MP-XXXX')
    assert str(ex.value).startswith("'MP-XXXX'")


def test_workbook_to_dict_only_column_names(ppr_workbook):
    dict_wb = workbook_to_dict(ppr_workbook)

    assert isinstance(dict_wb, dict)

    for key in dict_wb:
        assert isinstance(dict_wb[key], list)


def test_workbook_to_dict_full_data(ppr_workbook, mocker):
    data = [
        'Dynamo XXX Customer Voice XXX',
        'User license for Dynamo XXX',
        'Capsule corp Commercial',
        'XXXXXXXXXX:0000',
        'Licenses',
        False,
    ]
    resources = ppr_workbook.parse('Resources')
    for col_name, value in zip(resources.columns, data):
        setattr(resources, col_name, pd.Series(value))

    mocker.patch(
        'connect_ext_ppr.utils.process_worksheet',
        return_value=resources.to_dict(orient='list'),
    )

    dict_wb = workbook_to_dict(ppr_workbook, row_data=True)

    for key in dict_wb:
        assert isinstance(dict_wb[key], dict)
        for col in dict_wb[key]:
            assert isinstance(dict_wb[key][col], list)

    assert dict_wb['Resources'] == {
        'Name_EN': ['Dynamo XXX Customer Voice XXX'],
        'Description_EN': ['User license for Dynamo XXX'],
        'ResourceCategory': ['Capsule corp Commercial'],
        'MPN': ['XXXXXXXXXX:0000'],
        'UOM': ['Licenses'],
        'Measurable': [False],
    }


def test_parse_validation_error():
    error = ValidationError(
        message='some',
        context=[
            ValidationError(message='really'),
            ValidationError(message='nested', context=[
                ValidationError(message='error', context=[
                    ValidationError(message='to'),
                    ValidationError(message='parse'),
                ]),
            ]),
        ])
    assert _parse_json_schema_error(error) == [
        'some', 'really', 'nested', 'error', 'to', 'parse',
    ]


@pytest.mark.parametrize(
    ('data', 'result'),
    (
        (
            {'a': None, 'b': {}, 'c': {'c1': {'c1.1': None, 'c1.2': 'a value'}}},
            {'c': {'c1': {'c1.2': 'a value'}}},
        ),
        (
            [{'a': None, 'b': {}, 'c': {'c1': {'c1.1': None, 'c1.2': 'a value'}}}],
            [{'a': None, 'b': {}, 'c': {'c1': {'c1.1': None, 'c1.2': 'a value'}}}],
        ),
        (
            {'a': {'by': None}},
            {},
        ),
    ),
)
def test_clean_empties_from_dict(data, result):
    assert clean_empties_from_dict(data) == result
