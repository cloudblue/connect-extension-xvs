class ClientError(RuntimeError):
    def __init__(
            self,
            message: str,
            status_code: int = None,
            cause: Exception = None,
    ):
        self.message = message
        self.status_code = status_code
        self.cause = cause
