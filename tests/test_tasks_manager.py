import pytest
from sqlalchemy import null

from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.enums import (
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
    TaskTypesChoices,
)
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.tasks_manager import (
    apply_ppr_and_delegate_to_marketplaces,
    delegate_to_l2,
    main_process,
    validate_ppr,
)


@pytest.mark.asyncio
async def test_apply_ppr_and_delegate_to_marketplaces():
    assert await apply_ppr_and_delegate_to_marketplaces()


@pytest.mark.asyncio
async def test_delegate_to_l2():
    assert await delegate_to_l2()


@pytest.mark.asyncio
async def test_validate_ppr():
    assert await validate_ppr()


@pytest.mark.asyncio
async def test_main_process(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
):
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.ppr_validation)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)
    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.done

    assert dbsession.query(Deployment).filter_by(status=DeploymentStatusChoices.synced).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.done,
    ).count() == 1
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.done,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == 3


@pytest.mark.asyncio
async def test_main_process_wo_l2_delegation(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
):
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep)
    dr = deployment_request_factory(deployment=dep, delegate_l2=False, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.ppr_validation)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.done

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.pending,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.done,
    ).count() == 1
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.done,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == 2


@pytest.mark.asyncio
async def test_main_process_deployment_w_new_ppr_version(
    dbsession,
    file_factory,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
):
    file = file_factory(id='MFL-123')
    dep = deployment_factory()
    dr_ppr = ppr_version_factory(
        id='PPR-1234', file=file.id, product_version=1, deployment=dep)
    ppr_version_factory(id='PPR-123', product_version=2, deployment=dep)
    dr = deployment_request_factory(deployment=dep, delegate_l2=False, ppr=dr_ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.ppr_validation)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)
    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.done

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.pending,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.done,
    ).count() == 1
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.done,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == 3


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ('type_function_to_mock', 'done_tasks', 'tasks_w_errors', 'pending_tasks'),
    (
        (TaskTypesChoices.ppr_validation, 0, 1, 2),
        (TaskTypesChoices.apply_and_delegate, 1, 1, 1),
        (TaskTypesChoices.delegate_to_l2, 2, 1, 0),
    ),
)
async def test_main_process_ends_w_error(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    done_tasks,
    tasks_w_errors,
    pending_tasks,
    type_function_to_mock,
    mocker,
    task_factory,
    ppr_version_factory,
):
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep, version=1)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.ppr_validation)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)

    def mock_dict_get(key):
        if key == type_function_to_mock:
            return mocker.AsyncMock(return_value=False)
        return mocker.AsyncMock(return_value=True)

    my_mock = mocker.AsyncMock()
    my_mock.get = mock_dict_get
    import connect_ext_ppr
    connect_ext_ppr.tasks_manager.TASK_PER_TYPE = my_mock

    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.error

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.pending,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.error,
    ).count() == 1

    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.done,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == done_tasks
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.error,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == tasks_w_errors
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.pending,
        Task.started_at.is_(null()),
        Task.finished_at.is_(null()),
    ).count() == pending_tasks


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ('task_statuses', 'done_tasks', 'aborted_tasks'),
    (
        (
            [TasksStatusChoices.aborted, TasksStatusChoices.aborted, TasksStatusChoices.aborted],
            0,
            3,
        ),
        (
            [TasksStatusChoices.done, TasksStatusChoices.aborted, TasksStatusChoices.aborted],
            1,
            2,
        ),
        (
            [TasksStatusChoices.done, TasksStatusChoices.pending, TasksStatusChoices.aborted],
            2,
            1,
        ),
    ),
)
async def test_main_process_w_aborted_tasks(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
    task_statuses,
    done_tasks,
    aborted_tasks,
):
    """
        We only process DeploymentRequest that are in Pending status. So in this case we asume that
        the DR is in Pending status at the begining, but changes it's
    """
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep, version=1)
    dr = deployment_request_factory(
        deployment=dep,
        delegate_l2=True,
        ppr=ppr,
        status=DeploymentRequestStatusChoices.pending,
    )
    task_factory(
        deployment_request=dr,
        task_index='0001',
        type=TaskTypesChoices.ppr_validation,
        status=task_statuses.pop(),
    )

    task_factory(
        deployment_request=dr,
        task_index='0002',
        type=TaskTypesChoices.apply_and_delegate,
        status=task_statuses.pop(),
    )
    task_factory(
        deployment_request=dr,
        task_index='0003',
        type=TaskTypesChoices.delegate_to_l2,
        status=task_statuses.pop(),
    )

    def change_dr_status(instance, attribute_names=None, with_for_update=None):
        if isinstance(instance, DeploymentRequest):
            instance.status = DeploymentRequestStatusChoices.aborting
        return instance

    dbsession.refresh = change_dr_status

    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.aborted

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.pending,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.aborted,
    ).count() == 1

    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.done,
    ).count() == done_tasks
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.aborted,
    ).count() == aborted_tasks


@pytest.mark.asyncio
async def test_main_process_w_aborted_deployment_request(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
):
    """
        We only process DeploymentRequest that are in Pending status. So in this case we asume that
        the DR is in Pending status at the begining, but changes it's
    """
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep, version=1)
    dr = deployment_request_factory(
        deployment=dep,
        delegate_l2=True,
        ppr=ppr,
        status=DeploymentRequestStatusChoices.aborted,
    )
    task_factory(
        deployment_request=dr,
        task_index='0001',
        type=TaskTypesChoices.ppr_validation,
        status=TasksStatusChoices.aborted,
    )

    task_factory(
        deployment_request=dr,
        task_index='0002',
        type=TaskTypesChoices.apply_and_delegate,
        status=TasksStatusChoices.aborted,
    )
    task_factory(
        deployment_request=dr,
        task_index='0003',
        type=TaskTypesChoices.delegate_to_l2,
        status=TasksStatusChoices.aborted,
    )

    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.aborted

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.pending,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.aborted,
    ).count() == 1

    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.aborted,
    ).count() == 3
