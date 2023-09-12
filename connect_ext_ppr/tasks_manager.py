import time
from datetime import datetime
from io import BufferedReader

from sqlalchemy.orm import joinedload, selectinload

from connect_ext_ppr.client.exception import ClientError
from connect_ext_ppr.db import get_cbc_extension_db, get_db_ctx_manager
from connect_ext_ppr.models.enums import CBCTaskLogStatus
from connect_ext_ppr.models.enums import (
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
    TaskTypesChoices,
)
from connect_ext_ppr.models.deployment import DeploymentRequest
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.services.cbc_extension import get_hub_credentials
from connect_ext_ppr.services.cbc_hub import CBCService


class TaskException(Exception):
    pass


def _get_cbc_service(config, deployment):
    cbc_db = get_cbc_extension_db(config)
    hub_credentials = get_hub_credentials(deployment.hub_id, cbc_db)
    if not hub_credentials:
        raise TaskException(f'Hub Credentials not found for Hub ID {deployment.hub_id}')

    return CBCService(hub_credentials, False)


def _execute_with_retries(function, func_args, num_retries=5):
    """
    @param function: reference to function to execute
    @param func_args: dict with the mapping of function's arguments
    @param num_retries: Max amount of retries

    @return function return value
    """
    while num_retries > 0:
        try:
            num_retries -= 1
            return function(**func_args)
        except ClientError as ex:
            if num_retries == 0:
                raise TaskException(str(ex))


def _send_ppr(cbc_service, file: BufferedReader):
    parsed_ppr = _execute_with_retries(cbc_service.parse_ppr, func_args={'file': file})

    if 'error' in parsed_ppr.keys():
        raise TaskException(parsed_ppr.get('message'))

    tracking_id = _execute_with_retries(cbc_service.apply_ppr, func_args={'parsed_ppr': parsed_ppr})

    if not tracking_id:
        raise TaskException('Some error ocurred trying to upload ppr.')

    return tracking_id


def _check_cbc_task_status(cbc_service, tracking_id):
    task_log = _execute_with_retries(
        cbc_service.search_task_logs_by_name, func_args={'partial_name': tracking_id},
    )
    # Setting this first default value in case takes time to create it in extenal system.
    task_log = task_log[0] if task_log else {'status': CBCTaskLogStatus.not_started}

    while task_log['status'] in (CBCTaskLogStatus.not_started, CBCTaskLogStatus.running):
        time.sleep(10)
        task_log = _execute_with_retries(
            cbc_service.search_task_logs_by_name, {'partial_name': tracking_id})[0]

    if task_log['status'] == CBCTaskLogStatus.success:
        return True

    raise TaskException(f'Something went wrong with task: {tracking_id}')


def validate_ppr(deployment_request, **kwargs):
    return True


def check_and_update_product(deployment_request, cbc_service, **kwargs):
    if not deployment_request.manually:

        product_id = deployment_request.deployment.product_id

        response = _execute_with_retries(
            cbc_service.get_product_details, func_args={'product_id': product_id},
        )

        if 'error' in response.keys():
            raise Exception(response['error'])

        if response.get('isUpdateAvailable'):
            response = _execute_with_retries(
                cbc_service.update_product, func_args={'product_id': product_id},
            )

        if 'error' in response.keys():
            raise Exception(response['error'])

    return True


def apply_ppr_and_delegate_to_marketplaces(deployment_request, **kwargs):
    return True


def delegate_to_l2(deployment_request, **kwargs):
    return True


TASK_PER_TYPE = {
    TaskTypesChoices.ppr_validation: validate_ppr,
    TaskTypesChoices.apply_and_delegate: apply_ppr_and_delegate_to_marketplaces,
    TaskTypesChoices.delegate_to_l2: delegate_to_l2,
}


def execute_tasks(db, config, tasks):
    was_succesfull = False
    cbc_service = _get_cbc_service(config, tasks[0].deployment_request.deployment)

    for task in tasks:
        db.refresh(task, with_for_update=True)
        if task.status == TasksStatusChoices.pending:
            task.status = TasksStatusChoices.processing
            task.started_at = datetime.utcnow()
            db.add(task)
            db.commit()

            try:
                was_succesfull = TASK_PER_TYPE.get(task.type)(
                    deployment_request=task.deployment_request,
                    cbc_service=cbc_service,
                )
                task.status = TasksStatusChoices.done
                if not was_succesfull:
                    task.status = TasksStatusChoices.error
            except TaskException as ex:
                was_succesfull = False
                task.error_message = str(ex)
                task.status = TasksStatusChoices.error
            except Exception:
                was_succesfull = False
                task.error_message = 'Unexpected error'
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

        deployment_request.started_at = datetime.utcnow()
        deployment = deployment_request.deployment
        deployment.status = DeploymentStatusChoices.processing
        deployment_request.status = DeploymentRequestStatusChoices.processing

        db.add(deployment)
        db.add(deployment_request)
        db.commit()

        tasks = db.query(Task).options(
            selectinload(Task.deployment_request),
        ).filter_by(
            deployment_request_id=deployment_request_id,
        ).order_by(Task.id).all()

        was_succesfull = execute_tasks(db, config, tasks)

        db.refresh(deployment_request, with_for_update=True)

        if deployment_request.status == DeploymentRequestStatusChoices.aborting:
            deployment_request.abort()
        elif was_succesfull:
            deployment_request.status = DeploymentRequestStatusChoices.done
        else:
            deployment_request.status = DeploymentRequestStatusChoices.error

        deployment_request.finished_at = datetime.utcnow()
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
