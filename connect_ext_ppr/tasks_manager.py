from datetime import datetime

from sqlalchemy.orm import joinedload

from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.models.enums import (
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
    TaskTypesChoices,
)
from connect_ext_ppr.models.deployment import DeploymentRequest
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.task import Task


def validate_ppr():
    return True


def apply_ppr_and_delegate_to_marketplaces():
    return True


def delegate_to_l2():
    return True


TASK_PER_TYPE = {
    TaskTypesChoices.ppr_validation: validate_ppr,
    TaskTypesChoices.apply_and_delegate: apply_ppr_and_delegate_to_marketplaces,
    TaskTypesChoices.delegate_to_l2: delegate_to_l2,
}


def execute_tasks(db, tasks):
    was_succesfull = False
    for task in tasks:
        db.refresh(task, with_for_update=True)
        if task.status == TasksStatusChoices.pending:
            task.status = TasksStatusChoices.processing
            task.started_at = datetime.utcnow()
            db.add(task)
            db.commit()

            try:
                was_succesfull = TASK_PER_TYPE.get(task.type)()
                task.status = TasksStatusChoices.done
                if not was_succesfull:
                    task.status = TasksStatusChoices.error
            except Exception:
                was_succesfull = False
                task.status = TasksStatusChoices.error

            task.finished_at = datetime.utcnow()
            db.add(task)
            db.commit()
            if not was_succesfull:
                break

    return was_succesfull


def main_process(deployment_request_id, config):

    with get_db_ctx_manager(config) as db:
        deployment_request = db.query(DeploymentRequest).options(
            joinedload(DeploymentRequest.deployment),
        ).filter_by(id=deployment_request_id).first()

        if deployment_request.status != DeploymentRequestStatusChoices.pending:
            return deployment_request.status

        deployment = deployment_request.deployment
        deployment.status = DeploymentStatusChoices.processing
        deployment_request.status = DeploymentRequestStatusChoices.processing

        db.add(deployment)
        db.add(deployment_request)
        db.commit()

        tasks = db.query(Task).filter_by(
            deployment_request=deployment_request.id,
        ).order_by(Task.id).all()

        was_succesfull = execute_tasks(db, tasks)

        db.refresh(deployment_request, with_for_update=True)

        if deployment_request.status == DeploymentRequestStatusChoices.aborting:
            deployment_request.abort()
        elif was_succesfull:
            deployment_request.status = DeploymentRequestStatusChoices.done
        else:
            deployment_request.status = DeploymentRequestStatusChoices.error

        db.add(deployment_request)
        db.commit()

        deployment.status = DeploymentStatusChoices.pending
        deployment_last_ppr = db.query(PPRVersion).filter_by(
            deployment=deployment.id,
        ).order_by(PPRVersion.version.desc()).first()

        if (
            deployment_last_ppr.version == deployment_request.ppr.version
            and deployment_request.delegate_l2
            and deployment_request.status == TasksStatusChoices.done
        ):
            deployment.status = DeploymentStatusChoices.synced

        db.add(deployment)
        db.commit()
        return deployment_request.status
