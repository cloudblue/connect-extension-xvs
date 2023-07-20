from datetime import datetime

from sqlalchemy.orm import joinedload

from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.models.enums import (
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
)
from connect_ext_ppr.models.deployment import DeploymentRequest
from connect_ext_ppr.models.task import Task


async def validate_ppr():
    return True


async def apply_ppr_and_delegate_to_marketplaces():
    return True


async def delegate_to_l2():
    return True


async def execute_task(task, db, task_function):
    if task.status == TasksStatusChoices.PENDING:
        task.started_at = datetime.utcnow()
        finished_ok = await task_function()
        task.status = TasksStatusChoices.DONE if finished_ok else TasksStatusChoices.ERROR
        task.finished_at = datetime.utcnow()
        db.add(task)
        db.commit()
    return task.status


async def main_process(deployment_request_id, config):
    deployment_final_status = DeploymentStatusChoices.PENDING
    deployment_request_final_status = DeploymentRequestStatusChoices.DONE

    with get_db_ctx_manager(config) as db:
        deployment_request = db.query(DeploymentRequest).options(
            joinedload(DeploymentRequest.deployment),
        ).filter_by(id=deployment_request_id).first()
        deployment = deployment_request.deployment

        deployment.status = DeploymentStatusChoices.PROCESSING
        deployment_request.status = DeploymentRequestStatusChoices.PROCESSING
        db.add(deployment)
        db.add(deployment_request)
        db.commit()

        tasks = db.query(Task).filter_by(
            deployment_request=deployment_request.id,
        ).order_by(Task.id).all()

        last_task_result = await execute_task(tasks[0], db, validate_ppr)
        if last_task_result == TasksStatusChoices.ERROR:
            deployment_request_final_status = DeploymentRequestStatusChoices.ERROR
        else:
            db.refresh(tasks[1])
            last_task_result = await execute_task(
                tasks[1],
                db,
                apply_ppr_and_delegate_to_marketplaces,
            )
            if last_task_result == TasksStatusChoices.ERROR:
                deployment_request_final_status = DeploymentRequestStatusChoices.ERROR
            elif deployment_request.delegate_l2:
                db.refresh(tasks[2])
                last_task_result = await execute_task(tasks[2], db, delegate_to_l2)
                if last_task_result == TasksStatusChoices.DONE:
                    deployment_final_status = DeploymentStatusChoices.SYNCED
                else:
                    deployment_request_final_status = DeploymentRequestStatusChoices.ERROR

        deployment.status = deployment_final_status
        deployment_request.status = deployment_request_final_status
        db.add(deployment_request)
        db.add(deployment)
        db.commit()
    return deployment_request.status
