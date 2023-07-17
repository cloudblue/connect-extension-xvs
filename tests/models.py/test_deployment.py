import pytest
from sqlalchemy.exc import IntegrityError

from connect_ext_ppr.db import VerboseSessionError
from connect_ext_ppr.models.deployment import Deployment, DeploymentRequest
from connect_ext_ppr.models.replicas import Product


def _get_id_prefix_or_body(id_: str, idx: int):
    return id_.split('-', 1)[idx]


def test_generate_deployment_w_verbose_id(dbsession):
    product = Product(id='PRD-000-000-000', name='Product Name')
    dbsession.add(product)
    dep = Deployment(
        product_id=product.id,
        account_id='PA-000-000',
        vendor_id='VA-000-000',
        hub_id='HB-0000-0001',
    )
    dbsession.set_verbose(dep)
    dbsession.commit()
    id_prefix = _get_id_prefix_or_body(dep.id, 0)
    assert dep.id is not None
    assert id_prefix == Deployment.PREFIX


def test_generate_deployment_list_w_verbose_id(dbsession):
    product = Product(id='PRD-000-000-000', name='Product Name')
    dbsession.add(product)
    dep_list = [
        Deployment(
            product_id=product.id,
            account_id='PA-000-001',
            vendor_id='VA-000-000',
            hub_id='HB-0000-0002',
        ),
        Deployment(
            product_id=product.id,
            account_id='PA-000-002',
            vendor_id='VA-000-000',
            hub_id='HB-0000-0003',
        ),
    ]
    dbsession.set_verbose_all(dep_list)
    dbsession.commit()
    dep_1, dep_2 = dep_list
    for dep in dep_list:
        id_prefix = _get_id_prefix_or_body(dep.id, 0)
        assert dep.id is not None
        assert id_prefix == Deployment.PREFIX
    assert dep_1.id != dep_2.id


def test_generate_next_verbose_id(dbsession, deployment):
    req_list = [
        DeploymentRequest(
            deployment=deployment.id,
        ),
        DeploymentRequest(
            deployment=deployment.id,
        ),
        DeploymentRequest(
            deployment=deployment.id,
        ),
    ]
    dep_id_body = _get_id_prefix_or_body(deployment.id, 1)
    for idx, req in enumerate(req_list):
        dbsession.set_next_verbose(req, 'deployment')
        dbsession.commit()
        id_prefix = _get_id_prefix_or_body(req.id, 0)
        body, suffix = req.id.rsplit('-', 1)
        id_body = _get_id_prefix_or_body(body, 1)
        assert req.id is not None
        assert id_prefix == DeploymentRequest.PREFIX
        assert id_body == dep_id_body
        assert int(suffix) == idx


def test_fail_to_create_valid_verbose_id(dbsession, mocker, deployment):
    mocker.patch('connect_ext_ppr.db._generate_verbose_id', return_value=deployment.id)
    product = Product(id='PRD-000-000-000', name='Product Name')
    dbsession.add(product)
    dep = Deployment(
        product_id=product.id,
        account_id='PA-000-000',
        vendor_id='VA-000-000',
        hub_id='HB-0000-0004',
    )
    with pytest.raises(VerboseSessionError) as exc:
        dbsession.set_verbose(dep)
    assert exc.value.args[0] == 'Could not generate Deployment verbose ID after 1000 attempts.'


def test_fail_to_bulk_create_valid_verbose_id(dbsession, mocker, deployment):
    mocker.patch('connect_ext_ppr.db._generate_verbose_id', return_value=deployment.id)
    product = Product(id='PRD-000-000-000', name='Product Name')
    dep_list = [
        Deployment(
            product_id=product.id,
            account_id='PA-000-000',
            vendor_id='VA-000-000',
            hub_id='HB-0000-0005',
        ),
        Deployment(
            product_id=product.id,
            account_id='PA-000-001',
            vendor_id='VA-000-000',
            hub_id='HB-0000-0006',
        ),
    ]
    with pytest.raises(VerboseSessionError) as exc:
        dbsession.set_verbose_all(dep_list)
    assert exc.value.args[0] == (
        'Could not generate a group of 2 Deployment verbose ID after 1000 attempts.'
    )


def test_validate_unique_constraint_deployment(dbsession, deployment):
    dep = Deployment(
        product_id=deployment.product_id,
        account_id=deployment.account_id,
        vendor_id='VA-000-000',
        hub_id='HB-0000-0000',
    )
    dbsession.set_verbose(dep)
    with pytest.raises(IntegrityError) as exc:
        dbsession.commit()
    assert (
        'duplicate key value violates unique constraint "prd_account_hub_key"' in exc.value.args[0]
    )
