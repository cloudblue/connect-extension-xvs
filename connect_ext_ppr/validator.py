from connect.client import R
from fastapi import status

from connect_ext_ppr.errors import ExtensionValidationError


def validate_deployment(deployment, account_id):
    """
    Validates that the deployment belongs to the account
    """
    if deployment.account_id != account_id:
        raise ExtensionValidationError.VAL_001(
            format_kwargs={
                'field': 'deployment',
                'id': deployment.id,
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )


def validate_ppr_version_belongs_to_deployment(ppr, deployment):
    """
    Validates that the ppr can be asociated to DR
    """
    if ppr.deployment != deployment.id:
        raise ExtensionValidationError.VAL_001(
            format_kwargs={'field': 'ppr', 'id': ppr.id},
            status_code=status.HTTP_400_BAD_REQUEST,
        )


def validate_dr_marketplaces(client, product_id, dr_marketplaces, dep_marketplaces):
    """
    Validates that all the DR's marketplaces belong to the associated deployment
    """
    if not dr_marketplaces:
        raise ExtensionValidationError.VAL_003(
            format_kwargs={'field': 'marketplace'},
        )

    mp_configs = {mp.id: mp for mp in dr_marketplaces}
    dep_ids = {mp.marketplace for mp in dep_marketplaces}

    diff = list(mp_configs.keys() - dep_ids)
    if diff:
        diff.sort()
        raise ExtensionValidationError.VAL_002(
            format_kwargs={
                'field': 'marketplaces',
                'values': diff,
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    validate_pricelist_ids(client, product_id, mp_configs)


def validate_pricelist_ids(client, product_id, mp_configs):
    rql_filters = []
    pricelist_ids = set()
    for mp_id, config in mp_configs.items():
        if config.pricelist:
            pricelist_ids.add(config.pricelist.id)
            rql_filters.append(
                R().stream.context.marketplace.id.eq(mp_id)
                & R().id.eq(config.pricelist.id),
            )

    if not pricelist_ids:
        return

    batches = client('pricing').batches.filter(
        R(_op=R.OR, _children=rql_filters),
        R().stream.context.product.id.eq(product_id),
        R().status.eq('published'),
        R().test.ne(True),
    )

    invalid_ids = pricelist_ids - {b['id'] for b in batches}

    if invalid_ids:
        raise ExtensionValidationError.VAL_006(format_kwargs={
            'ids': ', '.join(sorted(invalid_ids)),
        })


def validate_marketplaces_ppr(ppr, dr_marketplaces, dep_marketplaces):
    """
    Validates that we can apply the ppr to all marketplaces
    """
    dep_mkplc_map = {m.marketplace: m for m in dep_marketplaces}
    mkplcs_w_erros = []
    for mp_data in dr_marketplaces:
        mp_id = mp_data.id
        if dep_mkplc_map[mp_id].ppr_id and dep_mkplc_map[mp_id].ppr_id > ppr.id:
            mkplcs_w_erros.append(mp_id)

    if mkplcs_w_erros:
        raise ExtensionValidationError.VAL_004(
            format_kwargs={
                'entity': 'marketplaces',
                'values': list(mkplcs_w_erros),
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )
