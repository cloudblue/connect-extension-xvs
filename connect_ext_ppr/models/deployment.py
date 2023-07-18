from datetime import datetime

import sqlalchemy as db
from sqlalchemy.orm import relationship

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import DeploymentRequestStatusChoices, DeploymentStatusChoices
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Product


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
    product_id = db.Column(db.String, db.ForeignKey(Product.id))
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

    product = relationship('Product', backref="deployments")


class DeploymentRequest(Model):
    __tablename__ = 'requests'

    PREFIX = 'DPLR'

    id = db.Column(db.String(20), primary_key=True)
    deployment_id = db.Column(db.ForeignKey(Deployment.id))
    ppr_id = db.Column(db.String, db.ForeignKey(PPRVersion.id))
    status = db.Column(
        db.Enum(DeploymentRequestStatusChoices, validate_strings=True),
        default=DeploymentRequestStatusChoices.PENDING,
    )
    manually = db.Column(db.Boolean(), default=False)
    delegate_l2 = db.Column(db.Boolean(), default=False)

    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_by = db.Column(db.String(20))
    started_at = db.Column(db.DateTime(), nullable=True)
    finished_at = db.Column(db.DateTime(), nullable=True)
    aborted_at = db.Column(db.DateTime(), nullable=True)
    aborted_by = db.Column(db.String(20), nullable=True)

    ppr = relationship('PPRVersion', foreign_keys="DeploymentRequest.ppr_id")
    deployment = relationship('Deployment', foreign_keys="DeploymentRequest.deployment_id")


class MarketplaceConfiguration(Model):
    __tablename__ = 'marketplace_configuration'

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    marketplace = db.Column(db.String(16))
    deployment = db.Column(db.ForeignKey(Deployment.id), nullable=True)
    deployment_request = db.Column(db.ForeignKey(DeploymentRequest.id), nullable=True)
