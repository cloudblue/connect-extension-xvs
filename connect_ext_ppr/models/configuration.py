from datetime import datetime

import sqlalchemy as db

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import ConfigurationStateChoices
from connect_ext_ppr.models.file import File


class Configuration(Model):
    __tablename__ = 'configurations'

    PREFIX = 'CFL'

    id = db.Column(db.String(20), primary_key=True)
    file = db.Column(db.ForeignKey(File.id))
    deployment = db.Column(db.ForeignKey('deployments.id'))
    state = db.Column(
        db.Enum(ConfigurationStateChoices, validate_strings=True),
        default=ConfigurationStateChoices.INACTIVE,
    )
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_by = db.Column(db.JSON)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_by = db.Column(db.JSON)

    def activate(self):
        self.state = ConfigurationStateChoices.ACTIVE

    def deleted(self):
        self.state = ConfigurationStateChoices.DELETED
