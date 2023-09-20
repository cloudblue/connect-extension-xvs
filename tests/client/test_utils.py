from unittest.mock import patch

import pytest

from connect_ext_ppr.errors import ClientError
from connect_ext_ppr.client.utils import CBCService
from connect_ext_ppr.client.utils import get_cbc_service


@patch.object(CBCService, '__init__', return_value=None)
@patch('connect_ext_ppr.client.utils.get_hub_credentials')
def test_get_cbc_service_ok(
    mock_hub_cred,
    mock_service,
    cbc_db_session,
):
    service = get_cbc_service('HUB-0', cbc_db_session, True)

    assert isinstance(service, CBCService)
    assert mock_hub_cred.called_once_with('HUB-0', cbc_db_session)


@patch.object(CBCService, '__init__', return_value=None)
@patch('connect_ext_ppr.client.utils.get_hub_credentials', return_value=None)
def test_get_cbc_service_failed(
    mock_hub_cred,
    mock_service,
    cbc_db_session,
):
    with pytest.raises(ClientError) as e:
        get_cbc_service('HUB-0', cbc_db_session, True)

    assert e.value.message == 'Hub Credentials not found for Hub ID HUB-0.'
