from io import FileIO
from typing import Dict


class GetMixin:
    def get(
        self,
        **kwargs,
    ):
        return self.client.execute_request(
            method='GET',
            path=self.path,
            params=kwargs,
        )


class ActionMixin:
    def action(
        self,
        name: str,
        method: str = 'POST',
        payload: dict = None,
        file: FileIO = None,
        headers: Dict[str, str] = None,
        output: str = 'body',
    ):
        if payload and file:
            raise ValueError('Either payload or file can be specified.')

        return self.client.execute_request(
            method=method,
            path=f'{self.path}/{name}',
            payload=payload,
            file=file,
            headers=headers,
            output=output,
        )
