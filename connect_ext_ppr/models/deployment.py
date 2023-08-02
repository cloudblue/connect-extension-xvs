from datetime import datetime

import sqlalchemy as db
from sqlalchemy.orm import relationship

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import DeploymentRequestStatusChoices, DeploymentStatusChoices
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.models.models_utils import transition


class Deployment(Model):
    __tablename__ = "deployments"
    __table_args__ = (
        db.UniqueConstraint(
            "product_id", "account_id", "hub_id",
            name="prd_account_hub_key",
        ),
    )

    PREFIX = 'DPL'

    STATUSES = DeploymentStatusChoices

    id = db.Column(db.String(20), primary_key=True)
    product_id = db.Column(db.String, db.ForeignKey(Product.id))
    hub_id = db.Column(db.String(20))
    account_id = db.Column(db.String(20))
    vendor_id = db.Column(db.String(20))
    status = db.Column(
        db.Enum(DeploymentStatusChoices, validate_strings=True),
        default=STATUSES.pending,
    )
    last_sync_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=datetime.utcnow, default=datetime.utcnow)

    product = relationship("Product", back_populates="deployment")
    marketplaces = relationship('MarketplaceConfiguration', backref='deployment', lazy=True)


class DeploymentRequest(Model):
    __tablename__ = 'requests'

    PREFIX = 'DPLR'

    STATUSES = DeploymentRequestStatusChoices

    id = db.Column(db.String(20), primary_key=True)
    deployment_id = db.Column(db.ForeignKey(Deployment.id))
    ppr_id = db.Column(db.String, db.ForeignKey(PPRVersion.id))
    status = db.Column(
        db.Enum(DeploymentRequestStatusChoices, validate_strings=True),
        default=STATUSES.pending,
    )
    manually = db.Column(db.Boolean(), default=False)
    delegate_l2 = db.Column(db.Boolean(), default=False)

    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_by = db.Column(db.String(20))
    started_at = db.Column(db.DateTime(), nullable=True)
    finished_at = db.Column(db.DateTime(), nullable=True)
    aborted_at = db.Column(db.DateTime(), nullable=True)
    aborted_by = db.Column(db.String(20), nullable=True)
    aborting_at = db.Column(db.DateTime(), nullable=True)
    aborting_by = db.Column(db.String(20), nullable=True)

    ppr = relationship('PPRVersion', foreign_keys="DeploymentRequest.ppr_id")
    deployment = relationship(
        'Deployment',
        foreign_keys="DeploymentRequest.deployment_id",
        innerjoin=True,
    )

    @transition('status', target=STATUSES.aborting, sources=[STATUSES.pending, STATUSES.processing])
    def aborting(self, by):
        self.aborting_at = datetime.utcnow()
        self.aborting_by = by

    @transition('status', target=STATUSES.aborted, sources=[STATUSES.aborting])
    def abort(self):
        self.aborted_at = datetime.utcnow()
        self.aborted_by = self.aborting_by

    @transition('status', target=STATUSES.aborted, sources=[STATUSES.aborting])
    def abort_by_api(self, by):
        self.aborted_at = datetime.utcnow()
        self.aborted_by = by


class MarketplaceConfiguration(Model):
    __tablename__ = 'marketplace_configuration'

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    marketplace = db.Column(db.String(16))
    deployment_id = db.Column(db.ForeignKey(Deployment.id), nullable=True)
    deployment_request = db.Column(db.ForeignKey(DeploymentRequest.id), nullable=True)
    ppr_id = db.Column(db.String, db.ForeignKey(PPRVersion.id))
    active = db.Column(db.Boolean(), default=True)

    ppr = relationship('PPRVersion', foreign_keys='MarketplaceConfiguration.ppr_id')
