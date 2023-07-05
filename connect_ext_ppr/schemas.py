# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from datetime import datetime
from typing import Dict, Optional, Union

from pydantic import BaseModel

from connect_ext_ppr.models.enums import DeploymentStatusChoices


class Vendor(BaseModel):
    id: str
    name: str
    icon: Optional[str]


class Product(BaseModel):
    id: str
    name: str
    icon: Optional[str]


class Hub(BaseModel):
    id: str
    name: str


class DeploymentSchema(BaseModel):
    id: str
    product: Product
    hub: Hub
    account_id: str
    owner: Vendor
    last_sync_at: datetime
    status: DeploymentStatusChoices
    events: Dict[str, Dict[str, Union[datetime, str]]]


class DeploymentRequestSchema(BaseModel):
    id: str
    deployment: str

    class Config:
        orm_mode = True
