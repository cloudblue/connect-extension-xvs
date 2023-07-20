from requests import Response


class ClientError(RuntimeError):
    def __init__(
            self,
            message: str,
            status_code: int = None,
            response: Response = None,
            cause: Exception = None,
    ):
        self.message = message
        self.response = response
        self.status_code = status_code
        self.cause = cause
