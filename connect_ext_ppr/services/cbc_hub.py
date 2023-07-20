import base64
from functools import cached_property
from io import FileIO
import re
from typing import Dict

from connect_ext_ppr.client import CBCClient
from connect_ext_ppr.client.exception import ClientError
from connect_ext_ppr.models.cbc_extenstion import HubCredential


class CBCService:

    PLM_TYPE = 'http://com.odin.platform/inhouse-products/application'
    SUBSCRIPTION_TYPE = 'http://parallels.com/aps/types/pa/subscription'
    ADAPTER_TYPE = 'http://connect.cloudblue.com/aps-openapi-adapter/app'

    def __init__(self, hub_credential: HubCredential, verify_certificate: bool = False):
        self.hub_credential = hub_credential
        self.__validate_hub_credentials_object()

        self.client = CBCClient(
            endpoint=hub_credential.controller_url,
            oauth_key=hub_credential.oauth_key,
            oauth_secret=hub_credential.oauth_secret,
            app_id=hub_credential.app_id,
            verify_certificate=verify_certificate,
        )
        self.__validate_client()

    def __validate_hub_credentials_object(self):
        if not self.hub_credential:
            raise ValueError('`hub_credential` must be not be empty.')
        if not isinstance(self.hub_credential, HubCredential):
            raise TypeError('`hub_credential` must be object of HubCredential.')
        if not self.hub_credential.controller_url:
            raise ValueError('`hub_credential.controller_url` must be not be empty.')
        if not self.hub_credential.oauth_key:
            raise ValueError('`hub_credential.oauth_key` must be not be empty.')
        if not self.hub_credential.oauth_secret:
            raise ValueError('`hub_credential.oauth_secret` must be not be empty.')

    def __validate_client(self):
        try:
            self.client.execute_request(
                method='GET',
                path=f'{self.hub_credential.controller_url}/aps',
            )
        except ClientError:
            raise ValueError('hub_credential are not valid!')

    @cached_property
    def primary_subscription_id(self):
        subscriptions = self.subscription_service.get(
            subscriptionId=1,
        )
        return subscriptions[0]['aps']['id']

    @cached_property
    def plm_service(self):
        return self.client(self.PLM_TYPE)

    @cached_property
    def subscription_service(self):
        return self.client(self.SUBSCRIPTION_TYPE)

    @cached_property
    def adapter_service(self):
        return self.client(self.ADAPTER_TYPE)

    def get_product_details(self, product_id: str):
        return self.plm_service.appDetails[product_id].get(
            fulfillmentSystem='connect',
        )

    def install_product(self, product_id: str):
        self.plm_service.appDetails[product_id].action(
            name='import',
            payload={
                'subscriptionId': self.primary_subscription_id,
                'fulfillmentSystem': 'connect',
            },
        )

    def update_product(self, product_id: str):
        return self.plm_service.appDetails[product_id].action(
            name='upgrade',
            payload={
                'subscriptionId': self.primary_subscription_id,
                'fulfillmentSystem': 'connect',
            },
        )

    def parse_ppr(self, file: FileIO):
        base64_content = base64.b64encode(file.read()).decode('ascii')

        return self.plm_service.action(
            name='parseConfig',
            payload={
                'excelConfig': base64_content,
            },
        )

    def apply_ppr(self, parsed_ppr: Dict):
        headers = self.plm_service.action(
            name='applyConfig',
            payload=parsed_ppr,
            output='headers',
        )

        task_info = headers['APS-Info'] if 'APS-Info' in headers.keys() else None

        if task_info:
            tracking_ids = re.findall(
                r'[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}',
                task_info,
            )

            return tracking_ids[0] if tracking_ids else None

    def search_task_logs_by_name(self, partial_name: str):
        return self.adapter_service.getTaskLog.get(
            task_name=f'%{partial_name}%',
        )
