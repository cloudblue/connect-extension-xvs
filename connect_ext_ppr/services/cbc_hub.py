import base64
from functools import cached_property
from io import BufferedReader
import re
from typing import Dict

from requests_oauthlib import OAuth1

from connect_ext_ppr.client import CBCClient
from connect_ext_ppr.client.auth import APSTokenAuth
from connect_ext_ppr.client.exception import CBCClientError
from connect_ext_ppr.models.cbc_extenstion import HubCredential


class CBCService:

    FLAT_CATALOG_TYPE = 'http://ingrammicro.com/pa/flat-catalog'
    PLM_TYPE = 'http://com.odin.platform/inhouse-products/application'
    SUBSCRIPTION_TYPE = 'http://parallels.com/aps/types/pa/subscription'
    ADAPTER_TYPE = 'http://connect.cloudblue.com/aps-openapi-adapter/app'
    ADMIN_USER_TYPE = 'http://aps-standard.org/types/core/admin-user'
    ACCOUNT_TYPE = 'http://aps-standard.org/types/core/account'

    def __init__(self, hub_credential: HubCredential, verify_certificate: bool = False):
        self.hub_credential = hub_credential
        self.verify_certificate = verify_certificate
        self.__validate_hub_credentials_object()

        self.client = CBCClient(
            endpoint=hub_credential.controller_url,
            auth=OAuth1(
                hub_credential.oauth_key,
                hub_credential.oauth_secret,
            ),
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
        except CBCClientError:
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

    @cached_property
    def account_service(self):
        return self.client(self.ACCOUNT_TYPE)

    def get_aps_token_auth(self, account_id: int) -> APSTokenAuth:
        accounts = self.account_service.get(id=account_id)

        if not accounts:
            raise ValueError(f'Reseller Account not found for id {account_id}')
        account_uuid = accounts[0]['aps']['id']

        # Identify Reseller Admin User
        reseller_admin_users = self.client.collection(
            f'aps/2/collections/admin-users?organization.id={account_id}',
        ).get()

        if not reseller_admin_users:
            raise ValueError(f'Admin user not found for reseller {account_id}')
        user_id = reseller_admin_users[0]['userId']

        # Get Reseller Admin User APS Token
        token_object = self.adapter_service.getToken.get(
            user_id=user_id,
        )

        return APSTokenAuth(
            token_object['aps_token'],
            account_uuid,
        )

    def get_aps_token_client(self, account_id: int) -> CBCClient:
        return CBCClient(
            endpoint=self.hub_credential.controller_url,
            auth=self.get_aps_token_auth(account_id),
            verify_certificate=self.verify_certificate,
        )

    def get_flat_catalog_service(self, account_id: int):
        aps_token_client = self.get_aps_token_client(account_id)
        return aps_token_client(self.FLAT_CATALOG_TYPE)

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

    def parse_ppr(self, file: BufferedReader):
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

    def parse_price_file(
        self,
            account_id: int,
            vendor_id: str,
            file: BufferedReader,
    ) -> Dict:
        """

        This method is used to parse price file.

        @param account_id: Reseller account ID associated with Marketplace
        @param vendor_id: Vendor ID owner of the product for which price is getting updated.
        @param file: XLSX file
        @return: Dict containing the information about parsed data for the price file.
        """
        headers = {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }

        file.seek(0)

        fcs = self.get_flat_catalog_service(account_id)
        return fcs.flat_catalog.price_import_wizard.action(
            name=f'upload?vendorId={vendor_id}',
            file=file,
            headers=headers,
        )

    def prepare_price_proposal(
            self,
            account_id: int,
            parsed_prices: Dict,
            export_costs: bool,
            export_prices: bool,
            export_msrp: bool,
            effective_date: str,
    ) -> Dict:
        """

        This method creates a proposal for the price change. This is mandatory
        to create a proposal before the new prices can be applied.

        @param account_id: Reseller account ID associated with Marketplace
        @param parsed_prices: Dict from parse_price_file method
        @param export_costs: Do you want to change cost data?
        @param export_prices: Do you want to change price data?
        @param export_msrp: Do you want to change MSRP data?
        @param effective_date: Date in format 'MM/DD/YYYY'.
                From when this prices should be reflected?
        @return: Dict with details of proposal.
        """
        payload = {
            'exportCosts': export_costs,
            'exportPrices': export_prices,
            'exportMSRP': export_msrp,
            'effectiveDate': effective_date,
            'priceModel': parsed_prices['pricingModel'],
            'feeType': parsed_prices['feeType'],
            'vendorId': parsed_prices['vendorId'],
        }

        fcs = self.get_flat_catalog_service(account_id)
        return fcs.flat_catalog.price_import_wizard[parsed_prices['dataId']].action(
            name='prepare-proposals',
            payload=payload,
        )

    def apply_prices(
            self,
            account_id: int,
            parsed_prices: Dict,
            export_costs: bool,
            export_prices: bool,
            export_msrp: bool,
            effective_date: str,
            file_name: str,
    ):
        """

        This method can be used to apply price changes created through proposal.

        @param account_id: Reseller account ID associated with Marketplace.
        @param parsed_prices: Dict from parse_price_file method.
        @param export_costs: Do you want to apply cost data?
        @param export_prices: Do you want to apply price data?
        @param export_msrp: Do you want to apply MSRP data?
        @param effective_date: Date in format 'MM/DD/YYYY'.
                From when this prices should be reflected?
        @param file_name: Name of the file used to create the proposal.
        """
        payload = {
            'exportCosts': export_costs,
            'exportPrices': export_prices,
            'exportMSRP': export_msrp,
            'effectiveDate': effective_date,
            'priceModel': parsed_prices['pricingModel'],
            'feeType': parsed_prices['feeType'],
            'fileName': file_name,
        }

        fcs = self.get_flat_catalog_service(account_id)
        headers = fcs.flat_catalog.price_import_wizard[parsed_prices['dataId']].action(
            name='set-prices',
            payload=payload,
            output='headers',
        )

        return headers['APS-Info'] if 'APS-Info' in headers.keys() else None
