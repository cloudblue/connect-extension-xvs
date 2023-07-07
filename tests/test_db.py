from connect_ext_ppr.db import get_db, get_db_ctx_manager, VerboseBaseSession


def test_get_db(engine):
    db = next(get_db(engine))
    assert isinstance(db, VerboseBaseSession)
    assert db.connection().connect()


def test_get_db_ctx_manager(mocker, engine):
    mocker.patch(
        'connect_ext_ppr.db.get_engine',
        return_value=engine,
    )
    with get_db_ctx_manager({}) as db:
        assert isinstance(db, VerboseBaseSession)
        assert db.connection().connect()
