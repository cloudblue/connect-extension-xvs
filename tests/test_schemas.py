from datetime import datetime
from typing import Optional

import pytest

from connect_ext_ppr.models.enums import (
    ConfigurationStateChoices,
    DeploymentStatusChoices,
)
from connect_ext_ppr.schemas import (
    ConfigurationSchema,
    DeploymentSchema,
    FileSchema,
    HubSchema,
    NonNullSchema,
    ProductSchema,
    VendorSchema,
)


def test_remove_null_values_from_representation():
    class MyInnerSchema(NonNullSchema):
        foo: Optional[str]
        bar: str

    class MyOuterSchema(NonNullSchema):
        id: str
        inner: MyInnerSchema
        name: Optional[str]
        version: int

    serializer = MyOuterSchema(
        id='XXX',
        inner=MyInnerSchema(bar='Some'),
        version=10,
    )

    assert serializer.dict() == {
        "id": "XXX",
        "inner": {
            "bar": "Some",
        },
        "version": 10,
    }


@pytest.mark.parametrize(
    'status',
    DeploymentStatusChoices,
)
def test_deployment_schema(status):
    now = datetime.utcnow()
    serializer = DeploymentSchema(
        id='DPL-000-000-000',
        product=ProductSchema(
            id='PRD-000-000-000',
            name='Some',
            icon='/media/VA-000-000/PRD-000-000-000/media/PRD-000-000-000-logo_cLqk6Vm.png',
        ),
        hub=HubSchema(
            id='HB-1111-2222',
            name='Hub Hub',
        ),
        account_id='PA-000-000',
        owner=VendorSchema(
            id='VA-000-000',
            name='Vendor',
            icon='/media/VA-000-000/media/icon.png',
        ),
        last_sync_at=now,
        status=status,
        events={'created': {'at': now}},
    )

    assert serializer.dict() == {
        "id": "DPL-000-000-000",
        "product": {
            "id": "PRD-000-000-000",
            "name": "Some",
            "icon": "/media/VA-000-000/PRD-000-000-000/media/PRD-000-000-000-logo_cLqk6Vm.png",
        },
        "hub": {
            "id": "HB-1111-2222",
            "name": "Hub Hub",
        },
        "account_id": "PA-000-000",
        "owner": {
            "id": "VA-000-000",
            "name": "Vendor",
            "icon": "/media/VA-000-000/media/icon.png",
        },
        "last_sync_at": now,
        "status": status,
        "events": {
            "created": {
                "at": now,
            },
        },
    }


@pytest.mark.parametrize(
    'state',
    ConfigurationStateChoices,
)
def test_configuration_schema(state, file):
    now = datetime.utcnow()
    serializer = ConfigurationSchema(
        id='CFL-000-000-000',
        file=FileSchema(
            id=file.id,
            name=file.name,
            location=file.location,
            size=file.size,
            mime_type=file.mime_type,
        ),
        deployment={'id': 'DPL-000-000-000'},
        state=state,
        events={
            'created': {'at': now, 'by': 'SU-295-689-628'},
            'updated': {'at': now, 'by': 'SU-295-689-628'},
        },
    )
    assert serializer.dict() == {
        "file": {
            "id": file.id,
            "name": file.name,
            "location": file.location,
            "size": file.size,
            "mime_type": file.mime_type,
        },
        "id": "CFL-000-000-000",
        "deployment": {"id": "DPL-000-000-000"},
        "state": state,
        "events": {
            "created": {
                "at": now,
                "by": "SU-295-689-628",
            },
            "updated": {
                "at": now,
                "by": "SU-295-689-628",
            },
        },
    }
