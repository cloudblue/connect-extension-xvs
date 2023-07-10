from connect.client import ClientError


class ObjectNotFound(ClientError):
    def __init__(self, obj_id):
        super().__init__(
            error_code='EXT_001',
            status_code=404,
            errors=[f'Object {obj_id} not found'],
        )
