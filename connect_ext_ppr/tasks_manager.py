import time
from datetime import datetime
from io import BufferedReader

from connect.client import ClientError
from sqlalchemy.orm import joinedload, selectinload

from connect_ext_ppr.client.exception import CBCClientError
from connect_ext_ppr.constants import (
    DELAY_SECONDS_BETWEEN_TASKS,
    PPR_FILE_NAME_DELEGATION_L2,
    PPR_FILE_NAME_UPDATE_MARKETPLACES,
)
from connect_ext_ppr.db import get_cbc_extension_db, get_cbc_extension_db_engine, get_db_ctx_manager
from connect_ext_ppr.models.configuration import Configuration
from connect_ext_ppr.models.enums import (
    CBCTaskLogStatus,
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
    TaskTypesChoices,
)
from connect_ext_ppr.models.deployment import DeploymentRequest, MarketplaceConfiguration
from connect_ext_ppr.models.ppr import PPRVersion
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.client.utils import get_cbc_service
from connect_ext_ppr.services.pricing import (
    apply_pricelist_to_marketplace,
    validate_pricelist_batch,
)
from connect_ext_ppr.utils import (
    create_ppr_to_media,
    execute_with_retry,
    get_base_workbook,
    get_configuration_from_media,
    get_file_size,
    get_mps_to_update_for_apply_ppr_and_delegate_to_marketplaces,
    get_ppr_from_media,
    process_ppr_file_for_apply_ppr_and_delegate_to_marketplaces,
    process_ppr_file_for_delelegate_l2,
)


class TaskException(Exception):
    pass


def _get_cbc_service(config, deployment):
    cbc_db = get_cbc_extension_db(engine=get_cbc_extension_db_engine(config))
    try:
        return get_cbc_service(deployment.hub_id, cbc_db)
    except ClientError as e:
        raise TaskException(e.message)


def _execute_with_retries(function, func_kwargs, num_retries=5):
    """
    @param function: reference to function to execute
    @param func_kwargs: dict with the mapping of function's arguments
    @param num_retries: Max amount of retries

    @return function return value
    """
    try:
        return execute_with_retry(
            function=function,
            exception_class=CBCClientError,
            kwargs=func_kwargs,
            num_retries=num_retries,
        )
    except CBCClientError as ex:
        message = ex.message
        if ex.json:
            message += f' - {ex.json.get("message")}'
        raise TaskException(message)


def _send_ppr(cbc_service, file: BufferedReader):
    parsed_ppr = _execute_with_retries(cbc_service.parse_ppr, func_kwargs={'file': file})

    if 'error' in parsed_ppr.keys():
        raise TaskException(parsed_ppr.get('message'))

    tracking_id = _execute_with_retries(
        cbc_service.apply_ppr,
        func_kwargs={'parsed_ppr': parsed_ppr},
    )

    if not tracking_id:
        raise TaskException('Some error occurred trying to upload ppr.')

    return tracking_id


def _check_cbc_task_status(cbc_service, tracking_id):
    task_log = _execute_with_retries(
        cbc_service.search_task_logs_by_name, func_kwargs={'partial_name': tracking_id},
    )
    # Setting this first default value in case takes time to create it in external system.
    task_log = task_log[0] if task_log else {'status': CBCTaskLogStatus.not_started}

    while task_log['status'] in (CBCTaskLogStatus.not_started, CBCTaskLogStatus.running):
        time.sleep(DELAY_SECONDS_BETWEEN_TASKS)
        task_log = _execute_with_retries(
            cbc_service.search_task_logs_by_name, {'partial_name': tracking_id})[0]

    if task_log['status'] == CBCTaskLogStatus.success:
        return True

    raise TaskException(f'Something went wrong with task: {tracking_id}')


def check_and_update_product(deployment_request, cbc_service, **kwargs):
    if not deployment_request.manually:

        product_id = deployment_request.deployment.product_id

        response = _execute_with_retries(
            cbc_service.get_product_details, func_kwargs={'product_id': product_id},
        )

        if 'error' in response.keys():
            raise Exception(response['error'])

        if response.get('isUpdateAvailable'):
            response = _execute_with_retries(
                cbc_service.update_product, func_kwargs={'product_id': product_id},
            )

        if 'error' in response.keys():
            raise Exception(response['error'])

    return True


