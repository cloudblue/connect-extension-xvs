from typing import Any, Dict, Union

from connect.client import ClientError


class Error:
    def __init__(self, message, error_code):
        self.message = message
        self.error_code = error_code

    def __call__(self, **kwds: Dict[str, Any]) -> ClientError:
        format_kwargs = kwds.get('format_kwargs', {})
        status_code = kwds.get('status_code') or 400
        message = self.message.format(**format_kwargs)
        errors = kwds.get('errors')

        if not errors:
            errors = [message or 'Unexpected error.']
        if not isinstance(errors, list):
            errors = [errors]

        return ClientError(
            message=message,
            status_code=status_code,
            error_code=self.error_code,
            errors=errors,
        )


class ExtensionErrorMeta(type):
    PREFIX = 'EXT'
    ERRORS = {}

    def __getattr__(cls, __name: str) -> Union[Error, AttributeError]:
        valid_dict = {cls.PREFIX: cls.ERRORS}
        try:
            prefix, code = __name.split('_')
            error = valid_dict[prefix][int(code)]
        except (KeyError, ValueError):
            raise AttributeError(f"type object '{cls.__name__}' has no attribute '{__name}'")
        return Error(message=error, error_code=__name)


class ExtensionErrorBase(metaclass=ExtensionErrorMeta):
    '''
    Base Error class to group a set of errors base on a prefix.
    By default the `PREFIX` value is `EXT`, but it can be overwritten.
    Also `status_code` and/or list of `errors` can be provided.

    Usage:

    ```
    # Define a custom error class
    class MyError(ExtensionErrorBase)
        PREFIX = "XVS"
        ERRORS = {
            1: "Some error",
            2: "Some {template} error.",
            3: "Not found",

        }

    # raise the error
    raise MyError.XVS_001()
    raise MyError.XVS_002(format_kwargs={"template": "foo"})
    raise MyError.XVS_003(status_code=404)
    ```
    '''


class ExtensionHttpError(ExtensionErrorBase):
    ERRORS = {
        0: "{client_message}",  # Placeholder to use when an api call to connect fails
        1: "Object `{obj_id}` not found.",
        2: "Object `{obj_id}` already exists, cannot create a new one.",
        3: "Database error occurred.",
        4: "Active configuration `{obj_id}` cannot be deleted.",
        5: "Configuration `{obj_id}` cannot be deleted, because related deployment is not synced.",
        6: "Can not autogenerate a new PPR for deployment {deployment_id}:"
        " There must be one `active` configuration file.",
        7: "Pricing Batch with ID '{batch_id}' s¡is not found.",
        8: "More than file found of Pricing Batch '{batch_id}'.",
        9: "Deployment Hub {hub_id} does not serve Marketplace "
           "{marketplace_id} associated with the batch {batch_id}",
        10: "Not able to find out Reseller ID for Marketplace {marketplace_id} and Hub {hub_id}.",
        11: "Deployment {deployment_id} Product ID {d_product_id} and Batch "
            "{batch_id} Product ID {b_product_id} does not match.",
        12: "Hub Credentials not found for Hub ID {hub_id}.",
        13: "Effective Date field not found in Batch {batch_id}.",
        14: "Effective date {date} is either not found or invalid"
            " for first row in Batch {batch_id}.",
        15: 'No Marketplace is linked with Deployment Hub {hub_id}',
        16: "Pricing Batch '{batch_id}' does not have any file.",
        17: "Cannot create a new request, an open one already exists.",
    }


class ExtensionValidationError(ExtensionErrorBase):
    PREFIX = 'VAL'
    ERRORS = {
        0: "{validation_error}",  # PPR Schema validation
        1: "{field}: {id} not found.",
        2: "{field}: This values {values} are invalid.",
        3: "At least one choice needs to be specified.",
        4: "Cannot applied PPR to {entity} {values}.",
        5: "Transition not allowed: can not set {field_name} from `{source}` to"
        " '{target}', allowed {field_name} sources for '{target}' are '{allowed}'.",
    }
