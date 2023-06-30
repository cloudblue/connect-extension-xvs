from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.models.deployment import Deployment


def add_deployments(installation, products, config, logger):
    with get_db_ctx_manager(config) as db:
        deployments = []
        for product in products:
            q = db.query(Deployment).filter(Deployment.product_id == product['id'])
            if db.query(q.exists()).scalar():
                continue
            dep = Deployment(
                product_id=product['id'],
                version=product['version'],
                vendor_id=product['owner']['id'],
                account_id=installation['owner']['id'],
            )
            logger.info(
                f"Generating Deployment: product={product['id']},"
                f" account={installation['owner']['id']}.",
            )
            deployments.append(dep)
        db.set_verbose_all(deployments)
        db.commit()
        if deployments:
            db.expire_all()
            dep_ids = ', '.join([d.id for d in deployments])
            logger.info(f"The following Deployments have been created: {dep_ids}.")


model_manager = get_db_ctx_manager
