import copy
import json

from sqlalchemy import null
from connect.client import ClientError
import pytest

from connect_ext_ppr.models.deployment import Deployment, MarketplaceConfiguration
from connect_ext_ppr.models.file import File
from connect_ext_ppr.schemas import FileSchema, PPRVersionCreateSchema
from connect_ext_ppr.service import add_deployments, create_ppr, get_ppr_new_version


def test_add_one_deployments(
    dbsession,
    listing,
    marketplace,
    product,
    installation,
    logger,
):

    hub_id = 'HB-1111-2222'
    listing['contract']['marketplace'] = marketplace
    listing['contract']['marketplace']['hubs'][0]['hub']['id'] = hub_id
    listing['product'] = product

    add_deployments(installation, [listing], {}, logger)
    new_dep = dbsession.query(Deployment).filter_by(hub_id=hub_id).first()

    assert new_dep is not None


def test_add_mutiples_deployments(
    dbsession,
    listing,
    marketplace,
    product,
    installation,
    logger,
):
    mkplc_husb = []
    hub_id = 'HB-1111-2222'
    listing['contract']['marketplace'] = marketplace
    listing['contract']['marketplace']['hubs'][0]['hub']['id'] = hub_id
    listing['product'] = product

    for hub in marketplace['hubs']:
        mkplc_husb.append((marketplace['id'], hub['hub']['id']))

    listing2 = copy.deepcopy(listing)
    listing2['contract']['marketplace']['id'] = 'MP-1234'
    listing2['contract']['marketplace']['hubs'][0]['hub']['id'] = 'HB-1234-1234'

    for hub in listing2['contract']['marketplace']['hubs']:
        mkplc_husb.append((listing2['contract']['marketplace']['id'], hub['hub']['id']))

    add_deployments(installation, [listing, listing2], {}, logger)
    assert dbsession.query(Deployment).count() == 3
    assert dbsession.query(MarketplaceConfiguration).count() == 4

    for marketplace_id, hub_id in mkplc_husb:
        new_dep = dbsession.query(Deployment).filter_by(hub_id=hub_id).first()
        assert new_dep is not None
        assert dbsession.query(MarketplaceConfiguration).filter_by(
            deployment_id=new_dep.id,
            marketplace=marketplace_id,
        ).filter(MarketplaceConfiguration.id.is_not(null())).count() == 1


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
    listing['product']['id'] = deployment.product.id
    listing['contract']['marketplace']['hubs'] = [hub]

    count_before = dbsession.query(Deployment).count()
    add_deployments(installation, [listing], {}, logger)
    count_after = dbsession.query(Deployment).count()

    assert count_before == 1
    assert count_before == count_after


def test_get_ppr_new_version(
        dbsession, ppr_version_factory, deployment_factory, file_factory,
):
    dep = deployment_factory()
    ppr_file = file_factory(
        id='MFL-XXX',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    ppr_version = ppr_version_factory(file=ppr_file.id, deployment=dep)

    previous_version = ppr_version.version

    new_version = get_ppr_new_version(dbsession, dep)

    assert new_version != previous_version
    assert previous_version + 1 == new_version


def test_create_ppr_base_on_user_uploaded_file(
    dbsession, common_context, deployment_factory, connect_client, logger,
    client_mocker_factory, file, bytes_ppr_workbook_factory,
):
    deployment = deployment_factory()
    file_data = FileSchema(
        id='MFL-0000-0000-0000',
        name=file.name,
        location=file.location,
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size=file.size,
    )
    ppr_data = PPRVersionCreateSchema(file=file_data)

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    bytes_ppr_workbook = bytes_ppr_workbook_factory()
    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    )[file_data.id].get(
        return_value=bytes_ppr_workbook,
    )

    new_ppr, _, _ = create_ppr(
        ppr_data, common_context.user_id, deployment, dbsession, connect_client, logger,
    )

    assert new_ppr.id
    assert new_ppr.summary == {}
    assert new_ppr.file == file_data.id
    assert new_ppr.version == 1
    assert new_ppr.status == 'ready'
    assert new_ppr.configuration is None


def test_create_ppr_base_on_user_uploaded_file_with_errors(
    dbsession, common_context, deployment_factory, connect_client, logger,
    client_mocker_factory, file, bytes_ppr_workbook_factory,
):
    deployment = deployment_factory()
    file_data = FileSchema(
        id='MFL-0000-0000-0000',
        name=file.name,
        location=file.location,
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size=file.size,
    )
    ppr_data = PPRVersionCreateSchema(file=file_data)

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    error_bytes_ppr_workbook = bytes_ppr_workbook_factory(with_errors=True)
    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    )[file_data.id].get(
        return_value=error_bytes_ppr_workbook,
    )

    new_ppr, _, _ = create_ppr(
        ppr_data, common_context.user_id, deployment, dbsession, connect_client, logger,
    )

    assert new_ppr.id
    assert 'errors' in new_ppr.summary
    assert new_ppr.file == file_data.id
    assert new_ppr.version == 1
    assert new_ppr.status == 'failed'


