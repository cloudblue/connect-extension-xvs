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
    account_id: str
    owner: Vendor
    version: int
    events: dict[str, dict[str, Union[datetime, str]]]
    icon: Optional[str]