def prepare_ppr_file_for_task(
    connect_client,
    file_data,
    file_name_template,
    deployment_request,
    deployment,
    process_func,
    **process_args,
):
    """Process PPR file and save a processed copy to Media before tasks: delegate to l2,
    apply to marketplaces.

    :param connect_client: Connect client
    :param file_data: Body of PPR file
    :param file_name_template: Template to create file name in Media
    :param deployment_request: DeploymentRequest model
    :param deployment: Deployment model
    :param process_func: function, that will be applied to the file
    :rtype bool
    :raises TaskException
    """
    file, writer, wb = get_base_workbook(file_data)

    try:
        ws_list = []
        for sheet_name in wb.sheet_names:
            ws = wb.parse(sheet_name)
            process_func(sheet_name, ws, **process_args)
            ws.name = sheet_name
            ws_list.append(ws)

        for ws in ws_list:
            ws.to_excel(writer, ws.name, index=False)
        file_obj = open(file.name, 'rb')
        writer.book.save(file_obj.name)

        file_size = get_file_size(file_obj)
        file_name = file_name_template.format(
            dr_id=deployment_request.id,
            ppr_id=deployment_request.ppr.id,
            timestamp=datetime.utcnow().strftime("%s"),
        )
        create_ppr_to_media(
            connect_client,
            deployment.account_id,
            deployment_request.id,
            file_name,
            file_obj.read(),
            file_size,
        )
        return file_obj

    except (FileNotFoundError, ValueError, KeyError) as e:
        raise TaskException(f'Error while processing PPR file: {e}')
    except ClientError as e:
        raise TaskException(f'Error while connecting to Connect: {e.message}')


def apply_ppr_and_delegate_to_marketplaces(
    deployment_request,
    cbc_service,
    connect_client,
    db,
    logger,
    **kwargs,
):
    """Task sends PPR to the Commerce and updates marketplaces in DB

    :param deployment_request: DeploymentRequest model
    :param cbc_service: CBC service
    :param connect_client: Connect client
    :param db: dbsession
    :param logger: logger
    :rtype bool
    :raises TaskException
    """
    dr_marketplaces = db.query(MarketplaceConfiguration).filter_by(
        active=True,
        deployment_request_id=deployment_request.id,
    ).all()
    dep_marketplaces = db.query(MarketplaceConfiguration).filter_by(
        active=True,
        deployment_id=deployment_request.deployment_id,
    ).filter(
        MarketplaceConfiguration.marketplace.in_([m.marketplace for m in dr_marketplaces]),
    ).all()
    marketplaces_to_update_dict = {m.marketplace: None for m in dr_marketplaces}

    if not deployment_request.manually:
        ppr_file_id = deployment_request.ppr.file
        deployment = deployment_request.deployment
        configuration = (
            db.query(Configuration)
            .filter_by(
                deployment=deployment.id,
                state=Configuration.STATE.active,
            )
            .one_or_none()
        )
        try:
            file_data = get_ppr_from_media(
                connect_client,
                deployment.account_id,
                deployment.id,
                ppr_file_id,
            )
            config_json = get_configuration_from_media(
                connect_client, deployment.account_id, deployment.id, configuration.file,
            )
        except ClientError as e:
            raise TaskException(f'Error while connecting to Connect: {e.message}')

        marketplaces_to_update_dict = get_mps_to_update_for_apply_ppr_and_delegate_to_marketplaces(
            ppr_file_data=file_data,
            config_json=config_json,
            dr_marketplaces=dr_marketplaces,
        )

        file = prepare_ppr_file_for_task(
            connect_client=connect_client,
            file_data=file_data,
            file_name_template=PPR_FILE_NAME_UPDATE_MARKETPLACES,
            deployment_request=deployment_request,
            deployment=deployment,
            process_func=process_ppr_file_for_apply_ppr_and_delegate_to_marketplaces,
            columns_to_keep=marketplaces_to_update_dict.values(),
        )

        tracking_id = _send_ppr(cbc_service, file)
        logger.debug(
            f'apply_ppr_and_delegate_to_marketplaces dr_id: {deployment_request.id},'
            f' tracking_id: {tracking_id}',
        )
        file.close()
        _check_cbc_task_status(cbc_service, tracking_id)

    for marketplace in dr_marketplaces + dep_marketplaces:
        if marketplace.marketplace in marketplaces_to_update_dict:
            marketplace.ppr_id = deployment_request.ppr_id
            db.add(marketplace)

    db.commit()
    return True


