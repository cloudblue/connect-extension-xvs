from datetime import datetime
from typing import Dict

from connect.client import ConnectClient
from connect.client.rql import R
from openpyxl import load_workbook

from connect_ext_ppr.errors import ExtensionHttpError
from connect_ext_ppr.services.cbc_extension import get_hub_credentials
from connect_ext_ppr.services.cbc_hub import CBCService


def determine_dataset(ws, batch_id):
    dataset = {
        'cost': False,
        'price': False,
        'msrp': False,
        'effective_date': None,
    }

    headers = [cell.value.lower() for cell in ws[1]]
    for key in dataset.keys():
        if key in headers:
            dataset[key] = True

    if 'effective date' not in headers:
        raise ExtensionHttpError.EXT_013(
            format_kwargs={
                'batch_id': batch_id,
            },
        )

    effective_date_index = headers.index('effective date')

    first_row = [str(cell.value).lower() if cell.value else cell.value for cell in ws[2]]
    effective_date_str = first_row[effective_date_index]
    if effective_date_str:
        try:
            effective_date = effective_date_str.split('t')[0]
            dataset['effective_date'] = datetime.strptime(
                effective_date,
                '%Y-%m-%d',
            ).strftime('%m/%d/%Y')
        except (ValueError, KeyError):
            raise ExtensionHttpError.EXT_014(
                format_kwargs={
                    'batch_id': batch_id,
                    'date': effective_date_str,
                },
            )
    else:
        raise ExtensionHttpError.EXT_014(
            format_kwargs={
                'batch_id': batch_id,
                'date': effective_date_str,
            },
        )

    return dataset


def identify_marketplaces(
    client: ConnectClient,
    hub_id: str,
):
    marketplaces = client.marketplaces.filter(
        R().hubs.id.eq(hub_id),
    )

    if not marketplaces:
        raise ExtensionHttpError.EXT_015(
            format_kwargs={'hub_id': hub_id},
        )

    return [marketplace['id'] for marketplace in marketplaces]


def identify_cbc_hubs(
    client: ConnectClient,
    marketplace: Dict,
):
    if 'hubs' in marketplace.keys():
        hub_ids = [hub['hub']['id'] for hub in marketplace['hubs']]

        osa_hubs = client.hubs.filter(
            R().id.in_(hub_ids),
            R().instance.type.eq('OA'),
        )

        return osa_hubs

    return []


def get_reseller_id(marketplace, hub_id):
    hub_details = None
    if 'hubs' in marketplace.keys():
        hub_details = next(filter(lambda h: h['hub']['id'] == hub_id, marketplace['hubs']))

    if hub_details and 'external_id' in hub_details.keys():
        return hub_details['external_id']


def prepare_file(client, batch_id):
    files = list(client('pricing').batches[batch_id].files.filter(type='output'))
    if not files:
        raise ExtensionHttpError.EXT_016(
            format_kwargs={'batch_id': batch_id},
        )

    if len(files) > 1:
        raise ExtensionHttpError.EXT_008(
            format_kwargs={'batch_id': batch_id},
        )

    file = files[0]
    file_location = file['name']
    file_content = client.get(
        file_location[11:] if file_location.startswith('/public/v1/') else file_location,
    )
    file_name = f"{file['id']}.xlsx"

    with open(file_name, 'wb') as file:
        file.write(file_content)

    wb = load_workbook(filename=file_name)
    ws = wb['Data']
    dataset = determine_dataset(ws, batch_id)
    ws.title = 'Price-list'
    wb.save(file_name)

    return file_name, dataset


def fetch_and_validate_batch(client, batch_id, deployment):
    batches = client('pricing').batches.filter(id=batch_id).select('+stream.context')
    if not batches:
        raise ExtensionHttpError.EXT_007(
            format_kwargs={'batch_id': batch_id},
        )

    batch = batches[0]

    product_id = batch['stream']['context']['product']['id']

    if product_id != deployment.product_id:
        raise ExtensionHttpError.EXT_011(
            format_kwargs={
                'batch_id': batch_id,
                'b_product_id': product_id,
                'deployment_id': deployment.id,
                'd_product_id': deployment.product_id,
            },
        )

    return batch


def identify_reseller_id(client, batch, deployment):
    marketplace_id = batch['stream']['context']['marketplace']['id']
    marketplace = client.marketplaces[marketplace_id].get()

    marketplace_hubs = identify_cbc_hubs(client, marketplace)

    marketplace_hub_ids = [hub['id'] for hub in marketplace_hubs]

    if deployment.hub_id not in marketplace_hub_ids:
        raise ExtensionHttpError.EXT_009(
            format_kwargs={
                'hub_id': deployment.hub_id,
                'marketplace_id': marketplace_id,
                'batch_id': batch['id'],
            },
        )

    reseller_id = get_reseller_id(marketplace, deployment.hub_id)

    if not reseller_id:
        raise ExtensionHttpError.EXT_010(
            format_kwargs={
                'hub_id': deployment.hub_id,
                'marketplace_id': marketplace_id,
            },
        )

    return reseller_id


def process_batch(
    cbc_db,
    file_name,
    reseller_id,
    deployment,
    dataset,
):
    hub_credentials = get_hub_credentials(deployment.hub_id, cbc_db)
    if not hub_credentials:
        raise ExtensionHttpError.EXT_012(
            format_kwargs={
                'hub_id': deployment.hub_id,
            },
        )

    cbc_service = CBCService(hub_credentials, False)

    with open(file_name, 'rb') as price_file:
        parsed_price = cbc_service.parse_price_file(
            reseller_id,
            deployment.vendor_id,
            price_file,
        )

        data_id = parsed_price['dataId']

        cbc_service.prepare_price_proposal(
            reseller_id,
            parsed_price,
            dataset['cost'],
            dataset['price'],
            dataset['msrp'],
            dataset['effective_date'],
        )

        cbc_service.apply_prices(
            reseller_id,
            parsed_price,
            dataset['cost'],
            dataset['price'],
            dataset['msrp'],
            dataset['effective_date'],
            file_name,
        )

        return data_id
