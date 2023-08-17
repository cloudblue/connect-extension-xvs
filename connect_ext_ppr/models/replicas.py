import sqlalchemy as db
from sqlalchemy.orm import relationship

from connect_ext_ppr.db import Model


class Account(Model):
    __tablename__ = 'accounts'

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(255))
    logo = db.Column(db.String(2000), nullable=True)


class Product(Model):
    __tablename__ = 'products'

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(255))
    logo = db.Column(db.String(2000), nullable=True)
    version = db.Column(db.SmallInteger(), nullable=True)
    owner_id = db.Column(db.ForeignKey(Account.id))

    deployment = relationship("Deployment", back_populates="product", lazy="dynamic")
    owner = relationship("Account", foreign_keys="Product.owner_id")
