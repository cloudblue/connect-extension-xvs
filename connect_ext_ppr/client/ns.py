from functools import cached_property

from connect_ext_ppr.client.mixin import (
    ActionMixin,
    GetMixin,
)


class NSBase:
    def __init__(
        self,
        client,
        path: str,
    ):
        self.client = client
        self.path = path


class Resource(
    NSBase,
    GetMixin,
    ActionMixin,
):
    pass


class Collection(
    NSBase,
    GetMixin,
    ActionMixin,
):
    def __getitem__(self, resource_id):
        return self.resource(resource_id)

    def __getattr__(self, name):
        if '_' in name:
            name = name.replace('_', '-')
        return self.collection(name)

    def resource(self, resource_id: str):
        if not isinstance(resource_id, (str, int)):
            raise TypeError('`resource_id` must be a string or int.')

        if not resource_id:
            raise ValueError('`resource_id` must not be blank.')

        return Resource(
            self.client,
            f'{self.path}/{resource_id}',
        )

    def collection(self, name: str):

        if not isinstance(name, str):
            raise TypeError('`name` must be a string.')

        if not name:
            raise ValueError('`name` must not be blank.')

        return Collection(
            self.client,
            f'{self.path}/{name}',
        )


class Service(
    NSBase,
    ActionMixin,
):
    def __init__(self, client, aps_type: str, path: str):
        super().__init__(
            client=client,
            path=path,
        )
        self.aps_type = aps_type

    @cached_property
    def service_path(self):
        aps_type_object = self.client.execute_request(
            method='GET',
            path=f'{self.path}/aps/2/resources/?implementing({self.aps_type})',
        )

        if not aps_type_object:
            raise TypeError(f'Not able to find out Service with APS Type: {self.aps_type}')
        elif len(aps_type_object) != 1:
            raise TypeError(f'Multiple instances found with APS Type: {self.aps_type}')
        else:
            service_id = aps_type_object[0]['aps']['id']
            return f'{self.path}/aps/2/resources/{service_id}'

    def __getattr__(self, name):
        if '_' in name:
            name = name.replace('_', '-')
        return self.collection(name)

    def collection(self, name: str):

        if not isinstance(name, str):
            raise TypeError('`name` must be a string.')

        if not name:
            raise ValueError('`name` must not be blank.')

        return Collection(
            self.client,
            f'{self.service_path}/{name}',
        )

    def get(self, **kwargs):
        return self.client.execute_request(
            method='GET',
            path=f'{self.path}/aps/2/resources/?implementing({self.aps_type})',
            params=kwargs,
        )
