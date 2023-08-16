import pytest
from fastapi import Response

from connect_ext_ppr.pagination import apply_pagination, PaginationParams
from connect_ext_ppr.models.deployment import Deployment


@pytest.mark.parametrize(
    ('limit', 'offset', 'expected_length', 'expected_header'),
    (
        (10, 0, 10, 'items 0-9/20'),
        (10, 20, 0, 'items 20-20/20'),
        (9, 18, 2, 'items 18-19/20'),
    ),
)
def test_apply_pagination(
    limit, offset, expected_length, expected_header, dbsession, deployment_factory,
):
    params = PaginationParams(limit=limit, offset=offset)
    for _ in range(20):
        deployment_factory()

    items = dbsession.query(Deployment)
    response = Response()
    paginated_items = apply_pagination(items, dbsession, params, response)

    assert len(paginated_items) == expected_length
    assert response.headers['Content-Range'] == expected_header
