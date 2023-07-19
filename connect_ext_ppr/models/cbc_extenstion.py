import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base


CBCExtensionModel = declarative_base()


class HubCredential(CBCExtensionModel):
    __tablename__ = 'hub_credential'  # Imaginary table.

    hub_id = db.Column(db.String(100), primary_key=True)
    app_id = db.Column(db.String(100))
    controller_url = db.Column(db.String(400))
    oauth_key = db.Column(db.String(100))
    oauth_secret = db.Column(db.String(100))
