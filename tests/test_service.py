from connect_ext_ppr.models.deployment import Deployment
from connect_ext_ppr.service import add_deployments


def test_add_deplyoments(
        dbsession,
        listing,
        marketplace,
        installation,
        logger,
):

    hub_id = 'HB-1111-2222'
    listing['contract']['marketplace'] = marketplace
    listing['contract']['marketplace']['hubs'][0]['hub']['id'] = hub_id

    add_deployments(installation, [listing], {}, logger)
    new_dep = dbsession.query(Deployment).filter_by(hub_id=hub_id).first()

    assert new_dep is not None


def test_nothing_to_create(
        dbsession,
        listing,
        marketplace,
        installation,
        logger,
        deployment,
):
    hub = {'hub': {'id': deployment.hub_id, 'name': 'Some'}}
    listing['contract']['marketplace'] = marketplace
    listing['product']['id'] = deployment.product_id
    listing['contract']['marketplace']['hubs'] = [hub]

    count_before = dbsession.query(Deployment).count()
    add_deployments(installation, [listing], {}, logger)
    count_after = dbsession.query(Deployment).count()

    assert count_before == 1
    assert count_before == count_after
