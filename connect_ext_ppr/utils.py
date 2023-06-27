from contextlib import contextmanager

from connect.client.rql import R

from connect_ext_ppr.db import get_engine, SessionLocal


@contextmanager
def get_db_for_events(config):
    engine = get_engine(config)
    db = SessionLocal(bind=engine)
    try:
        yield db
    finally:
        db.close()


def get_products(client):
    rql = R().visibility.listing.eq(True)
    rql |= R().visibility.syndication.eq(True)
    return client.products.filter(rql)
