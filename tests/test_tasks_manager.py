import copy
import json
from io import BufferedReader

import pytest

from unittest.mock import patch

from connect.client import ClientError
from requests import Response
from sqlalchemy import null

from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.enums import (
    CBCTaskLogStatus,
    DeploymentRequestStatusChoices,
    DeploymentStatusChoices,
    TasksStatusChoices,
    TaskTypesChoices,
)
from connect_ext_ppr.client.exception import CBCClientError
from connect_ext_ppr.models.task import Task
from connect_ext_ppr.tasks_manager import (
    _check_cbc_task_status,
    _send_ppr,
    apply_ppr_and_delegate_to_marketplaces,
    apply_pricelist_task,
    check_and_update_product,
    delegate_to_l2,
    main_process,
    TaskException,
    validate_pricelists_task,
)
from connect_ext_ppr.services.cbc_hub import CBCService

from tests.test_utils import check_excel_file_column_values


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    configuration_factory,
    connect_client,
    mocker,
    logger,
):
    ppr_file_data = open('./tests/fixtures/test_PPR_apply_to_marketplaces.xlsx', 'rb').read()
    ppr_config_file_data = json.load(open('./tests/fixtures/test_PPR_config_file.json'))

    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [False] * 4,
    )
    file_sent = null

    def send_ppr_side_effect(*args):
        nonlocal file_sent
        _file = args[1]
        _file.seek(0)
        file_sent = _file.read()

    send_ppr_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._send_ppr',
        return_value=101,
        side_effect=send_ppr_side_effect,
    )
    get_config_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_configuration_from_media',
        return_value=ppr_config_file_data,
    )

    get_ppr_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )

    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    check_cbc_task_status_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._check_cbc_task_status',
    )

    cbc_service = CBCService()
    dep = deployment_factory()
    configuration_factory(deployment=dep.id)
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)

    # Mapping marketplaces Connect => CBC
    #    "MP-123": "CO"
    #    "MP-124": "AT"
    #    "MP-125": "US"

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')

    assert apply_ppr_and_delegate_to_marketplaces(
        dr,
        cbc_service,
        connect_client,
        dbsession,
        logger,
    )

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id == ppr2.id
    assert dr_m2.ppr_id == ppr2.id
    assert dep_m1.ppr_id == ppr2.id
    assert dep_m2.ppr_id == ppr2.id
    assert dep_m3.ppr_id == ppr.id

    assert get_config_from_media_mock.call_count == 1
    assert get_ppr_from_media_mock.call_count == 1
    assert create_ppr_to_media_mock.call_count == 1
    assert send_ppr_mock.call_count == 1
    assert check_cbc_task_status_mock.call_count == 1

    assert send_ppr_mock.call_args.args[0] == cbc_service
    ppr_file_arg = send_ppr_mock.call_args.args[1]
    assert isinstance(ppr_file_arg, BufferedReader)
    assert check_excel_file_column_values(file_sent, 'OpUnitServicePlans', 'Published', [False] * 4)
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'Published', [False, True, False, True, True, True],
    )
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'OpUnit_CO', [True, True, True, False, False, False],
    )
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'OpUnit_AT', [True, True, True, False, False, False],
    )
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'OpUnit_US', [False] * 6,
    )


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces_manually(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    connect_client,
    mocker,
    logger,
):

    get_from_media_mock = mocker.patch('connect_ext_ppr.tasks_manager.get_ppr_from_media')
    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    check_cbc_task_status_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._check_cbc_task_status',
    )

    dep = deployment_factory()
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2, manually=True)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')

    assert apply_ppr_and_delegate_to_marketplaces(
        dr,
        CBCService(),
        connect_client,
        dbsession,
        logger,
    )

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id == ppr2.id
    assert dr_m2.ppr_id == ppr2.id
    assert dep_m1.ppr_id == ppr2.id
    assert dep_m2.ppr_id == ppr2.id
    assert dep_m3.ppr_id == ppr.id

    assert get_from_media_mock.call_count == 0
    assert create_ppr_to_media_mock.call_count == 0
    assert check_cbc_task_status_mock.call_count == 0


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces_w_marketplace_not_present_in_mapping(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    configuration_factory,
    connect_client,
    mocker,
    logger,
):
    ppr_file_data = open('./tests/fixtures/test_PPR_apply_to_marketplaces.xlsx', 'rb').read()
    ppr_config_file_data = json.load(open('./tests/fixtures/test_PPR_config_file.json'))

    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [False] * 4,
    )
    file_sent = null

    def send_ppr_side_effect(*args):
        nonlocal file_sent
        _file = args[1]
        _file.seek(0)
        file_sent = _file.read()

    send_ppr_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._send_ppr',
        return_value=101,
        side_effect=send_ppr_side_effect,
    )
    get_config_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_configuration_from_media',
        return_value=ppr_config_file_data,
    )

    get_ppr_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )

    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    check_cbc_task_status_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._check_cbc_task_status',
    )

    cbc_service = CBCService()
    dep = deployment_factory()
    configuration_factory(deployment=dep.id)
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)
    marketplace_config_factory(deployment=dep, marketplace_id='MP-126')

    # Mapping marketplaces Connect => CBC
    #    "MP-123": "CO"
    #    "MP-124": "AT"
    #    "MP-125": "US"

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')
    dr_m3 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-126')

    assert apply_ppr_and_delegate_to_marketplaces(
        dr,
        cbc_service,
        connect_client,
        dbsession,
        logger,
    )

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dr_m3)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id == ppr2.id
    assert dr_m2.ppr_id == ppr2.id
    assert dr_m3.ppr_id is None
    assert dep_m1.ppr_id == ppr2.id
    assert dep_m2.ppr_id == ppr2.id
    assert dep_m3.ppr_id == ppr.id

    assert get_config_from_media_mock.call_count == 1
    assert get_ppr_from_media_mock.call_count == 1
    assert create_ppr_to_media_mock.call_count == 1
    assert send_ppr_mock.call_count == 1
    assert check_cbc_task_status_mock.call_count == 1

    assert send_ppr_mock.call_args.args[0] == cbc_service
    ppr_file_arg = send_ppr_mock.call_args.args[1]
    assert isinstance(ppr_file_arg, BufferedReader)
    assert check_excel_file_column_values(file_sent, 'OpUnitServicePlans', 'Published', [False] * 4)
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'Published', [False, True, False, True, True, True],
    )
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'OpUnit_CO', [True, True, True, False, False, False],
    )
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'OpUnit_AT', [True, True, True, False, False, False],
    )
    assert check_excel_file_column_values(
        file_sent, 'ServicePlans', 'OpUnit_US', [False] * 6,
    )


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces_config_file_not_found(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    configuration_factory,
    connect_client,
    mocker,
    logger,
):
    ppr_file_data = open('./tests/fixtures/test_PPR_apply_to_marketplaces.xlsx', 'rb').read()

    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [False] * 4,
    )

    response = Response()
    response.status_code = 404

    mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )
    get_config_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_configuration_from_media',
        side_effect=ClientError(response=response, message='Not found'),
    )

    cbc_service = CBCService()
    dep = deployment_factory()
    configuration_factory(deployment=dep.id)
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')

    with pytest.raises(TaskException):
        apply_ppr_and_delegate_to_marketplaces(dr, cbc_service, connect_client, dbsession, logger)

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id is None
    assert dr_m2.ppr_id is None
    assert dep_m1.ppr_id is None
    assert dep_m2.ppr_id == ppr.id
    assert dep_m3.ppr_id == ppr.id

    assert get_config_from_media_mock.call_count == 1


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces_ppr_file_not_found(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    configuration_factory,
    connect_client,
    mocker,
    logger,
):
    ppr_file_data = open('./tests/fixtures/test_PPR_apply_to_marketplaces.xlsx', 'rb').read()

    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [False] * 4,
    )

    response = Response()
    response.status_code = 404
    get_ppr_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        side_effect=ClientError(response=response, message='Not found'),
    )

    dep = deployment_factory()
    configuration_factory(deployment=dep.id)
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')

    with pytest.raises(TaskException):
        apply_ppr_and_delegate_to_marketplaces(dr, CBCService(), connect_client, dbsession, logger)

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id is None
    assert dr_m2.ppr_id is None
    assert dep_m1.ppr_id is None
    assert dep_m2.ppr_id == ppr.id
    assert dep_m3.ppr_id == ppr.id

    assert get_ppr_from_media_mock.call_count == 1


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces_error_saving_ppr(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    configuration_factory,
    connect_client,
    mocker,
    logger,
):
    ppr_file_data = open('./tests/fixtures/test_PPR_apply_to_marketplaces.xlsx', 'rb').read()
    ppr_config_file_data = json.load(open('./tests/fixtures/test_PPR_config_file.json'))

    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [False] * 4,
    )

    get_config_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_configuration_from_media',
        return_value=ppr_config_file_data,
    )

    get_ppr_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )
    response = Response()
    response.status_code = 404
    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
        side_effect=ClientError(response=response, message='Error on create DR file'),
    )

    dep = deployment_factory()
    configuration_factory(deployment=dep.id)
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')

    with pytest.raises(TaskException):
        apply_ppr_and_delegate_to_marketplaces(dr, CBCService(), connect_client, dbsession, logger)

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id is None
    assert dr_m2.ppr_id is None
    assert dep_m1.ppr_id is None
    assert dep_m2.ppr_id == ppr.id
    assert dep_m3.ppr_id == ppr.id

    assert get_config_from_media_mock.call_count == 1
    assert get_ppr_from_media_mock.call_count == 1
    assert create_ppr_to_media_mock.call_count == 1


