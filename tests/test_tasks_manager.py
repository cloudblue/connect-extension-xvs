import pytest
from sqlalchemy import null

from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.enums import (
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
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
):
    dep = deployment_factory(dbsession)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True)
    task_factory(deployment_request=dr, task_index='0001')
    task_factory(deployment_request=dr, task_index='0002')
    task_factory(deployment_request=dr, task_index='0003')
    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.DONE

    assert dbsession.query(Deployment).filter_by(status=DeploymentStatusChoices.SYNCED).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.DONE,
    ).count() == 1
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.DONE,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == 3


@pytest.mark.asyncio
async def test_main_process_wo_l2_delegation(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
):
    dep = deployment_factory(dbsession)
    dr = deployment_request_factory(deployment=dep, delegate_l2=False)
    task_factory(deployment_request=dr, task_index='0001')
    task_factory(deployment_request=dr, task_index='0002')
    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.DONE

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.PENDING,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.DONE,
    ).count() == 1
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.DONE,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == 2


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ('function_to_mock', 'done_tasks', 'tasks_w_errors', 'pending_tasks'),
    (
        ('validate_ppr', 0, 1, 2),
        ('apply_ppr_and_delegate_to_marketplaces', 1, 1, 1),
        ('delegate_to_l2', 2, 1, 0),
    ),
)
async def test_main_process_ends_w_error(
    dbsession,
    deployment_factory,
    deployment_request_factory,
    done_tasks,
    tasks_w_errors,
    pending_tasks,
    function_to_mock,
    mocker,
    task_factory,
):
    dep = deployment_factory(dbsession)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True)
    task_factory(deployment_request=dr, task_index='0001')
    task_factory(deployment_request=dr, task_index='0002')
    task_factory(deployment_request=dr, task_index='0003')

    mocker.patch(
        f'connect_ext_ppr.tasks_manager.{function_to_mock}',
        return_value=False,
    )
    assert await main_process(dr.id, {}) == DeploymentRequestStatusChoices.ERROR

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.PENDING,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.ERROR,
    ).count() == 1

    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.DONE,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == done_tasks
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.ERROR,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == tasks_w_errors
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.PENDING,
        Task.started_at.is_(null()),
        Task.finished_at.is_(null()),
    ).count() == pending_tasks
