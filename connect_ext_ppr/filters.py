from typing import List, Optional

from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter

from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.ppr import PPRVersion


class DeploymentFilter(Filter):
    hub_id: Optional[str]
    product_id: Optional[str]

    class Constants(Filter.Constants):
        model = Deployment


class PPRVersionFilter(Filter):
    version: Optional[int]

    class Constants(Filter.Constants):
        model = PPRVersion


class DeploymentRequestFilter(Filter):
    id: Optional[str]
    deployment: Optional[DeploymentFilter] = FilterDepends(
        with_prefix('deployment', DeploymentFilter),
    )
    status: Optional[str]
    delegate_l2: Optional[bool]

    ppr: Optional[PPRVersionFilter] = FilterDepends(with_prefix('ppr', PPRVersionFilter))

    order_by: Optional[List[str]]

    class Constants(Filter.Constants):
        model = DeploymentRequest