@patch.object(CBCService, '__init__', return_value=None)
def test_apply_ppr_and_delegate_to_marketplaces_error_sending_ppr(
    _,
    dbsession,
    deployment_request_factory,
    deployment_factory,
    marketplace_config_factory,
    ppr_version_factory,
    configuration_factory,
    connect_client,
    mocker,
    logger,
):
    ppr_file_data = open('./tests/fixtures/test_PPR_apply_to_marketplaces.xlsx', 'rb').read()
    ppr_config_file_data = json.load(open('./tests/fixtures/test_PPR_config_file.json'))

    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [False] * 4,
    )

    get_config_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_configuration_from_media',
        return_value=ppr_config_file_data,
    )

    get_ppr_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )

    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    send_ppr_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._send_ppr',
        side_effect=TaskException(),
    )
    dep = deployment_factory()
    configuration_factory(deployment=dep.id)
    ppr = ppr_version_factory(deployment=dep)
    ppr2 = ppr_version_factory(deployment=dep)
    dr = deployment_request_factory(deployment=dep, ppr=ppr2)

    dep_m1 = marketplace_config_factory(deployment=dep, marketplace_id='MP-123')
    dep_m2 = marketplace_config_factory(deployment=dep, marketplace_id='MP-124', ppr_id=ppr.id)
    dep_m3 = marketplace_config_factory(deployment=dep, marketplace_id='MP-125', ppr_id=ppr.id)

    dr_m1 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-123')
    dr_m2 = marketplace_config_factory(deployment_request=dr, marketplace_id='MP-124')

    with pytest.raises(TaskException):
        apply_ppr_and_delegate_to_marketplaces(dr, CBCService(), connect_client, dbsession, logger)

    dbsession.refresh(dr_m1)
    dbsession.refresh(dr_m2)
    dbsession.refresh(dep_m1)
    dbsession.refresh(dep_m2)
    dbsession.refresh(dep_m3)

    assert dr_m1.ppr_id is None
    assert dr_m2.ppr_id is None
    assert dep_m1.ppr_id is None
    assert dep_m2.ppr_id == ppr.id
    assert dep_m3.ppr_id == ppr.id

    assert get_config_from_media_mock.call_count == 1
    assert get_ppr_from_media_mock.call_count == 1
    assert create_ppr_to_media_mock.call_count == 1
    assert send_ppr_mock.call_count == 1


