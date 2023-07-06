from datetime import datetime
import json as j

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
    ProductSchema,
    VendorSchema,
)


@pytest.mark.parametrize(
    'status',
    DeploymentStatusChoices,
)
def test_deployment_schema(status):
    now = datetime.utcnow()
    iso = now.isoformat()
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
    json = serializer.json()
    assert json == j.dumps({
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
        "last_sync_at": iso,
        "status": status,
        "events": {
            "created": {
                "at": iso,
            },
        },
    })


@pytest.mark.parametrize(
    'state',
    ConfigurationStateChoices,
)
def test_configuration_schema(state, file):
    now = datetime.utcnow()
    iso = now.isoformat()
    serializer = ConfigurationSchema(
        id='CFL-000-000-000',
        file=FileSchema(
            id=file.id,
            name=file.name,
            location=file.location,
            size=file.size,
        ),
        deployment={'id': 'DPL-000-000-000'},
        state=state,
        events={
            'created': {'at': now, 'by': 'SU-295-689-628'},
            'updated': {'at': now, 'by': 'SU-295-689-628'},
        },
    )
    json = serializer.json()
    assert json == j.dumps({
        "id": "CFL-000-000-000",
        "file": {
            "id": file.id,
            "name": file.name,
            "location": file.location,
            "size": file.size,
        },
        "deployment": {"id": "DPL-000-000-000"},
        "state": state,
        "events": {
            "created": {
                "at": iso,
                "by": "SU-295-689-628",
            },
            "updated": {
                "at": iso,
                "by": "SU-295-689-628",
            },
        },
    })
