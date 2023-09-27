# Common schemas
# Categories
CATEGORIES_SCHEMA = {
    "type": "array",
    "allOf": [
        {"contains": {"const": "Name_EN"}},
        {"contains": {"const": "Description_EN"}},
    ],
    "items": {
        "anyOf": [
            {
                "pattern": "^(Description|Name)_[a-zA-Z]+$",
            },
            {
                "enum": [
                    "Name_EN",
                    "Description_EN",
                    "ExpandCategory",
                    "DisplayInCCP",
                    "ParentCategory",
                ],
            },
        ],
    },
    "uniqueItems": True,
}
# Policies
POLICIES_SCHEMA = {
    "type": "array",
    "items": {
        "type": "string",
        "enum": [
            "ServicePlan",
            "Period",
            "PeriodType",
            "Trial",
            "Action",
            "ActionPeriod",
            "ActionPeriodTimezone",
            "ApplicableTo",
        ],
    },
    "allOf": [
        {"contains": {"const": "ServicePlan"}},
        {"contains": {"const": "Period"}},
        {"contains": {"const": "PeriodType"}},
        {"contains": {"const": "Trial"}},
        {"contains": {"const": "Action"}},
        {"contains": {"const": "ActionPeriod"}},
        {"contains": {"const": "ActionPeriodTimezone"}},
        {"contains": {"const": "ApplicableTo"}},
    ],
    "additionalItems": False,
}

