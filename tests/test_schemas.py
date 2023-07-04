from datetime import datetime
import json as j

import pytest

from connect_ext_ppr.models.deployment import DeploymentStatusChoices
from connect_ext_ppr.schemas import DeploymentSchema, Hub, Product, Vendor


@pytest.mark.parametrize(
    'status',
    DeploymentStatusChoices,
)
def test_deployment_schema(status):
    now = datetime.utcnow()
    iso = now.isoformat()
    serializer = DeploymentSchema(
        id='DPL-000-000-000',
        product=Product(
            id='PRD-000-000-000',
            name='Some',
            icon='/media/VA-000-000/PRD-000-000-000/media/PRD-000-000-000-logo_cLqk6Vm.png',
        ),
        hub=Hub(
            id='HB-1111-2222',
            name='Hub Hub',
        ),
        account_id='PA-000-000',
        owner=Vendor(
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
