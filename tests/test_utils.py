import copy

from jsonschema import ValidationError
import numpy as np
import pandas as pd
import pytest
from connect.client import ClientError
from connect.client.rql import R

from connect_ext_ppr.utils import (
    _parse_json_schema_error,
    filter_object_list_by_id,
    get_all_info,
    get_hubs,
    get_marketplaces,
    process_ppr,
    process_resource_categories,
    process_resources,
    validate_ppr_schema,
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
    rql &= R().id.in_([product['id']])
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


def test_get_hubs(connect_client, client_mocker_factory):
    hub = {'id': 'HB-0000-0000', 'name': 'An awesome hub'}
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.hubs.filter(R().id.in_([hub['id']])).mock(return_value=[hub])
    assert list(get_hubs(connect_client, [hub['id']])) == [hub]


def test_valid_schema(ppr_valid_schema):
    assert validate_ppr_schema(ppr_valid_schema) is None


@pytest.mark.parametrize(
    'required_sheet',
    ('Resources', 'ServicePlans', 'PlanPeriods', 'ResourceRates'),
)
def test_required_sheet_not_present(ppr_valid_schema, required_sheet):
    ppr_valid_schema.pop(required_sheet)
    result = validate_ppr_schema(ppr_valid_schema)
    assert result == [f"'{required_sheet}' is a required property"]


@pytest.mark.parametrize(
    'required_column',
    ('Name_EN', 'Description_EN', 'ResourceCategory', 'MPN', 'UOM', 'Measurable'),
)
def test_required_column_not_present(ppr_valid_schema, required_column):
    ppr_valid_schema['Resources'].remove(required_column)
    result = validate_ppr_schema(ppr_valid_schema)
    assert result == [(
        f"{ppr_valid_schema['Resources']}"
        f" does not contain items matching the given schema"
    )]


def test_extra_field_not_allowed(ppr_valid_schema):
    ppr_valid_schema['Resources'].append('FooBar')
    result = validate_ppr_schema(ppr_valid_schema)
    assert result == [(
        "'FooBar' is not one of ['Name_EN', 'Description_EN', "
        "'ResourceCategory', 'MPN', 'UOM', 'Measurable']"
    )]


@pytest.mark.parametrize(
    'not_allow',
    ('OpUnit_123', 'ResellerGroupName_US'),
)
def test_extra_field_not_matching_pattern_allowed(ppr_valid_schema, not_allow):
    ppr_valid_schema['ServicePlans'].append(not_allow)
    result = validate_ppr_schema(ppr_valid_schema)

    assert result == [
        f"'{not_allow}' is not valid under any of the given schemas",
        (
            f"'{not_allow}' does not match '^((Description|Name|OpUnit)_(?:[a-zA-Z]+"
            f"(?:\\\\s+[a-zA-Z]+)*)|(ResellerGroupName|UpgradePath|SalesCategory)_\\\\d+)$'"
        ),
        (
            f"'{not_allow}' is not one of ['OldName_1', 'Name_EN', 'Description_EN', "
            f"'PlanCategory', 'ServiceTerms', 'BillingPeriodDuration', 'BillingPeriodType', "
            f"'AlignBillingOrderWithStatementDay', 'NewDayOfStatement', "
            f"'AlignSalesOrderWithStatementDay', 'AllowScheduledChanges', 'BillingPeriodAlignment',"
            f" 'CotermingPossibilities', 'ExpirationDateAlignedWithEndOfMonth', "
            f"'ExpirationDateAlignedWithSubscription', 'FirstBillingPeriodForFree', 'PricePeriod', "
            f"'RecurringType', 'AutoRenew', 'RenewOrderInterval', 'AutoRenewPlan', 'AutoRenewPeriod"
            f"', 'AutoRenewPeriodType', 'BillingAlignmentResellerRedefineAllowed', "
            f"'WelcomeNotificationTemplate', 'ExpirationNotificationTemplate', "
            f"'ProcessByRatingEngine', 'SubscriptionStartDateAfterUpgrade', "
            f"'Published', 'VendorTimezone', 'MPN']"
        ),
    ]


def test_process_ppr(ppr_workbook, configuration_json, product_factory, item_response):
    product = product_factory()
    ws_list, summary = process_ppr(
        ppr_workbook, product, configuration_json, [item_response],
    )
    assert len(ws_list) == len(ppr_workbook.sheet_names)
    assert isinstance(summary, dict)
    assert summary == {
        'ResourceCategories': {},
        'Resources': {
            'created': ['PRD-000-000-000-00001'],
        },
    }


def test_process_resources(ppr_workbook, configuration_json, product_factory, item_response):
    product = product_factory()
    ws = ppr_workbook.parse('Resources')
    scoped_product_info = (
        configuration_json
        .get('hierarchical_files_data', {})
        .get(product.id, {})
    )
    ws, summary = process_resources(ws, [item_response], scoped_product_info, product)

    assert ws.values.tolist() == [['New name', 'Some', 'Chat GPT', 'MPN-B', 'Licenses', False]]
    assert summary == {'created': ['PRD-000-000-000-00001']}

    ws, summary = process_resources(ws, [item_response], scoped_product_info, product)
    assert summary == {'updated': ['PRD-000-000-000-00001']}

    ws, summary = process_resources(ws, [], scoped_product_info, product)
    assert summary == {'removed': ['New name']}


def test_process_resource_categories(ppr_workbook, configuration_json, product_factory):
    product = product_factory(id='PRD-XXX-XXX-XXX')
    ws = ppr_workbook.parse('ResourceCategories')
    scoped_product_info = (
        configuration_json
        .get('hierarchical_files_data', {})
        .get(product.id, {})
    )
    scoped_product_info['product_level']['ResourceCategories'].update(
        {"Description_xx": "Cool, it works!"},
    )
    ws, summary = process_resource_categories(ws, scoped_product_info)
    assert "Description_XX" in ws.columns
    assert ws.values.tolist() == [
        [
            'Chat bot', 'A Chat bot', np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan,
            'A Chat bot', 'A Chat bot', 'A Chat bot', 'A Chat bot', 'A Chat bot',
            'A Chat bot', 'A Chat bot', 'Cool, it works!',
        ],
    ]
    assert summary == {}
