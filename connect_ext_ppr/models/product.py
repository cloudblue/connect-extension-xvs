from datetime import datetime

import sqlalchemy as db

from connect_ext_ppr.db import Model


class Product(Model):
    __tablename__ = "products"

    product_id = db.Column(db.String(20), primary_key=True)
    account_id = db.Column(db.String(20))
    vendor_id = db.Column(db.String(20))
    version = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