def delegate_to_l2(deployment_request, cbc_service, connect_client, logger, **kwargs):
    """Task delegates PPR to L2 in Commerce

    :param deployment_request: DeploymentRequest model
    :param cbc_service: CBC service
    :param connect_client: Connect client
    :param logger: logger
    :rtype bool
    :raises TaskException
    """
    if deployment_request.manually:
        return True

    ppr_file_id = deployment_request.ppr.file
    deployment = deployment_request.deployment
    try:
        file_data = get_ppr_from_media(
            connect_client,
            deployment.account_id,
            deployment.id,
            ppr_file_id,
        )
    except ClientError as e:
        raise TaskException(f'Error while connecting to Connect: {e.message}')

    file = prepare_ppr_file_for_task(
        connect_client=connect_client,
        file_data=file_data,
        file_name_template=PPR_FILE_NAME_DELEGATION_L2,
        deployment_request=deployment_request,
        deployment=deployment,
        process_func=process_ppr_file_for_delelegate_l2,
    )

    tracking_id = _send_ppr(cbc_service, file)
    logger.debug(f'delegate_to_l2 dr_id: {deployment_request.id}, tracking_id: {tracking_id}')
    file.close()
    _check_cbc_task_status(cbc_service, tracking_id)
    return True


def apply_pricelist_task(
    deployment_request,
    cbc_service,
    connect_client,
    marketplace,
    db,
    logger,
    **kwargs,
):
    """ Applies a price list for a sinle marketplace

    @param DeploymentRequest deployment_request:
    @param CBCService cbc_service:
    @param Client connect_client:
    @param MarketplaceConfiguration marketplace:
    @param Session db:
    @param Logger logger:

    @returns bool
    @raises TaskException
    """
    if not deployment_request.manually:
        try:
            apply_pricelist_to_marketplace(
                deployment_request,
                cbc_service,
                connect_client,
                marketplace,
                logger,
            )
        except (ClientError, CBCClientError) as e:
            raise TaskException(f'Error while processing pricelist: {e}')

    deployment_marketplace = db.query(MarketplaceConfiguration).filter_by(
        deployment_id=deployment_request.deployment_id,
    ).with_for_update().one()
    deployment_marketplace.pricelist_id = marketplace.pricelist_id
    db.add(deployment_marketplace)
    db.commit()

    return True


def validate_pricelists_task(
    deployment_request,
    connect_client,
    **kwargs,
):
    """ Validates all price lists of deployment request

    @param DeploymentRequest deployment_request:
    @param Client connect_client:

    @returns bool
    @raises TaskException
    """
    dep_marketplaces = {mp.marketplace: mp for mp in deployment_request.deployment.marketplaces}

    for marketplace in deployment_request.marketplaces:
        if (
            (not marketplace.pricelist_id)
            or marketplace.pricelist_id == dep_marketplaces[marketplace.marketplace].pricelist_id
        ):
            continue

        try:
            validate_pricelist_batch(connect_client, marketplace.pricelist_id)
        except ClientError as e:
            raise TaskException(
                'Price list {pl_id} of marketplace {mp} validation failed: {msg}'.format(
                    pl_id=marketplace.pricelist_id,
                    mp=marketplace.marketplace,
                    msg=e.message,
                ),
            )

    return True


TASK_PER_TYPE = {
    TaskTypesChoices.product_setup: check_and_update_product,
    TaskTypesChoices.apply_and_delegate: apply_ppr_and_delegate_to_marketplaces,
    TaskTypesChoices.delegate_to_l2: delegate_to_l2,
    TaskTypesChoices.validate_pricelists: validate_pricelists_task,
    TaskTypesChoices.apply_pricelist: apply_pricelist_task,
}


def execute_tasks(db, config, tasks, connect_client, logger):
    was_succesfull = False
    cbc_service = None

    for task in tasks:
        db.refresh(task, with_for_update=True)
        if task.status == TasksStatusChoices.pending:
            task.status = TasksStatusChoices.processing
            task.started_at = datetime.utcnow()
            db.add(task)
            db.commit()

            try:
                if not cbc_service:
                    cbc_service = _get_cbc_service(
                        config=config,
                        deployment=task.deployment_request.deployment,
                    )
                was_succesfull = TASK_PER_TYPE.get(task.type)(
                    deployment_request=task.deployment_request,
                    cbc_service=cbc_service,
                    connect_client=connect_client,
                    marketplace=task.marketplace,
                    db=db,
                    logger=logger,
                )
                task.status = TasksStatusChoices.done

            except TaskException as ex:
                logger.error(f'Task ID: {task.id} - {ex}')
                was_succesfull = False
                task.error_message = str(ex)[:4000]
            except Exception as ex:
                logger.exception(f'Task ID: {task.id} - {ex}')
                was_succesfull = False
                task.error_message = 'Something went wrong.'

            task.finished_at = datetime.utcnow()
            db.add(task)

            if not was_succesfull:
                task.status = TasksStatusChoices.error
                db.commit()
                break
            db.commit()

    return was_succesfull


def main_process(deployment_request_id, config, connect_client, logger):

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

        try:
            was_succesfull = execute_tasks(db, config, tasks, connect_client, logger)
        except Exception as ex:
            was_succesfull = False
            logger.exception(f'DeploymentRequest ID: {deployment_request_id} - {ex}')

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
