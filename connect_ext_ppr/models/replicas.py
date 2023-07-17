import sqlalchemy as db
from sqlalchemy.orm import relationship

from connect_ext_ppr.db import Model


class Product(Model):
    __tablename__ = 'products'

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(255))
    logo = db.Column(db.String(2000), nullable=False)
    version = db.Column(db.SmallInteger())
    owner = db.Column(db.String(255))


class ProductItem(Model):
    __tablename__ = 'product_items'

    id = db.Column(db.String(100), primary_key=True)
    product_id = db.Column(db.ForeignKey(Product.id))
    product = relationship(Product)
    name = db.Column(db.String(255))
    description = db.Column(db.String(2000), nullable=False)
    mpn = db.Column(db.Text, nullable=False)
    unit = db.Column(db.String(255))
    type = db.Column(db.String(255))

    def to_ppr_dict(self):
        return {
            "Name_EN": self.name,
            "Description_EN": self.description,
            "ResourceCategory": self.product.name,
            "MPN": self.mpn,
            "UOM": self.unit,
            "Measurable": self.measurable,
        }

    @property
    def measurable(self):
        return self.type == 'ppu'
