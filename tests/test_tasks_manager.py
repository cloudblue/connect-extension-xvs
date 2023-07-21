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
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.PPR_VALIDATION)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.APPLY_AND_DELEGATE)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.DELEGATE_TO_L2)
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
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.PPR_VALIDATION)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.APPLY_AND_DELEGATE)
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
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.PPR_VALIDATION)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.APPLY_AND_DELEGATE)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.DELEGATE_TO_L2)
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
        (TaskTypesChoices.PPR_VALIDATION, 0, 1, 2),
        (TaskTypesChoices.APPLY_AND_DELEGATE, 1, 1, 1),
        (TaskTypesChoices.DELEGATE_TO_L2, 2, 1, 0),
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
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.PPR_VALIDATION)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.APPLY_AND_DELEGATE)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.DELEGATE_TO_L2)

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
