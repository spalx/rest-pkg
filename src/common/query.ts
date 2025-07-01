import { ParsedQs } from 'qs';

import { GetAllRestQueryParams, RestFilterField, RestFilterFieldOperator, RestSortField } from '../types/query';

export function parseGetAllRestQueryParams(
  query: ParsedQs
): GetAllRestQueryParams {
  // Query example:
  // page=1&limit=10&fields=id,name&sort=id:-1,created_at:-1&filters[createdAt]=Between:2024-01-01,2024-12-31&filters[name]=Contains:John

  const page: string = (query.page as string | undefined) || '1';
  const limit: string = (query.limit as string | undefined) || '10';

  const fields: string = (query.fields as string | undefined) || '';
  const fieldsArr: string[] = fields ? decodeURIComponent(fields).split(',').map(f => f.trim()) : [];

  const filtersObj = query.filters as Record<string, string> | undefined;
  const filtersArr: RestFilterField[] = [];

  if (filtersObj && typeof filtersObj === 'object') {
    for (const [fieldName, filterValue] of Object.entries(filtersObj)) {
      if (typeof filterValue === 'string') {
        const arr = decodeURIComponent(filterValue).split(':');
        if (arr.length >= 2) {
          const operator = arr[0] as RestFilterFieldOperator;
          if (Object.values(RestFilterFieldOperator).includes(operator)) {
            const values = arr.slice(1).join(':').split(',').map(v => v.trim());
            filtersArr.push({
              name: fieldName,
              operator,
              values,
            });
          }
        }
      }
    }
  }

  const sort: string = (query.sort as string | undefined) || '';
  const sortFields: string[] = sort ? decodeURIComponent(sort).split(',') : [];
  const sortArr: RestSortField[] = [];
  for (const str of sortFields) {
    const arr = str.split(':');
    if (arr.length === 2) {
      const dir = Number(arr[1]);
      if (dir === 1 || dir === -1) {
        sortArr.push({ sort_by: arr[0].trim(), sort_direction: dir });
      }
    }
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  return {
    page: Number.isFinite(pageNum) ? pageNum : 1,
    limit: Number.isFinite(limitNum) ? limitNum : 10,
    fields: fieldsArr,
    filters: filtersArr,
    sort: sortArr,
  };
}
