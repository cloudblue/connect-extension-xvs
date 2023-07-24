from datetime import datetime

import sqlalchemy as db

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import MimeTypeChoices


class File(Model):
    __tablename__ = 'files'

    MIME_TYPE = MimeTypeChoices

    id = db.Column(db.String(20), primary_key=True)
    account_id = db.Column(db.String(20))
    location = db.Column(db.String(1024))
    name = db.Column(db.String(1024))
    size = db.Column(db.Integer)
    mime_type = db.Column(
        db.Enum(MimeTypeChoices, validate_strings=True),
    )
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_by = db.Column(db.String(20))
