from typing import List, Optional


from pydantic import BaseModel
from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter

from connect_ext_ppr.models.deployment import (
    Deployment, DeploymentRequest, MarketplaceConfiguration,
)
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.task import Task


class DeploymentFilter(Filter):
    hub_id: Optional[str]
    product_id: Optional[str]
    status: Optional[str]
    vendor_id: Optional[str]

    class Constants(Filter.Constants):
        model = Deployment


class PPRVersionFilter(Filter):
    id: Optional[str]
    version: Optional[int]

    order_by: Optional[List[str]]

    class Constants(Filter.Constants):
        model = PPRVersion


class DeploymentRequestFilter(Filter):
    status: Optional[str]
    delegate_l2: Optional[bool]

    ppr: Optional[PPRVersionFilter] = FilterDepends(with_prefix('ppr', PPRVersionFilter))

    order_by: Optional[List[str]]

    class Constants(Filter.Constants):
        model = DeploymentRequest


class MarketplaceConfigurationFilter(Filter):
    marketplace: Optional[str]
    ppr: Optional[PPRVersionFilter] = FilterDepends(with_prefix('ppr', PPRVersionFilter))

    order_by: Optional[List[str]]

    class Constants(Filter.Constants):
        model = MarketplaceConfiguration


class DeploymentRequestExtendedFilter(DeploymentRequestFilter):
    id: Optional[str]

    deployment: Optional[DeploymentFilter] = FilterDepends(
        with_prefix('deployment', DeploymentFilter),
    )

    class Constants(Filter.Constants):
        model = DeploymentRequest


class PricingBatchFilter(BaseModel):
    marketplace_id: Optional[str]


class TaskFilter(Filter):
    status: Optional[str]

    class Constants(Filter.Constants):
        model = Task
