from connect.client import ClientError

from connect_ext_ppr.models.models_utils import transition

import pytest


class Animal:

    def __init__(self, foo) -> None:
        self.foo = foo

    @transition('foo', target='parrot', sources=['bird'])
    def convert(self):
        ...


def test_transition_ok():
    obj = Animal(foo='bird')
    assert obj.convert() is None


def test_transition_error():
    obj = Animal(foo='dog')

    with pytest.raises(ClientError) as ex:
        obj.convert()

    assert ex.value.message == (
        "Transition not allowed: can not set foo from `dog` to 'parrot'"
        ", allowed foo sources for 'parrot' are 'bird'."
    )
