# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel


class Vendor(BaseModel):
    id: str
    name: str
    icon: Optional[str]


class Product(BaseModel):
    id: str
    name: str
    version: int
    icon: Optional[str]


class DeploymentSchema(BaseModel):
    id: str
    product: Product
    account_id: str
    owner: Vendor
    events: dict[str, dict[str, Union[datetime, str]]]


class DeploymentRequestSchema(BaseModel):
    id: str
    deployment: str

    class Config:
        orm_mode = True
