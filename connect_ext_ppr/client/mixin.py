from io import FileIO
from typing import Dict


class GetMixin:
    def get(
        self,
        identifier: str = None,
        params: Dict[str, str] = None,
    ):
        path = self.path
        if identifier:
            path = f'{path}/{identifier}'
        return self.client.execute_request(
            method='GET',
            path=path,
            params=params,
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
