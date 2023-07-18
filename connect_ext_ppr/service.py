from typing import Any, Dict

import jsonschema

from connect_ext_ppr.errors import ExtensionValidationError
from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.models.deployment import Deployment
from connect_ext_ppr.models.replicas import Product
from connect_ext_ppr.utils import _parse_json_schema_error
from connect_ext_ppr.constants import PPR_SCHEMA


def insert_product_from_listing(db, listing_data, logger):
    product_data = listing_data['product']
    q = db.query(Product).filter_by(id=product_data['id'])
    if not db.query(q.exists()).scalar():
        logger.info(f"Adding new product: {product_data['id']}.")
        product = Product(
            id=product_data.get('id'),
            name=product_data['name'],
            logo=product_data.get('icon'),
            owner_id=product_data['owner']['id'],
            version=product_data['version'],
        )
        db.add(product)
        db.commit()


def add_deployments(installation, listings, config, logger):
    with get_db_ctx_manager(config) as db:
        deployments = []
        seen = set()
        for li in listings:
            insert_product_from_listing(db, li, logger)
            product_id = li['product']['id']

            for hub in li['contract']['marketplace']['hubs']:
                comb = (product_id, installation['owner']['id'], hub['hub']['id'])
                q = db.query(Deployment).filter_by(
                    product_id=product_id,
                    account_id=installation['owner']['id'],
                    hub_id=hub['hub']['id'],
                )
                if db.query(q.exists()).scalar():
                    dep = q.first()
                    logger.info(
                        f"Deployment {dep.id} for hub {hub['hub']['id']} already exists.",
                    )
                    continue
                if comb not in seen:
                    dep = Deployment(
                        product_id=product_id,
                        hub_id=hub['hub']['id'],
                        vendor_id=li['vendor']['id'],
                        account_id=installation['owner']['id'],
                    )
                    logger.info(
                        f"Generating Deployment: product={product_id},"
                        f" account={installation['owner']['id']}, hub={hub['hub']['id']}.",
                    )
                    deployments.append(dep)
                    seen.add(comb)
        db.set_verbose_all(deployments)
        db.commit()
        if deployments:
            db.expire_all()
            dep_ids = ', '.join([d.id for d in deployments])
            logger.info(f"The following Deployments have been created: {dep_ids}.")


def validate_ppr_schema(dict_file: Dict[str, Any]):
    try:
        jsonschema.validate(dict_file, PPR_SCHEMA)
    except jsonschema.ValidationError as ex:
        raise ExtensionValidationError.VAL_000(
            format_kwargs={"validation_error": ex.message},
            errors=_parse_json_schema_error(ex),
        )


def update_product(data, config, logger):
    product_id = data['id']
    with get_db_ctx_manager(config) as db:
        q = db.query(Product).filter_by(id=product_id)
        if db.query(q.exists()).scalar():
            logger.info(f"Updating product: {product_id}.")
            product = q.first()
            product.name = data['name']
            product.logo = data.get('icon')
            product.version = data['version']
            db.add(product)
            db.commit()
