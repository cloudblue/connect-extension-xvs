from io import FileIO
from json import JSONDecodeError
from typing import Dict, Optional

from requests import (
    Request,
    Response,
    Session,
)
from requests_oauthlib import OAuth1

from connect_ext_ppr.client.exception import ClientError
from connect_ext_ppr.client.ns import (
    Collection,
    Resource,
    Service,
)


class CBCClient:

    def __init__(
            self,
            endpoint: str,
            oauth_key: str,
            oauth_secret: str,
            verify_certificate: bool = True,
            default_headers: Dict[str, str] = None,
    ):
        super().__init__()

        self.endpoint = endpoint
        self.auth_key = oauth_key
        self.auth_secret = oauth_secret
        self.verify = verify_certificate
        self.default_headers = default_headers
        self.path = self.endpoint

        if not default_headers:
            self.default_headers = {
                'User-Agent': 'Connect-CBC-Client',
            }

        self.auth = OAuth1(
            client_key=oauth_key,
            client_secret=oauth_secret,
        )

    def execute_request(
        self,
        method: str,
        params: Dict[str, str] = None,
        payload: dict = None,
        file: FileIO = None,
        path: str = '',
        headers: Dict[str, str] = None,
        output: str = 'body',
    ):
        if headers:
            headers.update(self.default_headers)
        else:
            headers = self.default_headers

        prepared_request = Request(
            method=method,
            url=path,
            headers=headers,
            params=params,
            auth=self.auth,
            json=payload,
            data=file,
        ).prepare()

        with Session() as s:
            response: Optional[Response] = None
            try:
                response = s.send(prepared_request, verify=self.verify)
                response.raise_for_status()

                if output == 'headers':
                    return response.headers
                else:
                    try:
                        return response.json()
                    except JSONDecodeError:
                        return None

            except Exception as e:
                if response is not None:
                    raise ClientError(
                        message=f'{type(e).__name__} : {str(e)}',
                        status_code=response.status_code,
                        cause=e,
                    )
                else:
                    raise ClientError(
                        message=f'{type(e).__name__} : {str(e)}',
                        cause=e,
                    )

    def __call__(self, apt_type: str):
        if not isinstance(apt_type, str):
            raise TypeError('`apt_type` must be a string.')

        if not apt_type:
            raise ValueError('`apt_type` must not be blank.')

        return Service(
            self,
            aps_type=apt_type,
            path=self.path,
        )

    def __getattr__(self, name):
        if '_' in name:
            name = name.replace('_', '-')
        return self.collection(name)

    def __getitem__(self, resource_id):
        return self.resource(resource_id)

    def collection(self, name: str):

        if not isinstance(name, str):
            raise TypeError('`name` must be a string.')

        if not name:
            raise ValueError('`name` must not be blank.')

        return Collection(
            self,
            f'{self.path}/{name}',
        )

    def resource(self, resource_id: str):
        if not isinstance(resource_id, (str, int)):
            raise TypeError('`resource_id` must be a string or int.')

        if not resource_id:
            raise ValueError('`resource_id` must not be blank.')

        return Resource(
            self,
            f'{self.path}/aps/2/resources/{resource_id}',
        )

    def get(
            self,
            resource_id: str,
            **kwargs,
    ):
        if not isinstance(resource_id, str):
            raise TypeError('`identifier` must be a string.')

        if not resource_id:
            raise ValueError('`identifier` must not be blank.')

        return self.execute_request(
            method='GET',
            path=f'{self.path}/aps/2/resources/{resource_id}',
            params=kwargs,
        )