# Per Sheet Schema
RESOURCES_SCHEMA = {
    "Resources": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "Name_EN",
                "Description_EN",
                "ResourceCategory",
                "MPN",
                "UOM",
                "Measurable",
            ],
        },
        "allOf": [
            {"contains": {"const": "Name_EN"}},
            {"contains": {"const": "Description_EN"}},
            {"contains": {"const": "ResourceCategory"}},
            {"contains": {"const": "MPN"}},
            {"contains": {"const": "UOM"}},
            {"contains": {"const": "Measurable"}},
        ],
        "additionalItems": False,
    },
}
SERVICE_PLANS_SCHEMA = {
    "ServicePlans": {
        "type": "array",
        "allOf": [
            {"contains": {"const": "Name_EN"}},
            {"contains": {"const": "Description_EN"}},
            {"contains": {"const": "PlanCategory"}},
            {"contains": {"const": "ServiceTerms"}},
            {"contains": {"const": "BillingPeriodDuration"}},
            {"contains": {"const": "BillingPeriodType"}},
            {"contains": {"const": "PricePeriod"}},
            {"contains": {"const": "RecurringType"}},
        ],
        "items": {
            "anyOf": [
                {
                    "pattern": "^((Description|Name|OpUnit)_(?:[a-zA-Z]+(?:\\s+[a-zA-Z]+)*)"
                    "|(ResellerGroupName|UpgradePath|SalesCategory)_\\d+)$",
                },
                {
                    "enum": [
                        "OldName_1",
                        "Name_EN",
                        "Description_EN",
                        "PlanCategory",
                        "ServiceTerms",
                        "BillingPeriodDuration",
                        "BillingPeriodType",
                        "AlignBillingOrderWithStatementDay",
                        "NewDayOfStatement",
                        "AlignSalesOrderWithStatementDay",
                        "AllowScheduledChanges",
                        "BillingPeriodAlignment",
                        "CotermingPossibilities",
                        "ExpirationDateAlignedWithEndOfMonth",
                        "ExpirationDateAlignedWithSubscription",
                        "FirstBillingPeriodForFree",
                        "PricePeriod",
                        "RecurringType",
                        "AutoRenew",
                        "RenewOrderInterval",
                        "AutoRenewPlan",
                        "AutoRenewPeriod",
                        "AutoRenewPeriodType",
                        "BillingAlignmentResellerRedefineAllowed",
                        "WelcomeNotificationTemplate",
                        "ExpirationNotificationTemplate",
                        "ProcessByRatingEngine",
                        "SubscriptionStartDateAfterUpgrade",
                        "Published",
                        "VendorTimezone",
                        "MPN",
                    ],
                },
            ],
        },
        "uniqueItems": True,
    },
}
PLAN_SWITCH_PATHS_SCHEMA = {
    "PlanSwitchPaths": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "FromPlan",
                "ToPlan",
                "ImmediateSwitchAllowed",
                "SubsStartDateAfterSwitch",
                "SubsPeriodChange",
                "UpsizeAllowed",
                "DownsizeAllowed",
                "PartialSwitchAllowed",
                "RemoveSwitchPath",
            ],
        },
        "allOf": [
            {"contains": {"const": "FromPlan"}},
            {"contains": {"const": "ToPlan"}},
            {"contains": {"const": "ImmediateSwitchAllowed"}},
            {"contains": {"const": "SubsPeriodChange"}},
            {"contains": {"const": "UpsizeAllowed"}},
            {"contains": {"const": "DownsizeAllowed"}},
        ],
        "additionalItems": False,
    },
}
PLAN_PERIODS_SCHEMA = {
    "PlanPeriods": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "ServicePlan",
                "Period",
                "PeriodType",
                "Trial",
                "FullRefundPeriod",
                "AfterRefundPeriod",
                "CancellationType",
                "CancellationFeeValue",
                "MPN",
            ],
        },
        "allOf": [
            {"contains": {"const": "ServicePlan"}},
            {"contains": {"const": "Period"}},
            {"contains": {"const": "PeriodType"}},
        ],
        "additionalItems": False,
    },
}
RESOURCES_RATES_SCHEMA = {
    "ResourceRates": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "ServicePlan",
                "Resource",
                "IncUnits",
                "MinUnits",
                "MaxUnits",
                "Measurable",
                "ShowInCP",
                "ShowInStore",
                "ShowZeroRecurringFeeInOrder",
                "ShowZeroSetupFeeInOrder",
                "ShowZeroOveruseFeeInOrder",
                "SetupFeePerUnit",
                "RecurringFeePerUnit",
                "MPN",
            ],
        },
        "allOf": [
            {"contains": {"const": "ServicePlan"}},
            {"contains": {"const": "Resource"}},
            {"contains": {"const": "MinUnits"}},
            {"contains": {"const": "MaxUnits"}},
        ],
        "additionalItems": False,
    },
}
SALES_CATEGORIES_SCHEMA = {
    "SalesCategories": {**CATEGORIES_SCHEMA},
}
RESOURCE_CATEGORIES_SCHEMA = {
    "ResourceCategories": {**CATEGORIES_SCHEMA},
}
DOWNSIZE_POLICIES_SCHEMA = {
    "DownsizePolicies": {**POLICIES_SCHEMA},
}
CANCELATION_POLICIES_SCHEMA = {
    "CancelationPolicies": {**POLICIES_SCHEMA},
}
NOTIFICATION_TEMPLATES_SCHEMA = {
    "NotificationTemplates": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "TemplateName",
                "Language",
                "MessageType",
                "MessageCategory",
                "Subject",
                "ToAddr",
                "ToName",
                "BccAddr",
                "FromAddr",
                "FromName",
                "PDFFileName",
                "Active",
                "Condition",
                "VisibleToReseller",
                "Security",
                "HTML",
                "PlainText",
            ],
        },
        "allOf": [
            {"contains": {"const": "TemplateName"}},
            {"contains": {"const": "Language"}},
            {"contains": {"const": "MessageCategory"}},
            {"contains": {"const": "Subject"}},
            {"contains": {"const": "ToAddr"}},
            {"contains": {"const": "ToName"}},
            {"contains": {"const": "FromAddr"}},
            {"contains": {"const": "FromName"}},
            {"contains": {"const": "HTML"}},
            {"contains": {"const": "PlainText"}},
        ],
        "additionalItems": False,
    },
}
RESOURCE_DEPENDENCIES_SCHEMA = {
    "ResourceDependencies": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "ChildResource",
                "ParentResource",
                "DependenceKind",
                "DependenceMultiplier",
                "MPN",
            ],
        },
        "allOf": [
            {"contains": {"const": "ChildResource"}},
            {"contains": {"const": "ParentResource"}},
            {"contains": {"const": "DependenceKind"}},
        ],
        "additionalItems": False,
    },
}
UPGRADE_RESOURCE_MAPPING_SCHEMA = {
    "UpgradeResourceMapping": {
        "type": "array",
        "items": {
            "type": "string",
            "pattern": "^(FromResource|ToResource_\\d+)$",
        },
        "uniqueItems": True,
    },
}
TERMS_CONDITIONS_SCHEMA = {
    "TermsConditions": {
        "type": "array",
        "items": {
            "type": "string",
            "enum": [
                "Name",
                "Acceptance",
                "Active",
                "Content",
            ],
        },
        "allOf": [
            {"contains": {"const": "Name"}},
            {"contains": {"const": "Content"}},
        ],
        "additionalItems": False,
    },
}
OP_UNIT_SERVICE_PLANS_SHCEMA = {
    "OpUnitServicePlans": {
        "type": "array",
        "items": {
            "type": "string",
            "pattern": "^(OpUnit|ServicePlanName|TermsConditions_\\d+"
            "|Published|ResellerGroupName_\\d+|MPN)$",
        },
        "uniqueItems": True,
    },
}
REQUIRED_SHEETS = {
    "required": ["Resources", "ServicePlans", "PlanPeriods", "ResourceRates"],
}
PPR_SCHEMA = {
    "type": "object",
    "properties": {
        **RESOURCES_SCHEMA,
        **SERVICE_PLANS_SCHEMA,
        **PLAN_SWITCH_PATHS_SCHEMA,
        **PLAN_PERIODS_SCHEMA,
        **RESOURCES_RATES_SCHEMA,
        **SALES_CATEGORIES_SCHEMA,
        **RESOURCE_CATEGORIES_SCHEMA,
        **DOWNSIZE_POLICIES_SCHEMA,
        **CANCELATION_POLICIES_SCHEMA,
        **NOTIFICATION_TEMPLATES_SCHEMA,
        **RESOURCE_DEPENDENCIES_SCHEMA,
        **UPGRADE_RESOURCE_MAPPING_SCHEMA,
        **TERMS_CONDITIONS_SCHEMA,
        **OP_UNIT_SERVICE_PLANS_SHCEMA,
    },
    **REQUIRED_SHEETS,
}