def test__send_ppr(parse_ppr_success_response, sample_ppr_file, mocker):
    cbc_service = mocker.Mock()
    cbc_service.parse_ppr.return_value = parse_ppr_success_response
    cbc_service.apply_ppr.return_value = 100
    assert _send_ppr(cbc_service, sample_ppr_file)


def test__send_ppr_max_retries(sample_ppr_file, mocker):
    cbc_service = mocker.Mock()
    cbc_service.parse_ppr.side_effect = CBCClientError('Some random error')
    with pytest.raises(TaskException) as ex:
        _send_ppr(cbc_service, sample_ppr_file)
        assert str(ex) == 'Some random error'


def test__check_cbc_task_status(task_logs_response, mocker):
    not_started_log = copy.deepcopy(task_logs_response)
    not_started_log[0]['status'] = CBCTaskLogStatus.not_started
    cbc_service = mocker.Mock()
    cbc_service.search_task_logs_by_name.side_effect = [
        not_started_log,
        task_logs_response,
    ]
    with mocker.patch('connect_ext_ppr.tasks_manager.time.sleep', return_value=None):
        assert _check_cbc_task_status(cbc_service, 100)


def test__check_cbc_task_status_with_max_retries(task_logs_response, mocker):
    not_started_log = copy.deepcopy(task_logs_response)
    not_started_log[0]['status'] = CBCTaskLogStatus.not_started
    cbc_service = mocker.Mock()
    cbc_service.search_task_logs_by_name.side_effect = CBCClientError('Some random error')
    with mocker.patch('connect_ext_ppr.tasks_manager.time.sleep', return_value=None):
        with pytest.raises(TaskException) as ex:
            _check_cbc_task_status(cbc_service, 100)
            assert str(ex) == 'Some random error'


