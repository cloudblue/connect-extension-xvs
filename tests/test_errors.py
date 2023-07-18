import pytest

from connect_ext_ppr.errors import ExtensionErrorBase


class _MyError(ExtensionErrorBase):
    PREFIX = 'XXX'
    ERRORS = {
        1: "Some.",
        2: "Error with kwargs: `{foo}`.",
        3: "",
    }


def test_error_base():
    assert _MyError.XXX_001().message == "Some."
    assert _MyError.XXX_001().status_code == 400
    assert _MyError.XXX_002(format_kwargs={"foo": "bar"}).message == "Error with kwargs: `bar`."


def test_non_message():
    err = _MyError.XXX_003()
    assert err.message == ""
    assert str(err) == "400 Bad Request: XXX_003 - Unexpected error."
    assert err.status_code == 400


def test_errors_not_a_list():
    err = _MyError.XXX_003(errors='Some Error.')
    assert str(err) == "400 Bad Request: XXX_003 - Some Error."
    assert isinstance(err.errors, list)


@pytest.mark.parametrize(
    'bad_error',
    ('YYY_001', 'XXX_100', 'XXX_YYY', 'ZZZ002'),
)
def test_non_existent_error(bad_error):
    with pytest.raises(AttributeError) as ex:
        getattr(_MyError, bad_error)()
    assert ex.value.args[0] == f"type object '_MyError' has no attribute '{bad_error}'"
