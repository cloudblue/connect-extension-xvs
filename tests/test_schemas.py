from datetime import datetime
from typing import Optional

import pytest

from connect_ext_ppr.models.enums import (
    ConfigurationStateChoices,
    DeploymentStatusChoices,
    PPRStatusChoices,
)
from connect_ext_ppr.schemas import (
    ConfigurationReferenceSchema,
    ConfigurationSchema,
    DeploymentSchema,
    Events,
    FileReferenceSchema,
    FileSchema,
    HubSchema,
    NonNullSchema,
    PPRVersionSchema,
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
        events: Events

    serializer = MyOuterSchema(
        id='XXX',
        inner=MyInnerSchema(bar='Some'),
        version=10,
        events={
            'created': {
                'at': None,
                'by': 'Some User',
            },
            'updated': None,
        },
    )

    assert serializer.dict() == {
        "id": "XXX",
        "inner": {
            "bar": "Some",
        },
        "version": 10,
        "events": {
            "created": {
                "by": "Some User",
            },
        },
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
        state=state,
        events={
            'created': {'at': now, 'by': {'id': 'SU-295-689-628', 'name': 'Neri'}},
            'updated': {'at': now, 'by': {'id': 'SU-295-689-628', 'name': 'Neri'}},
        },
    )
    assert serializer.dict() == {
        "id": "CFL-000-000-000",
        "file": {
            "id": file.id,
            "name": file.name,
            "location": file.location,
            "size": file.size,
            "mime_type": file.mime_type,
        },
        "state": state,
        "events": {
            "created": {
                "at": now,
                "by": {
                    'id': 'SU-295-689-628',
                    'name': 'Neri',
                },
            },
            "updated": {
                "at": now,
                "by": {
                    'id': 'SU-295-689-628',
                    'name': 'Neri',
                },
            },
        },
    }


@pytest.mark.parametrize(
    'status',
    PPRStatusChoices,
)
def test_ppr_version_schema(status, file, configuration):
    now = datetime.utcnow()
    serializer = PPRVersionSchema(
        id='PPRFL-000-000-000',
        version=4,
        product_version=5,
        file=FileSchema(
            id=file.id,
            name=file.name,
            location=file.location,
            size=file.size,
            mime_type=file.mime_type,
        ),
        configuration=ConfigurationReferenceSchema(
            id=configuration.id,
            file=FileReferenceSchema(
                id=file.id,
                name=file.name,
            ),
            state=configuration.state,
        ),
        status=status,
        description='It was morning, and the new sun sparkled gold across the ripples of a gentle '
                    'sea',
        events={
            'created': {'at': now, 'by': 'SU-295-689-628'},
            'updated': {'at': now, 'by': 'SU-295-689-628'},
        },
    )
    assert serializer.dict() == {
        "id": "PPRFL-000-000-000",
        "version": 4,
        "product_version": 5,
        "file": {
            "id": file.id,
            "name": file.name,
            "location": file.location,
            "size": file.size,
            "mime_type": file.mime_type,
        },
        "configuration": {
            "id": configuration.id,
            "state": configuration.state,
        },
        "description": 'It was morning, and the new sun sparkled gold across the ripples of a '
                       'gentle sea',
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
        "status": status,
    }


def test_ppr_version_schema_wo_optional_fields(file, configuration):
    now = datetime.utcnow()
    serializer = PPRVersionSchema(
        id='PPRFL-000-000-000',
        version=4,
        file=FileSchema(
            id=file.id,
            name=file.name,
            location=file.location,
            size=file.size,
            mime_type=file.mime_type,
        ),
        status=PPRStatusChoices.pending,
        events={
            'created': {'at': now, 'by': 'SU-295-689-628'},
            'updated': {'at': now, 'by': 'SU-295-689-628'},
        },
    )
    assert serializer.dict() == {
        "id": "PPRFL-000-000-000",
        "version": 4,
        "file": {
            "id": file.id,
            "name": file.name,
            "location": file.location,
            "size": file.size,
            "mime_type": file.mime_type,
        },
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
        "status": PPRStatusChoices.pending,
    }
