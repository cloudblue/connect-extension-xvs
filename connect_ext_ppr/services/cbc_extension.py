from connect_ext_ppr.models.cbc_extenstion import HubCredential

from sqlalchemy import text


HUB_CREDENTIAL_QUERY = '''
SELECT DISTINCT h.hub_id,
    g.app_instance_id,
    h.controller_uri,
    c.oauth_key,
    c.oauth_secret
FROM hub_instances h
INNER JOIN global_app_configuration g ON g.hub_uuid = h.extension_resource_uid
INNER JOIN configuration c ON c.product_id = g.hub_uuid
WHERE h.hub_id = :hub_id
'''


def get_hub_credentials(hub_id, db):

    query = text(HUB_CREDENTIAL_QUERY)

    query = query.columns(
        HubCredential.hub_id,
        HubCredential.app_id,
        HubCredential.controller_url,
        HubCredential.oauth_key,
        HubCredential.oauth_secret,
    )

    return db.query(
        HubCredential,
    ).from_statement(
        query,
    ).params(
        hub_id=hub_id,
    ).first()
