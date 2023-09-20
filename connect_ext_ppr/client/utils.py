from connect_ext_ppr.services.cbc_extension import get_hub_credentials
from connect_ext_ppr.services.cbc_hub import CBCService
from connect_ext_ppr.errors import ExtensionHttpError


def get_cbc_service(hub_id, cbc_db, verify_certificate=False):
    hub_credentials = get_hub_credentials(hub_id, cbc_db)
    if not hub_credentials:
        raise ExtensionHttpError.EXT_012(format_kwargs={'hub_id': hub_id})

    return CBCService(hub_credentials, verify_certificate)