@patch.object(CBCService, 'update_product')
@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__')
def test_check_and_update_product(
    mock___init__,
    mock_get_product_details,
    mock_update_product,
    product_details,
    update_product_response,
    deployment_request_factory,
):

    mock___init__.return_value = None
    product_details['isUpdateAvailable'] = True
    mock_get_product_details.return_value = product_details
    mock_update_product.return_value = update_product_response

    assert check_and_update_product(
        deployment_request=deployment_request_factory(), cbc_service=CBCService(),
    )
    assert mock_get_product_details.call_count == 1
    assert mock_update_product.call_count == 1


@patch.object(CBCService, 'update_product')
@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__')
def test_check_and_update_product_no_update_needed(
    mock___init__,
    mock_get_product_details,
    mock_update_product,
    product_details,
    update_product_response,
    deployment_request_factory,
):

    mock___init__.return_value = None
    product_details['isUpdateAvailable'] = False
    mock_get_product_details.return_value = product_details
    mock_update_product.return_value = update_product_response

    assert check_and_update_product(
        deployment_request=deployment_request_factory(), cbc_service=CBCService(),
    )
    assert mock_get_product_details.call_count == 1
    assert mock_update_product.call_count == 0


@patch.object(CBCService, 'update_product')
@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__')
def test_check_and_update_product_manually(
    mock___init__,
    mock_get_product_details,
    mock_update_product,
    product_details,
    update_product_response,
    deployment_request_factory,
):

    mock___init__.return_value = None
    product_details['isUpdateAvailable'] = True
    mock_get_product_details.return_value = product_details
    mock_update_product.return_value = update_product_response

    assert check_and_update_product(
        deployment_request=deployment_request_factory(manually=True), cbc_service=CBCService(),
    )

    assert mock_get_product_details.call_count == 0
    assert mock_update_product.call_count == 0


@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__')
def test_check_and_update_product_w_errors_in_get_details(
    mock___init__,
    mock_get_product_details,
    get_product_details_not_found_response,
    deployment_request_factory,
):
    mock___init__.return_value = None
    mock_get_product_details.return_value = get_product_details_not_found_response

    with pytest.raises(Exception):
        check_and_update_product(
            deployment_request=deployment_request_factory(), cbc_service=CBCService(),
        )


