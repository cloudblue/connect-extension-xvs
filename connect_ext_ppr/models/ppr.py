from datetime import datetime

import sqlalchemy as db
from sqlalchemy.sql import desc, select

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.enums import PPRStatusChoices
from connect_ext_ppr.models.file import File


def make_version(context):
    dep_id = context.get_current_parameters()['deployment']
    stm = (
        select([PPRVersion.version])
        .where(PPRVersion.deployment == dep_id)
        .order_by(desc(PPRVersion.version))
        .limit(1)
        .with_for_update()
    )
    result = context.connection.execute(stm).scalar() or 0
    result += 1
    return result


class PPRVersion(Model):
    __tablename__ = 'ppr_version'

    PREFIX = 'PPRFL'

    id = db.Column(db.String(20), primary_key=True)
    file = db.Column(db.ForeignKey(File.id))
    deployment = db.Column(db.ForeignKey('deployments.id'))
    configuration = db.Column(db.ForeignKey(Configuration.id), nullable=True)
    version = db.Column(db.Integer, default=make_version)
    product_version = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    summary = db.Column(db.JSON)
    status = db.Column(
        db.Enum(PPRStatusChoices, validate_strings=True),
        default=PPRStatusChoices.PENDING,
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String(20))
