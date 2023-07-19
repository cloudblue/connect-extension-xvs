import pytest

from connect_ext_ppr.tasks_manager import (
    apply_ppr_and_delegate_to_marketplaces,
    delegate_to_l2,
    validate_ppr,
)


@pytest.mark.asyncio
async def test_apply_ppr_and_delegate_to_marketplaces():
    assert await apply_ppr_and_delegate_to_marketplaces()


@pytest.mark.asyncio
async def test_delegate_to_l2():
    assert await delegate_to_l2()


@pytest.mark.asyncio
async def test_validate_ppr():
    assert await validate_ppr()