@patch.object(CBCService, 'update_product')
@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__')
def test_check_and_update_product_w_errors_in_update_product(
    mock___init__,
    mock_get_product_details,
    mock_update_product,
    product_details,
    product_not_installed_response,
    deployment_request_factory,
):
    mock___init__.return_value = None
    product_details['isUpdateAvailable'] = True
    mock_get_product_details.return_value = product_details
    mock_update_product.return_value = product_not_installed_response

    with pytest.raises(Exception):
        check_and_update_product(
            deployment_request=deployment_request_factory(), cbc_service=CBCService(),
        )


@patch.object(CBCService, '__init__')
def test_delegate_to_l2(
    mock___init__,
    connect_client,
    deployment_request_factory,
    mocker,
    logger,
):
    mock___init__.return_value = None
    cbc_sevice = CBCService()
    ppr_file_data = open('./tests/fixtures/test_PPR_file_delegate_l2.xlsx', 'rb').read()
    assert not check_excel_file_column_values(
        ppr_file_data, 'OpUnitServicePlans', 'Published', [True] * 6,
    )
    assert not check_excel_file_column_values(
        ppr_file_data, 'ServicePlans', 'Published', [False] * 6,
    )

    file_sent = null

    def send_ppr_side_effect(*args):
        nonlocal file_sent
        _file = args[1]
        _file.seek(0)
        file_sent = _file.read()

    send_ppr_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._send_ppr',
        return_value=101,
        side_effect=send_ppr_side_effect,
    )

    get_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )
    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    check_cbc_task_status_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._check_cbc_task_status',
    )

    assert delegate_to_l2(
        deployment_request=deployment_request_factory(),
        cbc_service=cbc_sevice,
        connect_client=connect_client,
        logger=logger,
    )

    assert get_from_media_mock.call_count == 1
    assert create_ppr_to_media_mock.call_count == 1
    assert send_ppr_mock.call_count == 1
    assert check_cbc_task_status_mock.call_count == 1

    assert send_ppr_mock.call_args.args[0] == cbc_sevice
    ppr_file_arg = send_ppr_mock.call_args.args[1]
    assert isinstance(ppr_file_arg, BufferedReader)
    assert check_excel_file_column_values(file_sent, 'OpUnitServicePlans', 'Published', [True] * 6)
    assert check_excel_file_column_values(file_sent, 'ServicePlans', 'Published', [True] * 6)


@patch.object(CBCService, '__init__')
def test_delegate_to_l2_manually(
    mock___init__,
    connect_client,
    deployment_request_factory,
    mocker,
    logger,
):
    mock___init__.return_value = None
    cbc_sevice = CBCService()

    send_ppr_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._send_ppr',
    )
    get_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
    )
    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    check_cbc_task_status_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._check_cbc_task_status',
    )

    assert delegate_to_l2(
        deployment_request=deployment_request_factory(manually=True),
        cbc_service=cbc_sevice,
        connect_client=connect_client,
        logger=logger,
    )

    assert get_from_media_mock.call_count == 0
    assert create_ppr_to_media_mock.call_count == 0
    assert send_ppr_mock.call_count == 0
    assert check_cbc_task_status_mock.call_count == 0


@patch.object(CBCService, '__init__')
def test_delegate_to_l2_processing_error(
    mock___init__,
    connect_client,
    deployment_request_factory,
    mocker,
    logger,
):
    mock___init__.return_value = None
    cbc_sevice = CBCService()
    ppr_file_data = open('./tests/fixtures/test_PPR_file_delegate_l2.xlsx', 'rb').read()

    send_ppr_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._send_ppr',
        return_value=101,
    )
    get_from_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.get_ppr_from_media',
        return_value=ppr_file_data,
    )
    process_ppr_file_for_delelegate_l2_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.process_ppr_file_for_delegate_l2',
        side_effect=ValueError('Wrong value "Cthulhu"'),
    )
    create_ppr_to_media_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.create_ppr_to_media',
    )
    check_cbc_task_status_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager._check_cbc_task_status',
    )

    with pytest.raises(TaskException) as e:
        delegate_to_l2(
            deployment_request=deployment_request_factory(),
            cbc_service=cbc_sevice,
            connect_client=connect_client,
            logger=logger,
        )
    assert str(e.value) == 'Error while processing PPR file: Wrong value "Cthulhu"'

    assert get_from_media_mock.call_count == 1
    assert process_ppr_file_for_delelegate_l2_mock.call_count == 1
    assert create_ppr_to_media_mock.call_count == 0
    assert send_ppr_mock.call_count == 0
    assert check_cbc_task_status_mock.call_count == 0


