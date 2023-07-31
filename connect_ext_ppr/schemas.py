# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro
# All rights reserved.
#
from datetime import datetime
from typing import Dict, Optional, Union

from pydantic import BaseModel, Field, root_validator

from connect_ext_ppr.models.enums import (
    ConfigurationStateChoices,
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    MimeTypeChoices,
    PPRStatusChoices,
    TasksStatusChoices,
)


_By = Optional[Union[str, Dict[str, str]]]
Events = Dict[str, Dict[str, Union[datetime, _By]]]


def clean_empties_from_dict(data):
    """
    Removes inplace all the fields that are None or empty dicts in data.
    Returns param data, that was modified inplace.
    If the param is not a dict, will return the param unmodified.
    :param data: dict
    :rtype: dict
    """
    if not isinstance(data, dict):
        return data

    for key in list(data.keys()):
        value = data[key]
        if isinstance(value, dict):
            clean_empties_from_dict(value)
            value = data[key]
        if not value:
            del data[key]
    return data


class NonNullSchema(BaseModel):
    def dict(self, *args, **kwargs):
        kwargs['exclude_none'] = True
        return super().dict(*args, **kwargs)

    @root_validator(pre=True)
    def validate_events(cls, values):
        events = values.get('events')
        if events:
            values['events'] = clean_empties_from_dict(events)
        return values


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
    events: Events


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
    events: Events


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
    description: Optional[str]
    events: Events
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
    events: Events

    class Config:
        orm_mode = True


class StreamSchema(NonNullSchema):
    id: str
    name: str
    status: str


class BatchSchema(NonNullSchema):
    id: str
    name: str
    status: str
    stream: StreamSchema
    test: Optional[bool]
    stream_updated: Optional[bool]


class BatchProcessResponseSchema(NonNullSchema):
    task_info: str


class MarketplaceSchema(NonNullSchema):
    id: str
    name: str
    icon: str
    external_id: Optional[str]

    ppr: Optional[PPRVersionReferenceSchema]


class TaskSchema(NonNullSchema):
    id: str
    title: str
    events: Events
    status: TasksStatusChoices
    error_message: Optional[str]
