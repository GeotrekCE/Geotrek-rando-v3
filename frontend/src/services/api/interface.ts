export interface APIResponseForList<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
}

export interface APIQuery {
  language: string;
  fields?: string;
  omit?: string;
  page?: number;
  page_size?: number;
}
