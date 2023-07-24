import enum


class DeploymentStatusChoices(str, enum.Enum):
    PENDING = 'pending'
    PROCESSING = 'processing'
    SYNCED = 'synced'


class DeploymentRequestStatusChoices(str, enum.Enum):
    PENDING = 'pending'
    PROCESSING = 'processing'
    DONE = 'done'
    ERROR = 'error'
    ABORTING = 'aborting'
    ABORTED = 'aborted'


class TasksStatusChoices(str, enum.Enum):
    PENDING = 'pending'
    PROCESSING = 'processing'
    DONE = 'done'
    ERROR = 'error'
    ABORTED = 'aborted'


class TaskTypesChoices(str, enum.Enum):
    PPR_VALIDATION = 'ppr_validation'
    APPLY_AND_DELEGATE = 'apply_ppr_and_delegate_to_marketplace'
    DELEGATE_TO_L2 = 'delegate_to_l2'


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
