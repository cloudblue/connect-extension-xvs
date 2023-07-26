# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from datetime import datetime
from typing import Dict, Optional, Union

from pydantic import BaseModel, Field

from connect_ext_ppr.models.enums import (
    ConfigurationStateChoices,
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    MimeTypeChoices,
    PPRStatusChoices,
)


class NonNullSchema(BaseModel):
    def dict(self, *args, **kwargs):
        kwargs['exclude_none'] = True
        return super().dict(*args, **kwargs)


class VendorSchema(NonNullSchema):
    id: str
    name: str
    icon: Optional[str]


class ProductSchema(NonNullSchema):
    id: str
    name: str
    icon: Optional[str]


class HubSchema(NonNullSchema):
    id: str
    name: str


class DeploymentSchema(NonNullSchema):
    id: str
    product: ProductSchema
    hub: HubSchema
    account_id: str
    owner: VendorSchema
    last_sync_at: datetime
    status: DeploymentStatusChoices
    events: Dict[str, Dict[str, Union[datetime, str]]]


class FileSchema(NonNullSchema):
    id: str
    name: str
    location: str
    size: int
    mime_type: MimeTypeChoices


class FileReferenceSchema(NonNullSchema):
    id: str
    name: str


class ConfigurationSchema(NonNullSchema):
    id: str
    file: FileSchema
    state: ConfigurationStateChoices
    events: Dict[str, Dict[str, Union[datetime, Dict[str, str]]]]


class ConfigurationCreateSchema(NonNullSchema):
    file: FileSchema


class ConfigurationReferenceSchema(NonNullSchema):
    id: str
    state: ConfigurationStateChoices


class PPRVersionSchema(NonNullSchema):
    id: str
    version: int
    product_version: Optional[int]
    file: FileSchema
    configuration: Optional[ConfigurationReferenceSchema]
    description: Optional[str] = Field(None, max_length=512)
    events: Dict[str, Dict[str, Union[datetime, str]]]
    status: PPRStatusChoices


class PPRVersionCreateSchema(NonNullSchema):
    file: Optional[FileSchema]
    description: Optional[str] = Field(None, max_length=512)


class PPRVersionReferenceSchema(NonNullSchema):
    id: str
    version: int


class DeploymentReferenceSchema(NonNullSchema):
    id: str
    product: ProductSchema
    hub: HubSchema


class DeploymentRequestSchema(NonNullSchema):
    id: str
    deployment: DeploymentReferenceSchema
    ppr: PPRVersionReferenceSchema
    status: DeploymentRequestStatusChoices
    manually: bool
    delegate_l2: bool
    events: Dict[str, Dict[str, Union[datetime, str]]]

    class Config:
        orm_mode = True


class MarketplaceSchema(NonNullSchema):
    id: str
    name: str
    icon: str
    external_id: Optional[str]

    ppr: Optional[PPRVersionReferenceSchema]
