export interface RestSortField {
  sort_by: string;
  sort_direction: number;
}

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

export interface RestFilterField {
  name: string;
  operator: RestFilterFieldOperator;
  values: string[];
}

export interface GetAllRestQueryParams {
  page?: number;
  limit?: number;
  sort?: RestSortField[];
  filters?: RestFilterField[];
  fields?: string[];
}

export interface GetAllRestPaginatedResponse<T> {
  results: T[];
  count: number;
}
