import pytest

from connect_ext_ppr.models.ppr import PPRVersion


@pytest.mark.parametrize(
    'status',
    PPRVersion.status.type.python_type,

)
def test_create_ppr(dbsession, file, deployment, status):

    ppr = PPRVersion(
        file=file.id,
        deployment=deployment.id,
        summary={},
        description='Some',
        created_by='SU-295-689-628',
        status=status,
    )

    dbsession.set_verbose(ppr)
    dbsession.commit()
    dbsession.refresh(ppr)
    assert ppr.status == status
    assert ppr.version == 1
    assert ppr.id.startswith(PPRVersion.PREFIX)


def test_multiple_versions(dbsession, file, deployment_factory):
    dep_1 = deployment_factory(dbsession, product_id='PRD-111-222-333')
    dep_2 = deployment_factory(dbsession, product_id='PRD-111-222-444')

    for version in range(1, 4):
        for dep in (dep_1, dep_2):
            ppr = PPRVersion(
                file=file.id,
                deployment=dep.id,
                summary={},
                description='Some',
                created_by='SU-295-689-628',
            )

            dbsession.set_verbose(ppr)
            dbsession.commit()
            dbsession.refresh(ppr)
            assert ppr.status == 'pending'
            assert ppr.version == version
            assert ppr.id.startswith(PPRVersion.PREFIX)
