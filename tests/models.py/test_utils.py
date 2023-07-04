from connect_ext_ppr.models.deployment import Deployment
from connect_ext_ppr.models.utils import add_deployments


def test_add_deplyoments(
        dbsession,
        mocker,
        listing,
        marketplace,
        installation,
        logger,
):

    hub_id = 'HB-1111-2222'
    listing['contract']['marketplace'] = marketplace
    listing['contract']['marketplace']['hubs'][0]['id'] = hub_id

    add_deployments(installation, [listing], {}, logger)
    new_dep = dbsession.query(Deployment).filter_by(hub_id=hub_id).first()

    assert new_dep is None
