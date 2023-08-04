import pytest
from sqlalchemy.exc import StatementError

from connect_ext_ppr.models.file import File
from connect_ext_ppr.models.enums import MimeTypeChoices


def test_create_file(dbsession, media_response):
    file = File(
        id=media_response['id'],
        account_id=media_response['owner']['id'],
        location=media_response['file'],
        name=media_response['name'],
        size=media_response['size'],
        mime_type=media_response['mime_type'],
        created_by=media_response['events']['created']['by']['id'],
    )
    dbsession.add(file)
    dbsession.commit()
    dbsession.refresh(file)

    assert file.id == media_response['id']
    assert file.mime_type in list(MimeTypeChoices)


def test_file_mime_type_not_allowed(dbsession, media_response):
    file = File(
        id=media_response['id'],
        account_id=media_response['owner']['id'],
        location=media_response['file'],
        name=media_response['name'],
        size=media_response['size'],
        mime_type='Application/vnd.apple.mpegurl',
        created_by=media_response['events']['created']['by']['id'],
    )
    with pytest.raises(StatementError) as ex:
        dbsession.add(file)
        dbsession.commit()
    assert str(ex.value).startswith(
        "(builtins.LookupError) 'Application/vnd.apple.mpegurl'"
        " is not among the defined enum values",
    )
