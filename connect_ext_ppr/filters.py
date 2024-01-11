from typing import List, Optional


from pydantic import BaseModel, validator
from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter

from connect_ext_ppr.models.deployment import (
    Deployment, DeploymentRequest, MarketplaceConfiguration,
)
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Product, Account
from connect_ext_ppr.models.task import Task


# TODO: Make mixin
def restrict_sortable_fields_base(value, allowed_field_names):
    if value is None:
        return None

    for field_name in value:
        field_name = field_name.replace("+", "").replace("-", "")  #

        if field_name not in allowed_field_names:
            raise ValueError(f"You may only sort by: {', '.join(allowed_field_names)}")

    return value


class ProductFilter(Filter):
    name: Optional[str]
    name__ilike: Optional[str]

    class Constants(Filter.Constants):
        model = Product


class VendorFilter(Filter):
    name: Optional[str]
    name__ilike: Optional[str]

    class Constants(Filter.Constants):
        model = Account


class DeploymentFilter(Filter):
    id: Optional[str]
    hub_id: Optional[str]
    hub__name: Optional[str]  # custom filter
    hub__name__like: Optional[str]  # custom filter
    product_id: Optional[str]
    product: Optional[ProductFilter] = FilterDepends(with_prefix('product', ProductFilter))
    status: Optional[str]
    vendor_id: Optional[str]
    vendor: Optional[VendorFilter] = FilterDepends(with_prefix('vendor', VendorFilter))

    order_by: Optional[list[str]]
    custom_order_by: Optional[str]

    @validator("order_by")
    @classmethod
    def restrict_sortable_fields(cls, value):
        return restrict_sortable_fields_base(value, ['id', 'product_id'])

    @validator("hub__name", "hub__name__like", "custom_order_by")
    @classmethod
    def validate_hub_name(cls, value):
        pass

    class Constants(Filter.Constants):
        model = Deployment


class PPRVersionFilter(Filter):
    version: Optional[int]
    status: Optional[str]
    description: Optional[str]
    description__ilike: Optional[str]

    order_by: Optional[List[str]]

    @validator("order_by")
    @classmethod
    def restrict_sortable_fields(cls, value):
        return restrict_sortable_fields_base(value, ['version'])

    class Constants(Filter.Constants):
        model = PPRVersion


class DeploymentRequestFilter(Filter):
    """For specific deployment"""
    id: Optional[str]
    manually: Optional[bool]
    ppr: Optional[PPRVersionFilter] = FilterDepends(with_prefix('ppr', PPRVersionFilter))
    status: Optional[str]

    order_by: Optional[List[str]]

    @validator("order_by")
    @classmethod
    def restrict_sortable_fields(cls, value):
        return restrict_sortable_fields_base(value, ['id'])

    class Constants(Filter.Constants):
        model = DeploymentRequest


class DeploymentRequestExtendedFilter(DeploymentRequestFilter):
    """For all deployments"""
    delegate_l2: Optional[bool]

    deployment_id: Optional[str]
    deployment: Optional[DeploymentFilter] = FilterDepends(
        with_prefix('deployment', DeploymentFilter),
    )

    @validator("order_by")
    @classmethod
    def restrict_sortable_fields(cls, value):
        return restrict_sortable_fields_base(value, ['id', 'deployment_id'])


class MarketplaceConfigurationFilter(Filter):
    """For specific DeploymentRequest"""
    marketplace: Optional[str]

    order_by: Optional[List[str]]

    class Constants(Filter.Constants):
        model = MarketplaceConfiguration


class MarketplaceConfigurationExtendedFilter(MarketplaceConfigurationFilter):
    """For Deployment"""
    ppr: Optional[PPRVersionFilter] = FilterDepends(with_prefix('ppr', PPRVersionFilter))


class PricingBatchFilter(BaseModel):
    marketplace_id: Optional[str]


class TaskFilter(Filter):
    id: Optional[str]
    status: Optional[str]

    order_by: Optional[List[str]]

    @validator("order_by")
    @classmethod
    def restrict_sortable_fields(cls, value):
        return restrict_sortable_fields_base(value, ['id'])

    class Constants(Filter.Constants):
        model = Task
