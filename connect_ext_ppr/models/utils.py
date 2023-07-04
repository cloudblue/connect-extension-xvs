from connect_ext_ppr.db import get_db_ctx_manager
from connect_ext_ppr.models.deployment import Deployment


def add_deployments(installation, listings, config, logger):
    with get_db_ctx_manager(config) as db:
        print(db.bind)
        deployments = []
        for li in listings:
            product_id = li['product']['id']
            for hub in li['contract']['marketplace']['hubs']:
                q = db.query(Deployment).filter_by(
                    product_id=product_id,
                    account_id=installation['owner']['id'],
                    hub_id=hub['hub']['id'],
                )
                if db.query(q.exists()).scalar():
                    continue
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
        db.set_verbose_all(deployments)
        db.commit()
        if deployments:
            db.expire_all()
            dep_ids = ', '.join([d.id for d in deployments])
            logger.info(f"The following Deployments have been created: {dep_ids}.")


model_manager = get_db_ctx_manager
