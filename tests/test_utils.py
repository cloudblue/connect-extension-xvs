import pytest
from connect.client import ClientError
from connect.client.rql import R

from connect_ext_ppr.utils import _process_exc, get_all_info


def test_process_exc():
    ex = ClientError(message='Some')
    new_exc = _process_exc(ex)
    assert new_exc.error_code == 'EXT_000'
    assert str(new_exc) == str(ex)


def test_fail_get_all_info_exc(mocker, connect_client):
    mocker.patch(
        'connect_ext_ppr.utils.get_marketplaces',
        side_effect=ClientError(),
    )
    with pytest.raises(ClientError) as ex:
        get_all_info(connect_client)
    assert 'Unexpected error: EXT_000 - Unexpected error' in str(ex.value)


def test_get_all_info_success(
        connect_client,
        client_mocker_factory,
        marketplace,
        listing,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.listings.filter(R().status.eq("listed")).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(R().id.in_([marketplace['id']])).mock(
        return_value=[marketplace],
    )
    all_info = get_all_info(connect_client)
    listing['contract']['marketplace'] = marketplace
    assert all_info[0] == listing
