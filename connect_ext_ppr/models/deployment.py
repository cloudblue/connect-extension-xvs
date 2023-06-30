from datetime import datetime

import sqlalchemy as db

from connect_ext_ppr.db import Model


class Deployment(Model):
    __tablename__ = "deployments"

    PREFIX = 'DPL'

    id = db.Column(db.String(20), primary_key=True)
    product_id = db.Column(db.String(20), unique=True)
    account_id = db.Column(db.String(20))
    vendor_id = db.Column(db.String(20))
    version = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)


class DeploymentRequest(Model):
    __tablename__ = "requests"

    PREFIX = 'DPLR'

    id = db.Column(db.String(20), primary_key=True)
    deployment = db.Column(db.ForeignKey(Deployment.id))
