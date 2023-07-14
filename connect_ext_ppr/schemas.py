# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from datetime import datetime
from typing import Dict, Optional, Union

from pydantic import BaseModel

from connect_ext_ppr.models.enums import (
    ConfigurationStateChoices,
    DeploymentStatusChoices,
    MimeTypeChoices,
)


class VendorSchema(BaseModel):
    id: str
    name: str
    icon: Optional[str]


class ProductSchema(BaseModel):
    id: str
    name: str
    icon: Optional[str]


class HubSchema(BaseModel):
    id: str
    name: str


class DeploymentSchema(BaseModel):
    id: str
    product: ProductSchema
    hub: HubSchema
    account_id: str
    owner: VendorSchema
    last_sync_at: datetime
    status: DeploymentStatusChoices
    events: Dict[str, Dict[str, Union[datetime, str]]]


class DeploymentRequestSchema(BaseModel):
    id: str
    deployment: str

    class Config:
        orm_mode = True


class FileSchema(BaseModel):
    id: str
    name: str
    location: str
    size: int
    mime_type: MimeTypeChoices


class ConfigurationCreateSchema(BaseModel):
    file: FileSchema


class ConfigurationSchema(ConfigurationCreateSchema):
    id: str
    deployment: Dict[str, str]
    state: ConfigurationStateChoices
    events: Dict[str, Dict[str, Union[datetime, str]]]
