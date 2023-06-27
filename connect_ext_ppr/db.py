import os

from connect.eaas.core.inject.common import get_config
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.engine.base import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

_ENGINE = None
SessionLocal = sessionmaker(autocommit=False, autoflush=False)
Model = declarative_base()


def get_engine(config: dict = Depends(get_config)):
    global _ENGINE
    if not _ENGINE:
        _ENGINE = create_engine(
            config.get(
                'DATABASE_URL',
                os.getenv('DATABASE_URL', 'postgresql+psycopg2://postgres:1q2w3e@db/extension_xvs'),
            ),
            pool_pre_ping=True,
            pool_recycle=300,
        )

    return _ENGINE


def get_db(engine: Engine = Depends(get_engine)):
    db = SessionLocal(bind=engine)
    try:
        yield db
    finally:
        db.close()


def create_database(config: dict = Depends(get_config)):
    Model.metadata.create_all(bind=get_engine(config))
