import pytest

from connect_ext_ppr.models.configuration import Configuration


def test_create_configuration(dbsession, file, deployment):

    conf = Configuration(
        file=file.id,
        deployment=deployment.id,
        created_by='SU-295-689-628',
        updated_by='SU-295-689-628',
    )
    dbsession.set_verbose(conf)
    dbsession.commit()
    dbsession.refresh(conf)
    assert conf.state == 'inactive'
    assert conf.id.startswith(Configuration.PREFIX)


@pytest.mark.parametrize(
    'state,method',
    (('active', 'activate'), ('deleted', 'deleted')),
)
def test_activate_delete_configuration(
    dbsession,
    deployment,
    file,
    state,
    method,
):

    conf = Configuration(
        deployment=deployment.id,
        file=file.id,
        created_by='SU-295-689-628',
        updated_by='SU-295-689-628',
    )
    dbsession.set_verbose(conf)
    dbsession.commit()
    dbsession.refresh(conf)
    getattr(conf, method)()
    dbsession.commit()
    dbsession.refresh(conf)
    assert conf.state == state
