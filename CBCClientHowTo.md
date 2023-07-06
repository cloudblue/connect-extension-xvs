# CBCClient User Guide

## Create CBCClient instance

```python
from connect_ext_ppr.client import CBCClient


# CBC Endpoint
endpoint = '******'
# CBC OAuth Key
client_id = '*****'
# CBC OAuth Key
client_secret = '*****'

client = CBCClient(
    endpoint=endpoint,
    oauth_key=client_id,
    oauth_secret=client_secret,
)

```

## Fetching CBC resource
Syntax:
```python
client['resource-identifier'].get()
```

Example - getting account with resource id 'afe386ae-1506-49b1-8c5d-b583b2eb6456':
```python
account = client['afe386ae-1506-49b1-8c5d-b583b2eb6456'].get()
```

## CBC Service Identification

Syntax:
```python
client('aps-type')
```

Example of account service identification:
```python
client('http://aps-standard.org/types/core/account')
```

Example of getting details of an account with id '1000017':
```python
accounts = client('http://aps-standard.org/types/core/account').get(id=1000017)
```

Example of listing all accounts:
```python
accounts = client('http://aps-standard.org/types/core/account').get()
```

## Working with collections
Examples:
```python
client('aps-type').collection.subs_collection.get()
client('aps-type').collection.subs_collection.action(
    name='action-name',
    payload=payload,
)
```

## Working with resource
Examples:
```python
client('aps-type').collection.subs_collection['identifier'].get()
client('aps-type').collection.subs_collection['identifier'].action(
    name='action-name',
    payload=payload,
)
```

