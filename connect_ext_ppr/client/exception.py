from json import JSONDecodeError

from requests import Response


class ClientError(RuntimeError):
    def __init__(
            self,
            message: str,
            response: Response = None,
            cause: Exception = None,
    ):
        self.message = message
        self.response = response
        self.status_code = response.status_code if response else None
        self.cause = cause
        try:
            self.json = response.json() if response else None
        except JSONDecodeError:
            self.json = None