@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__', return_value=None)
def test_main_process(
    _,
    mock_get_product_details,
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
    connect_client,
    mock_tasks,
    mocker,
    product_details,
    logger,
):
    mock_get_product_details.return_value = product_details
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.product_setup)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)

    mocker.patch('connect_ext_ppr.tasks_manager._get_cbc_service', return_value=CBCService())
    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.done

    assert dbsession.query(Deployment).filter_by(status=DeploymentStatusChoices.synced).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.done,
    ).count() == 1
    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.done,
        Task.started_at.is_not(null()),
        Task.finished_at.is_not(null()),
    ).count() == 3


@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__', return_value=None)
def test_main_process_wo_l2_delegation(
    _,
    mock_get_product_details,
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
    connect_client,
    mock_tasks,
    mocker,
    product_details,
    logger,
):
    mock_get_product_details.return_value = product_details
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep)
    dr = deployment_request_factory(deployment=dep, delegate_l2=False, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.product_setup)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)

    mocker.patch('connect_ext_ppr.tasks_manager._get_cbc_service', return_value=CBCService())
    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.done

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


@patch.object(CBCService, 'get_product_details')
@patch.object(CBCService, '__init__', return_value=None)
def test_main_process_deployment_w_new_ppr_version(
    _,
    mock_get_product_details,
    dbsession,
    file_factory,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
    connect_client,
    mock_tasks,
    mocker,
    product_details,
    logger,
):
    mock_get_product_details.return_value = product_details
    ppr_file = file_factory(id='MFL-123')
    dep = deployment_factory()
    dr_ppr = ppr_version_factory(
        id='PPR-1234', file=ppr_file.id, product_version=1, deployment=dep)
    ppr_version_factory(id='PPR-123', product_version=2, deployment=dep)
    dr = deployment_request_factory(deployment=dep, delegate_l2=False, ppr=dr_ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.product_setup)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)

    mocker.patch('connect_ext_ppr.tasks_manager._get_cbc_service', return_value=CBCService())
    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.done

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


@patch.object(CBCService, '__init__', return_value=None)
@pytest.mark.parametrize(
    ('type_function_to_mock', 'done_tasks', 'tasks_w_errors', 'pending_tasks'),
    (
        (TaskTypesChoices.product_setup, 0, 1, 2),
        (TaskTypesChoices.apply_and_delegate, 1, 1, 1),
        (TaskTypesChoices.delegate_to_l2, 2, 1, 0),
    ),
)
def test_main_process_ends_w_error(
    _,
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
    connect_client,
    logger,
):
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep, version=1)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.product_setup)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)

    my_mock = mocker.Mock()

    def mock_get(key):
        print(key, ' :', key != type_function_to_mock)
        return lambda **kwargs: key != type_function_to_mock
    my_mock.get = mock_get

    mocker.patch('connect_ext_ppr.tasks_manager._get_cbc_service', return_value=CBCService())
    mocker.patch('connect_ext_ppr.tasks_manager.TASK_PER_TYPE', my_mock)
    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.error

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


def test_main_process_wo_hub_credentials(
    deployment_factory,
    deployment_request_factory,
    ppr_version_factory,
    task_factory,
    connect_client,
    mocker,
    logger,
):
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep, version=1)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True, ppr=ppr)
    task = task_factory(
        deployment_request=dr, task_index='0001', type=TaskTypesChoices.product_setup,
    )
    mocker.patch('connect_ext_ppr.client.utils.get_hub_credentials', return_value=None)
    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.error

    assert task.status == TasksStatusChoices.error
    assert task.error_message == 'Hub Credentials not found for Hub ID HB-0000-0000.'


