from fastapi import Query
from fastapi_pagination import LimitOffsetPage, LimitOffsetParams, set_page
from fastapi_pagination.api import resolve_params
from fastapi_pagination.ext.sqlalchemy import paginate


set_page(LimitOffsetPage)


class PaginationParams(LimitOffsetParams):
    """Here we can redefine default size value"""
    limit: int = Query(1000, ge=1, le=1000, description="Page size")


def apply_pagination(query, db, params, response):
    """Apply pagination for the query
    * Paginate query according to applied parameters (size and page)
    * Add pagination headers to the response
    Don't filter or remove elements from query after the pagination
    """
    paginated = paginate(db, query, params)
    resolve_params(params)
    init = paginated.offset
    # If we are selecting a page that it's out of range, we return the same start and end for on
    # header range, copying the same behavior as connect.
    end = init
    if paginated.items:
        end += len(paginated.items) - 1

    response.headers['Content-Range'] = f'items {init}-{end}/{paginated.total}'
    return paginated.items
