from connect.client import ClientError


class ObjectNotFound(ClientError):
    def __init__(self, obj_id):
        super().__init__(
            error_code='EXT_001',
            status_code=404,
            errors=[f'Object {obj_id} not found'],
        )


class AlreadyExists(ClientError):
    def __init__(self, obj_id):
        super().__init__(
            error_code='EXT_002',
            status_code=404,
            errors=[f'Object {obj_id} already exists, cannot create a new one'],
        )


class DatabaseError(ClientError):
    def __init__(self, err):
        super().__init__(
            error_code='EXT_003',
            status_code=400,
            errors=[f'Database error occurred: {err}'],
        )


class CannotDeleteObject(ClientError):
    def __init__(self, obj_id):
        super().__init__(
            error_code='EXT_004',
            status_code=400,
            errors=[f'Object {obj_id} cannot be deleted now'],
        )
