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
    GetMixin,
    ActionMixin,
):
    def _get_service_path(self, path, aps_type):
        aps_type_object = self.client.execute_request(
            method='GET',
            path=f'{path}/aps/2/resources/?implementing({aps_type})',
        )

        if not aps_type_object:
            raise TypeError(f'Not able to find out Service with APS Type: {aps_type}')
        else:
            service_id = aps_type_object[0]['aps']['id']
            return f'{path}/aps/2/resources/{service_id}'

    def __init__(self, client, aps_type: str, path: str):
        self.client = client
        path = self._get_service_path(path, aps_type)
        super().__init__(
            client=client,
            path=path,
        )

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
            f'{self.path}/{name}',
        )