@patch.object(CBCService, '__init__', return_value=None)
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
def test_main_process_w_aborted_tasks(
    _,
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
    task_statuses,
    done_tasks,
    aborted_tasks,
    connect_client,
    mock_tasks,
    mocker,
    logger,
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
        type=TaskTypesChoices.product_setup,
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
    mocker.patch('connect_ext_ppr.tasks_manager._get_cbc_service', return_value=CBCService())

    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.aborted

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


@patch.object(CBCService, '__init__', return_value=None)
def test_main_process_w_aborted_deployment_request(
    _,
    dbsession,
    deployment_factory,
    deployment_request_factory,
    task_factory,
    ppr_version_factory,
    connect_client,
    mock_tasks,
    logger,
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
        type=TaskTypesChoices.product_setup,
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

    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.aborted

    assert dbsession.query(Deployment).filter_by(
        status=DeploymentStatusChoices.pending,
    ).count() == 1
    assert dbsession.query(DeploymentRequest).filter_by(
        status=DeploymentRequestStatusChoices.aborted,
    ).count() == 1

    assert dbsession.query(Task).filter(
        Task.status == TasksStatusChoices.aborted,
    ).count() == 3


@patch.object(CBCService, '__init__', return_value=None)
@pytest.mark.parametrize(
    ('type_function_to_mock', 'done_tasks', 'tasks_w_errors', 'pending_tasks'),
    (
        (TaskTypesChoices.product_setup, 0, 1, 2),
        (TaskTypesChoices.apply_and_delegate, 1, 1, 1),
        (TaskTypesChoices.delegate_to_l2, 2, 1, 0),
    ),
)
def test_main_process_ends_w_task_exception(
    _,
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
    connect_client,
    logger,
):
    dep = deployment_factory()
    ppr = ppr_version_factory(id='PPR-123', product_version=1, deployment=dep, version=1)
    dr = deployment_request_factory(deployment=dep, delegate_l2=True, ppr=ppr)
    task_factory(deployment_request=dr, task_index='0001', type=TaskTypesChoices.product_setup)
    task_factory(deployment_request=dr, task_index='0002', type=TaskTypesChoices.apply_and_delegate)
    task_factory(deployment_request=dr, task_index='0003', type=TaskTypesChoices.delegate_to_l2)

    my_mock = mocker.Mock()

    def mock_get(key):
        if key == type_function_to_mock:
            raise Exception('Unexpected Error')
        return lambda **kwargs: True

    my_mock.get = mock_get

    mocker.patch('connect_ext_ppr.tasks_manager.TASK_PER_TYPE', my_mock)
    mocker.patch('connect_ext_ppr.tasks_manager._get_cbc_service', return_value=CBCService())
    assert main_process(dr.id, {}, connect_client, logger) == DeploymentRequestStatusChoices.error

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


def test_validate_pricelists_task_ok(
    deployment_factory,
    deployment_request_factory,
    marketplace_config_factory,
    mocker,
):
    validate_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.validate_pricelist_batch',
    )

    dep = deployment_factory()
    dep_req = deployment_request_factory(deployment=dep)

    marketplace_config_factory(
        deployment=dep, marketplace_id='MP-1', pricelist_id='BAT-1',
    )
    marketplace_config_factory(
        deployment=dep, marketplace_id='MP-2', pricelist_id=None,
    )
    marketplace_config_factory(
        deployment=dep, marketplace_id='MP-3', pricelist_id='BAT-OLD',
    )
    marketplace_config_factory(
        deployment=dep, marketplace_id='MP-4', pricelist_id=None,
    )

    # already applied. skip
    marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-1', pricelist_id='BAT-1',
    )
    # price list is not set. skip
    marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-2', pricelist_id=None,
    )
    marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-3', pricelist_id='BAT-3',
    )
    marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-4', pricelist_id='BAT-4',
    )

    validate_pricelists_task(dep_req, mocker.MagicMock())

    assert validate_mock.call_count == 2
    assert {
        validate_mock.call_args_list[0][0][1],
        validate_mock.call_args_list[1][0][1],
    } == {'BAT-3', 'BAT-4'}


