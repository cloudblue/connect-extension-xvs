import pytest
from connect.client import ClientError

from connect_ext_ppr.models.deployment import Deployment
from connect_ext_ppr.service import add_deployments, validate_ppr_schema


def test_add_deployments(
    dbsession,
    listing,
    marketplace,
    installation,
    logger,
):

    hub_id = 'HB-1111-2222'
    listing['contract']['marketplace'] = marketplace
    listing['contract']['marketplace']['hubs'][0]['hub']['id'] = hub_id

    add_deployments(installation, [listing], {}, logger)
    new_dep = dbsession.query(Deployment).filter_by(hub_id=hub_id).first()

    assert new_dep is not None


def test_nothing_to_create(
    dbsession,
    listing,
    marketplace,
    installation,
    logger,
    deployment,
):
    hub = {'hub': {'id': deployment.hub_id, 'name': 'Some'}}
    listing['contract']['marketplace'] = marketplace
    listing['product']['id'] = deployment.product_id
    listing['contract']['marketplace']['hubs'] = [hub]

    count_before = dbsession.query(Deployment).count()
    add_deployments(installation, [listing], {}, logger)
    count_after = dbsession.query(Deployment).count()

    assert count_before == 1
    assert count_before == count_after


def test_valid_schema(ppr_valid_schema):
    assert validate_ppr_schema(ppr_valid_schema) is None


@pytest.mark.parametrize(
    'required_sheet',
    ('Resources', 'ServicePlans', 'PlanPeriods', 'ResourceRates'),
)
def test_required_sheet_not_present(ppr_valid_schema, required_sheet):
    ppr_valid_schema.pop(required_sheet)
    with pytest.raises(ClientError) as ex:
        validate_ppr_schema(ppr_valid_schema)
    assert ex.value.message == f"'{required_sheet}' is a required property"
    assert ex.value.errors == [f"'{required_sheet}' is a required property"]


@pytest.mark.parametrize(
    'required_column',
    ('Name_EN', 'Description_EN', 'ResourceCategory', 'MPN', 'UOM', 'Measurable'),
)
def test_required_column_not_present(ppr_valid_schema, required_column):
    ppr_valid_schema['Resources'].remove(required_column)
    with pytest.raises(ClientError) as ex:
        validate_ppr_schema(ppr_valid_schema)
    assert ex.value.message == (
        f"{ppr_valid_schema['Resources']}"
        f" does not contain items matching the given schema"
    )


def test_extra_field_not_allowed(ppr_valid_schema):
    ppr_valid_schema['Resources'].append('FooBar')
    with pytest.raises(ClientError) as ex:
        validate_ppr_schema(ppr_valid_schema)

    assert ex.value.message == (
        "'FooBar' is not one of ['Name_EN', 'Description_EN', "
        "'ResourceCategory', 'MPN', 'UOM', 'Measurable']"
    )


@pytest.mark.parametrize(
    'not_allow',
    ('OpUnit_123', 'ResellerGroupName_US'),
)
def test_extra_field_not_matching_pattern_allowed(ppr_valid_schema, not_allow):
    ppr_valid_schema['ServicePlans'].append(not_allow)
    with pytest.raises(ClientError) as ex:
        validate_ppr_schema(ppr_valid_schema)

    assert ex.value.message == f"'{not_allow}' is not valid under any of the given schemas"
    assert ex.value.errors == [
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