BASE_SCHEMA = {
    "Resources": [
        "Name_EN",
        "Description_EN",
        "ResourceCategory",
        "MPN",
        "UOM",
        "Measurable",
    ],
    "ServicePlans": [
        "OldName_1",
        "Name_EN",
        "Description_EN",
        "PlanCategory",
        "ServiceTerms",
        "SalesCategory_1",
        "BillingPeriodDuration",
        "BillingPeriodType",
        "AlignBillingOrderWithStatementDay",
        "NewDayOfStatement",
        "AlignSalesOrderWithStatementDay",
        "AllowScheduledChanges",
        "BillingPeriodAlignment",
        "CotermingPossibilities",
        "ExpirationDateAlignedWithEndOfMonth",
        "ExpirationDateAlignedWithSubscription",
        "FirstBillingPeriodForFree",
        "PricePeriod",
        "RecurringType",
        "AutoRenew",
        "RenewOrderInterval",
        "AutoRenewPlan",
        "AutoRenewPeriod",
        "AutoRenewPeriodType",
        "BillingAlignmentResellerRedefineAllowed",
        "WelcomeNotificationTemplate",
        "ExpirationNotificationTemplate",
        "ProcessByRatingEngine",
        "UpgradePath_1",
        "SubscriptionStartDateAfterUpgrade",
        "OpUnit_DE",
        "ResellerGroupName_1",
        "Published", "VendorTimezone",
        "MPN",
    ],
    "PlanSwitchPaths": [
        "FromPlan",
        "ToPlan",
        "ImmediateSwitchAllowed",
        "SubsStartDateAfterSwitch",
        "SubsPeriodChange",
        "UpsizeAllowed",
        "DownsizeAllowed",
        "PartialSwitchAllowed",
        "RemoveSwitchPath",
    ],
    "PlanPeriods": [
        "ServicePlan",
        "Period",
        "PeriodType",
        "Trial",
        "FullRefundPeriod",
        "AfterRefundPeriod",
        "CancellationType",
        "CancellationFeeValue",
        "MPN",
    ],
    "ResourceRates": [
        "ServicePlan",
        "Resource",
        "IncUnits",
        "MinUnits",
        "MaxUnits",
        "Measurable",
        "ShowInCP",
        "ShowInStore",
        "ShowZeroRecurringFeeInOrder",
        "ShowZeroSetupFeeInOrder",
        "ShowZeroOveruseFeeInOrder",
        "SetupFeePerUnit",
        "RecurringFeePerUnit",
        "MPN",
    ],
    "SalesCategories": [
        "Name_EN",
        "Description_EN",
        "ExpandCategory",
        "DisplayInCCP",
        "ParentCategory",
        "Name_DE",
        "Description_DE",
    ],
    "ResourceCategories": [
        "Name_EN",
        "Description_EN",
        "ExpandCategory",
        "DisplayInCCP",
        "ParentCategory",
        "Name_DE",
        "Description_DE",
    ],
    "DownsizePolicies": [
        "ServicePlan",
        "Period",
        "PeriodType",
        "Trial",
        "Action",
        "ActionPeriod",
        "ActionPeriodTimezone",
        "ApplicableTo",
    ],
    "CancelationPolicies": [
        "ServicePlan",
        "Period",
        "PeriodType",
        "Trial",
        "Action",
        "ActionPeriod",
        "ActionPeriodTimezone",
        "ApplicableTo",
    ],
    "NotificationTemplates": [
        "TemplateName",
        "Language",
        "MessageType",
        "MessageCategory",
        "Subject",
        "ToAddr",
        "ToName",
        "BccAddr",
        "FromAddr",
        "FromName",
        "PDFFileName",
        "Active",
        "Condition",
        "VisibleToReseller",
        "Security",
        "HTML",
        "PlainText",
    ],
    "ResourceDependencies": [
        "ChildResource",
        "ParentResource",
        "DependenceKind",
        "DependenceMultiplier",
        "MPN",
    ],
    "UpgradeResourceMapping": [
        "FromResource",
        "ToResource_1",
    ],
    "TermsConditions": [
        "Name",
        "Acceptance",
        "Active",
        "Content",
    ],
    "OpUnitServicePlans": [
        "OpUnit",
        "ServicePlanName",
        "TermsConditions_1",
        "Published",
        "ResellerGroupName_1",
        "MPN",
    ],
}
PPR_FILE_NAME = "PPR_{product_id}_v{version}_{timestamp}.xlsx"
PPR_FILE_NAME_DELEGATION_L2 = "{dr_id}-L2Delegation-{ppr_id}-{timestamp}.xlsx"
PPR_FILE_NAME_UPDATE_MARKETPLACES = "{dr_id}-MkplUpdate-{ppr_id}-{timestamp}.xlsx"
DESCRIPTION_TEMPLATE = """
**Description**
{description}

{summary}
"""
SUMMARY_TEMPLATE = """Summary:
{summary}"""


CONFIGURATION_SCHEMA_TEMPLATE = """
{{
    "type": "object",
    "properties": {{
        "hierarchical_files_data": {{
            "type": "object",
            "properties": {{
                "{product_id}": {{
                    "type": "object",
                    "properties": {{
                        "product_level": {{
                            "type": "object",
                            "properties": {{
                                "ResourceCategories": {{
                                    "type": "object",
                                    "anyOf": [
                                        {{"required": ["Name_EN"]}},
                                        {{"required": ["Name_en"]}}
                                    ]
                                }}
                            }},
                            "required": ["ResourceCategories"]
                        }}
                    }},
                    "required": ["product_level"]
                }}
            }},
            "required": ["{product_id}"]
        }}
    }},
    "required": ["hierarchical_files_data"]
}}
"""
