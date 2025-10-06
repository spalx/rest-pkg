import { z } from 'zod';

export interface RestSortField {
  sort_by: string;
  sort_direction: number;
}

export const RestSortFieldSchema = z.object({
  sort_by: z.string('sort_by must be a string').min(1, 'sort_by cannot be empty'),
  sort_direction: z.literal([1, -1], 'sort_direction must be either 1 (ASC) or -1 (DESC)'),
});

export enum RestFilterFieldOperator {
  Contains = 'Contains',
  NotContains = 'NotContains',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
  Equal = 'Equal',
  Unequal = 'Unequal',
  In = 'In',
  NotIn = 'NotIn',
  Between = 'Between',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  GreaterOrEqualThan = 'GreaterOrEqualThan',
  LessOrEqualThan = 'LessOrEqualThan',
}

export const RestFilterFieldOperatorSchema = z.nativeEnum(RestFilterFieldOperator);

export interface RestFilterField {
  name: string;
  operator: RestFilterFieldOperator;
  values: string[];
}

export const RestFilterFieldSchema = z.object({
  name: z.string('name must be a string').min(1, 'name cannot be empty'),
  operator: RestFilterFieldOperatorSchema,
  values: z.array(z.string('each filter value must be a string')).min(1, 'values must have at least one element'),
});

export interface GetAllRestQueryParams {
  page?: number;
  limit?: number;
  sort?: RestSortField[];
  filters?: RestFilterField[];
  fields?: string[];
}

export const GetAllRestQueryParamsSchema = z.object({
  page: z.int('page must be an integer').positive('page must be greater than 0').optional(),
  limit: z.int('limit must be an integer').positive('limit must be greater than 0').optional(),
  sort: z.array(RestSortFieldSchema).optional(),
  filters: z.array(RestFilterFieldSchema).optional(),
  fields: z.array(z.string('each field must be a string')).optional(),
});

export interface GetAllRestPaginatedResponse<T> {
  results: T[];
  count: number;
}
