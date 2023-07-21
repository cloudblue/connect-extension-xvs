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


async def validate_ppr():
    return True


async def apply_ppr_and_delegate_to_marketplaces():
    return True


async def delegate_to_l2():
    return True


TASK_PER_TYPE = {
    TaskTypesChoices.PPR_VALIDATION: validate_ppr,
    TaskTypesChoices.APPLY_AND_DELEGATE: apply_ppr_and_delegate_to_marketplaces,
    TaskTypesChoices.DELEGATE_TO_L2: delegate_to_l2,
}


async def main_process(deployment_request_id, config):

    with get_db_ctx_manager(config) as db:
        deployment_request = db.query(DeploymentRequest).options(
            joinedload(DeploymentRequest.deployment),
        ).filter_by(id=deployment_request_id).first()
        deployment = deployment_request.deployment

        deployment.status = DeploymentStatusChoices.processing
        deployment_request.status = DeploymentRequestStatusChoices.processing
        db.add(deployment)
        db.add(deployment_request)
        db.commit()

        tasks = db.query(Task).filter_by(
            deployment_request=deployment_request.id,
        ).order_by(Task.id).all()

        deployment_request.status = DeploymentRequestStatusChoices.done
        for task in tasks:
            db.refresh(task)
            if task.status == TasksStatusChoices.pending:
                task.started_at = datetime.utcnow()
                db.add(task)
                db.commit()

                was_succesfull = await TASK_PER_TYPE.get(task.type)()
                task.status = TasksStatusChoices.done
                if not was_succesfull:
                    task.status = TasksStatusChoices.error
                task.finished_at = datetime.utcnow()
                db.add(task)
                db.commit()

                if not was_succesfull:
                    deployment_request.status = DeploymentRequestStatusChoices.error
                    break

        db.add(deployment_request)

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
