from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from connect_ext_ppr.models.deployment import Deployment


class DeploymentFilter(Filter):
    hub_id: Optional[str]
    product_id: Optional[str]

    class Constants(Filter.Constants):
        model = Deployment
