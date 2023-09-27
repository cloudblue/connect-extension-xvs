from datetime import datetime

import sqlalchemy as db
from sqlalchemy.orm import relationship

from connect_ext_ppr.db import Model
from connect_ext_ppr.models.enums import TasksStatusChoices, TaskTypesChoices
from connect_ext_ppr.models.deployment import DeploymentRequest, MarketplaceConfiguration
from connect_ext_ppr.models.models_utils import transition


class Task(Model):
    __tablename__ = 'tasks'

    PREFIX = 'TSK'

    STATUSES = TasksStatusChoices
    TYPES = TaskTypesChoices

    id = db.Column(db.String(30), primary_key=True)
    status = db.Column(
        db.Enum(TasksStatusChoices, validate_strings=True),
        default=STATUSES.pending,
    )
    deployment_request_id = db.Column(db.ForeignKey(DeploymentRequest.id))
    marketplace_id = db.Column(db.ForeignKey(MarketplaceConfiguration.id), nullable=True)
    title = db.Column(db.String(100))
    error_message = db.Column(db.String(4000))
    type = db.Column(db.Enum(TaskTypesChoices, validate_strings=True))

    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    created_by = db.Column(db.String(20))
    started_at = db.Column(db.DateTime(), nullable=True)
    finished_at = db.Column(db.DateTime(), nullable=True)
    aborted_at = db.Column(db.DateTime(), nullable=True)
    aborted_by = db.Column(db.String(20), nullable=True)

    deployment_request = relationship(DeploymentRequest, foreign_keys='Task.deployment_request_id')
    marketplace = relationship(MarketplaceConfiguration, foreign_keys='Task.marketplace_id')

    @transition('status', target=STATUSES.aborted, sources=[STATUSES.pending])
    def abort(self, by):
        self.aborted_at = datetime.utcnow()
        self.aborted_by = by

    @transition('status', target=STATUSES.pending, sources=[STATUSES.error])
    def retry(self):
        self.started_at = None
        self.finished_at = None