def test_validate_pricelists_task_validation_failed(
    deployment_factory,
    deployment_request_factory,
    marketplace_config_factory,
    mocker,
):
    validate_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.validate_pricelist_batch',
        side_effect=ClientError(message='Not valid.', status_code='VAL-001'),
    )

    dep = deployment_factory()
    dep_req = deployment_request_factory(deployment=dep)

    marketplace_config_factory(
        deployment=dep, marketplace_id='MP-3', pricelist_id='BAT-OLD',
    )
    marketplace_config_factory(
        deployment=dep, marketplace_id='MP-4', pricelist_id=None,
    )

    marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-3', pricelist_id='BAT-3',
    )
    marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-4', pricelist_id='BAT-4',
    )

    with pytest.raises(TaskException) as e:
        validate_pricelists_task(dep_req, mocker.MagicMock())

    assert str(e.value) == (
        'Price list BAT-3 of marketplace MP-3 validation failed: Not valid.'
    )

    assert validate_mock.call_count == 1


def test_apply_pricelist_task_ok(
    deployment_factory,
    deployment_request_factory,
    marketplace_config_factory,
    mocker,
    dbsession,
    logger,
):
    apply_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.apply_pricelist_to_marketplace',
    )

    dep = deployment_factory()
    dep_req = deployment_request_factory(deployment=dep)

    dep_mp = marketplace_config_factory(
        deployment=dep, marketplace_id='MP-1', pricelist_id='BAT-0',
    )
    req_mp = marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-1', pricelist_id='BAT-1',
    )

    cbc_service = mocker.MagicMock()
    connect_client = mocker.MagicMock()

    apply_pricelist_task(
        dep_req,
        cbc_service,
        connect_client,
        req_mp,
        dbsession,
        logger=logger,
    )

    assert apply_mock.called_once_with(
        dep_req,
        cbc_service,
        connect_client,
        req_mp,
    )

    dbsession.refresh(dep_mp)

    assert dep_mp.pricelist_id == req_mp.pricelist_id


def test_apply_pricelist_task_ok_manual(
    deployment_factory,
    deployment_request_factory,
    marketplace_config_factory,
    mocker,
    dbsession,
    logger,
):
    apply_mock = mocker.patch(
        'connect_ext_ppr.tasks_manager.apply_pricelist_to_marketplace',
    )

    dep = deployment_factory()
    dep_req = deployment_request_factory(deployment=dep, manually=True)

    dep_mp = marketplace_config_factory(
        deployment=dep, marketplace_id='MP-1', pricelist_id='BAT-0',
    )
    req_mp = marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-1', pricelist_id='BAT-1',
    )

    cbc_service = mocker.MagicMock()
    connect_client = mocker.MagicMock()

    apply_pricelist_task(
        dep_req,
        cbc_service,
        connect_client,
        req_mp,
        dbsession,
        logger,
    )

    assert apply_mock.call_count == 0
    assert dep_mp.pricelist_id == req_mp.pricelist_id


def test_apply_pricelist_task_error(
    deployment_factory,
    deployment_request_factory,
    marketplace_config_factory,
    mocker,
    dbsession,
    logger,
):
    mocker.patch(
        'connect_ext_ppr.tasks_manager.apply_pricelist_to_marketplace',
        side_effect=ClientError(
            message='olala',
            status_code='VAL-1',
        ),
    )

    dep = deployment_factory()
    dep_req = deployment_request_factory(deployment=dep)

    dep_mp = marketplace_config_factory(
        deployment=dep, marketplace_id='MP-1', pricelist_id='BAT-0',
    )
    req_mp = marketplace_config_factory(
        deployment_request=dep_req, marketplace_id='MP-1', pricelist_id='BAT-1',
    )

    cbc_service = mocker.MagicMock()
    connect_client = mocker.MagicMock()

    with pytest.raises(TaskException) as e:
        apply_pricelist_task(
            dep_req,
            cbc_service,
            connect_client,
            req_mp,
            dbsession,
            logger,
        )

    assert str(e.value) == 'Error while processing pricelist: olala'
    assert dep_mp.pricelist_id == 'BAT-0'
