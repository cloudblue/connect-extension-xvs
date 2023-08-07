from fastapi import status

from connect_ext_ppr.errors import ExtensionValidationError


def validate_object_exists(object, object_id, field_name):
    if not object:
        raise ExtensionValidationError.VAL_001(
            format_kwargs={
                'field': field_name,
                'id': object_id,
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )


def validate_deployment(data, deployment, account_id):
    """
    Validates that the deployment belongs to the account.
    param: data from form sent by the user
    param: deployment Deployment object or None
    param: account_id Account id of the user that we want to check if deployment belongs to.
    """
    validate_object_exists(deployment, data.id, 'deployment')
    if deployment.account_id != account_id:
        raise ExtensionValidationError.VAL_001(
            format_kwargs={
                'field': 'deployment',
                'id': deployment.id if deployment else None,
            },
            status_code=status.HTTP_400_BAD_REQUEST,
        )


def validate_ppr_version_belongs_to_deployment(data, ppr, deployment):
    """
    Validates that the ppr can be asociated to DR.
    param: data from form sent by the user
    param: ppr PPR object or None
    param: deployment Deployment object agains validations will be done
    """
    validate_object_exists(ppr, data.id, 'ppr')
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
