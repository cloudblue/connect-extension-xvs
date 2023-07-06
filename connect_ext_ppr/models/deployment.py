from datetime import datetime

import sqlalchemy as db

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import DeploymentStatusChoices


class Deployment(Model):
    __tablename__ = "deployments"
    __table_args__ = (
        db.UniqueConstraint(
            "product_id", "account_id", "hub_id",
            name="prd_account_hub_key",
        ),
    )

    PREFIX = 'DPL'

    id = db.Column(db.String(20), primary_key=True)
    product_id = db.Column(db.String(20))
    hub_id = db.Column(db.String(20))
    account_id = db.Column(db.String(20))
    vendor_id = db.Column(db.String(20))
    status = db.Column(
        db.Enum(DeploymentStatusChoices, validate_strings=True),
        default=DeploymentStatusChoices.PENDING,
    )
    last_sync_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=datetime.utcnow, default=datetime.utcnow)


class DeploymentRequest(Model):
    __tablename__ = "requests"

    PREFIX = 'DPLR'

    id = db.Column(db.String(20), primary_key=True)
    deployment = db.Column(db.ForeignKey(Deployment.id))