def test_create_ppr_base_on_another_ppr_version_w_config(
    dbsession, common_context, connect_client, logger, deployment_factory,
    client_mocker_factory, file_factory, bytes_ppr_workbook_factory, ppr_version_factory,
    configuration_json, item_response, configuration_factory, media_response,
):
    deployment = deployment_factory()
    ppr_file = file_factory(
        id='MFL-XXX',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    config_file = file_factory(
        id='MFL-YYY',
        mime_type='application/json',
    )
    ppr_version = ppr_version_factory(file=ppr_file.id, status='ready', deployment=deployment)
    conf = configuration_factory(file=config_file.id, deployment=deployment.id)
    ppr_data = PPRVersionCreateSchema(file=None)

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    bytes_ppr_workbook = bytes_ppr_workbook_factory()

    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/configurations/files',
    )[config_file.id].get(
        return_value=configuration_json,
    )

    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    )[ppr_file.id].get(
        return_value=bytes_ppr_workbook,
    )

    client_mocker.products[deployment.product_id].items.all().mock(
        return_value=[item_response],
    )

    media_response['id'] = 'MFL-ZZZ'
    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    ).create(
        return_value=json.dumps(media_response),
    )

    new_ppr, _, _ = create_ppr(
        ppr_data, common_context.user_id, deployment, dbsession, connect_client, logger,
    )

    assert new_ppr.id
    assert new_ppr.summary == {
        'Resources': {
            'created': ['PRD-000-000-000-00001'],
        },
    }
    file_ = (
        dbsession.query(File)
        .filter_by(id='MFL-ZZZ').limit(1).scalar()
    )
    assert new_ppr.file == media_response['id']
    assert new_ppr.version == ppr_version.version + 1
    assert new_ppr.configuration == conf.id
    assert new_ppr.status == 'ready'
    assert file_.name.startswith(f"PPR_{deployment.product_id}_v{new_ppr.version}_")
    assert file_.name.endswith(".xlsx")
    assert 10000 < file_.size < 20000


def test_create_ppr_base_on_another_ppr_version_wo_config(
    dbsession, common_context, connect_client, logger, deployment_factory,
    client_mocker_factory, file_factory, bytes_ppr_workbook_factory, ppr_version_factory,
    item_response, media_response,
):
    deployment = deployment_factory()
    ppr_file = file_factory(
        id='MFL-XXX',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    ppr_version = ppr_version_factory(file=ppr_file.id, status='ready', deployment=deployment)
    ppr_data = PPRVersionCreateSchema(file=None)

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    bytes_ppr_workbook = bytes_ppr_workbook_factory()

    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    )[ppr_file.id].get(
        return_value=bytes_ppr_workbook,
    )

    client_mocker.products[deployment.product_id].items.all().mock(
        return_value=[item_response],
    )

    media_response['id'] = 'MFL-ZZZ'
    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    ).create(
        return_value=json.dumps(media_response),
    )

    new_ppr, _, _ = create_ppr(
        ppr_data, common_context.user_id, deployment, dbsession, connect_client, logger,
    )

    assert new_ppr.id
    assert new_ppr.summary == {
        'Resources': {
            'created': ['PRD-000-000-000-00001'],
        },
    }
    file_name = dbsession.query(File.name).filter_by(id='MFL-ZZZ').limit(1).scalar()
    assert new_ppr.file == media_response['id']
    assert new_ppr.version == ppr_version.version + 1
    assert new_ppr.configuration is None
    assert new_ppr.status == 'ready'
    assert file_name.startswith(f"PPR_{deployment.product_id}_v{new_ppr.version}_")
    assert file_name.endswith(".xlsx")


def test_create_ppr_wo_ppr_version_w_config(
    dbsession, common_context, connect_client, logger,
    client_mocker_factory, file_factory, ppr_version_factory, deployment_factory,
    configuration_json, item_response, configuration_factory, media_response,
):
    deployment = deployment_factory()
    ppr_file = file_factory(
        id='MFL-XXX',
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    config_file = file_factory(
        id='MFL-YYY',
        mime_type='application/json',
    )
    ppr_version = ppr_version_factory(file=ppr_file.id, deployment=deployment)
    conf = configuration_factory(file=config_file.id, deployment=deployment.id)
    ppr_data = PPRVersionCreateSchema(file=None)

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/configurations/files',
    )[config_file.id].get(
        return_value=configuration_json,
    )

    client_mocker.products[deployment.product_id].items.all().mock(
        return_value=[item_response],
    )

    media_response['id'] = 'MFL-ZZZ'
    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    ).create(
        return_value=json.dumps(media_response),
    )

    new_ppr, _, _ = create_ppr(
        ppr_data, common_context.user_id, deployment, dbsession, connect_client, logger,
    )

    assert new_ppr.id
    assert new_ppr.summary == {
        'Resources': {
            'created': ['PRD-000-000-000-00001'],
        },
    }
    assert new_ppr.file == media_response['id']
    assert new_ppr.configuration == conf.id
    assert new_ppr.version == ppr_version.version + 1
    assert new_ppr.status == 'ready'


def test_create_ppr_db_error(
    dbsession, common_context, deployment_factory, connect_client, logger,
    client_mocker_factory, file_factory, bytes_ppr_workbook_factory,
):
    file = file_factory()
    deployment = deployment_factory()
    file_data = FileSchema(
        id=file.id,
        name=file.name,
        location=file.location,
        mime_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size=file.size,
    )
    ppr_data = PPRVersionCreateSchema(file=file_data)

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    error_bytes_ppr_workbook = bytes_ppr_workbook_factory(with_errors=True)
    client_mocker.ns('media').ns('folders').ns('accounts').collection(
        f'{deployment.account_id}/{deployment.id}/pprs/files',
    )[file_data.id].get(
        return_value=error_bytes_ppr_workbook,
    )

    with pytest.raises(ClientError) as ex:
        create_ppr(
            ppr_data, common_context.user_id, deployment,
            dbsession, connect_client, logger,
        )
    assert ex.value.message == (
        "Object `MFL-6390-1110-0832` already exists, cannot create a new one."
    )
