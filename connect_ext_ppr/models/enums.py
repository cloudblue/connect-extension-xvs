import enum


class DeploymentStatusChoices(str, enum.Enum):
    pending = 'pending'
    processing = 'processing'
    synced = 'synced'


class DeploymentRequestStatusChoices(str, enum.Enum):
    pending = 'pending'
    processing = 'processing'
    done = 'done'
    error = 'error'
    aborting = 'aborting'
    aborted = 'aborted'


class TasksStatusChoices(str, enum.Enum):
    pending = 'pending'
    processing = 'processing'
    done = 'done'
    error = 'error'
    aborted = 'aborted'


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
    active = 'active'
    inactive = 'inactive'
    deleted = 'deleted'


class PPRStatusChoices(str, enum.Enum):
    pending = 'pending'
    processing = 'processing'
    ready = 'ready'
    failed = 'failed'
