from connect_ext_ppr.services.cbc_extension import get_hub_credentials


def test_get_hub_credentials(cbc_db_session, logger):
    hub_id = 'HB-000-000'
    hub_credentials = get_hub_credentials(hub_id, cbc_db_session)

    assert hub_credentials


def test_get_hub_credentials_none(cbc_db_session, logger):
    hub_id = 'HB-000-001'
    hub_credentials = get_hub_credentials(hub_id, cbc_db_session)

    assert not hub_credentials
