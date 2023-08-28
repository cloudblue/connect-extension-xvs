from typing import List, Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.deployment import Deployment


class DeploymentFilter(Filter):
    hub_id: Optional[str]
    product_id: Optional[str]

    class Constants(Filter.Constants):
        model = Deployment


class ConfigurationFilter(Filter):

    id: Optional[str]

    order_by: Optional[List[str]]

    class Constants(Filter.Constants):
        model = Configuration
