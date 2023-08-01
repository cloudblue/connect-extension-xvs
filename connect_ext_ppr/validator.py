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


def validate_dr_marketplaces(dr_marketplaces, dep_marketplaces):
    """
    Validates that all the DR's marketplaces belong to the associated deployment
    """
    diff = list(set(dr_marketplaces) - set(dep_marketplaces))
    if diff:
        diff.sort()
        raise ExtensionValidationError.VAL_002(
            format_kwargs={
                'field': 'marketplaces',
                'values': diff,
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )


def validate_marketplaces_ppr(ppr, dr_marketplaces, dep_marketplaces):
    """
    Validates that we can apply the ppr to all marketplaces
    """
    dep_mkplc_map = {m.marketplace: m for m in dep_marketplaces}
    mkplcs_w_erros = []
    for marketplace in dr_marketplaces:
        if dep_mkplc_map[marketplace].ppr_id and dep_mkplc_map[marketplace].ppr_id > ppr.id:
            mkplcs_w_erros.append(marketplace)

    if mkplcs_w_erros:
        raise ExtensionValidationError.VAL_004(
            format_kwargs={
                'entity': 'marketplaces',
                'values': list(mkplcs_w_erros),
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )
