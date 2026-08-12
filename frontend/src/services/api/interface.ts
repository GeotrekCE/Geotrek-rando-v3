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
  near_trek?: number;
  period?: string;
  q?: string;
  dates_before?: string;
  dates_after?: string;
  opened_from?: string;
  opened_to?: string;
  opened?: string;
  types?: string;
  types_exclude?: string;
  vigilance_area_types?: string;
  vigilance_area_types_exclude?: string;
}
