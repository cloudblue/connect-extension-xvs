from unittest import TestCase
from unittest.mock import patch

from connect_ext_ppr.client.exception import ClientError


@patch('connect_ext_ppr.webapp.get_deployment_by_id')
@patch('connect_ext_ppr.webapp.fetch_and_validate_batch')
@patch('connect_ext_ppr.webapp.identify_reseller_id', return_value='1000001')
@patch('connect_ext_ppr.webapp.prepare_file', return_value=('File.xlsx', {}))
@patch('connect_ext_ppr.webapp.process_batch', return_value=1)
def test_process_pricing_batch_positive(
    mock_process_batch,
    mock_prepare_file,
    mock_identify_reseller_id,
    mock_fetch_and_validate_batch,
    mock_get_deployment_by_id,
    api_client,
    deployment,
    installation,
    batch,
):
    mock_get_deployment_by_id.return_value = deployment
    mock_fetch_and_validate_batch.return_value = batch

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pricing/batches/BT-000-000-000/process',
        installation=installation,
    )

    assert response.status_code == 202
    TestCase().assertDictEqual(
        response.json(),
        {'task_info': '/flat-catalog/price-import-wizard/1/set-prices'},
    )


@patch('connect_ext_ppr.webapp.get_deployment_by_id')
@patch('connect_ext_ppr.webapp.fetch_and_validate_batch')
def test_process_pricing_batch_negative(
    mock_fetch_and_validate_batch,
    mock_get_deployment_by_id,
    api_client,
    deployment,
    installation,
    batch,
):
    mock_get_deployment_by_id.return_value = deployment
    mock_fetch_and_validate_batch.side_effect = ClientError(
        'Unexpected error during batch validation.')

    response = api_client.post(
        f'/api/deployments/{deployment.id}/pricing/batches/BT-000-000-000/process',
        installation=installation,
    )

    assert response.status_code == 400
