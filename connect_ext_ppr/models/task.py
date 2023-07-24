from datetime import datetime

import sqlalchemy as db

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import TasksStatusChoices, TaskTypesChoices
from connect_ext_ppr.models.deployment import DeploymentRequest


class Task(Model):
    __tablename__ = 'tasks'

    PREFIX = 'TSK'

    id = db.Column(db.String(30), primary_key=True)
    status = db.Column(
        db.Enum(TasksStatusChoices, validate_strings=True),
        default=TasksStatusChoices.PENDING,
    )
    deployment_request = db.Column(db.ForeignKey(DeploymentRequest.id))
    title = db.Column(db.String(100))
    error_message = db.Column(db.String((4000)))
    type = db.Column(db.Enum(TaskTypesChoices, validate_strings=True))

    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_by = db.Column(db.String(20))
    started_at = db.Column(db.DateTime(), nullable=True)
    finished_at = db.Column(db.DateTime(), nullable=True)
    aborted_at = db.Column(db.DateTime(), nullable=True)
    aborted_by = db.Column(db.String(20), nullable=True)
