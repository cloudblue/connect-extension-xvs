import types

from connect_ext_ppr.errors import ExtensionValidationError


class transition:

    def __init__(self, track_field, target, sources) -> None:
        self.track_field = track_field
        self.target = target
        self.sources = sources if isinstance(sources, list) else [sources]

    def __call__(self, fn):
        def inner(*args, **kwargs):
            self._validate_transition(args[0])
            setattr(self.instance, self.track_field, self.target)
            return fn(*args, **kwargs)
        return inner

    def __get__(self, instance, owner=None):
        return types.MethodType(self, instance) if instance is not None else self

    def _validate_transition(self, instance):
        self.instance = instance
        current_state = getattr(self.instance, self.track_field)
        if current_state not in self.sources:
            raise ExtensionValidationError.VAL_005(
                format_kwargs={
                    'source': current_state,
                    'field_name': self.track_field,
                    'target': self.target,
                    'allowed': ', '.join(self.sources),
                },
            )
