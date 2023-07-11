import enum


class DeploymentStatusChoices(str, enum.Enum):
    PENDING = 'pending'
    PROCESSING = 'processing'
    SYNCED = 'synced'


class MimeTypeChoices(str, enum.Enum):
    application_json = 'application/json'
    application_manifest_json = 'application/manifest+json'
    application_vnd_ms_excel = 'application/vnd.ms-excel'
    application_vnd_ms_xslx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'


class ConfigurationStateChoices(str, enum.Enum):
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    DELETED = 'deleted'


class PPRStatusChoices(str, enum.Enum):
    PENDING = 'pending'
    PROCESSING = 'processing'
    READY = 'ready'
    FAILED = 'failed'
