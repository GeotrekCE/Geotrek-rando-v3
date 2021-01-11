interface Choice {
  value: string;
  label: string;
}

interface RangeChoice {
  minValue: string;
  maxValue: string;
  label: string;
}

interface BaseFilter {
  status: 'ENABLED' | 'DISABLED'; // From config
  source: 'USER' | 'API';
  label: string;
  id: string;
}

export interface Filter extends BaseFilter {
  choices: Choice[];
}

export interface RangeFilter extends BaseFilter {
  choices: RangeChoice[];
}

export enum BaseFilters {
  THEME = 'THEME',
  CITY = 'CITY',
  DISTRICT = 'DISTRICT',
}

export enum TrekFilters {
  DIFFICULTY = 'DIFFICULTY',
  COURSE_TYPE = 'COURSE_TYPE',
  ACCESSIBILITY = 'ACCESSIBILITY',
}

export enum RangeFilters {
  DURATION = 'DURATION',
  LENGTH = 'LENGTH',
  POSITIVE_ELEVATION = 'POSITIVE_ELEVATION',
}

export interface AvailableFilters {
  [BaseFilters.CITY]: Filter;
  [BaseFilters.DISTRICT]: Filter;
  [BaseFilters.THEME]: Filter;
  [TrekFilters.DIFFICULTY]: Filter;
  [TrekFilters.COURSE_TYPE]: Filter;
  [TrekFilters.ACCESSIBILITY]: Filter;
  [RangeFilters.DURATION]: RangeFilter;
  [RangeFilters.LENGTH]: RangeFilter;
  [RangeFilters.POSITIVE_ELEVATION]: RangeFilter;
}

export interface SelectedFilters {
  [BaseFilters.CITY]: Set<string>;
  [BaseFilters.DISTRICT]: Set<string>;
  [BaseFilters.THEME]: Set<string>;
  [TrekFilters.DIFFICULTY]: Set<string>;
  [TrekFilters.COURSE_TYPE]: Set<string>;
  [TrekFilters.ACCESSIBILITY]: Set<string>;
  [RangeFilters.DURATION]: Set<string>;
  [RangeFilters.LENGTH]: Set<string>;
  [RangeFilters.POSITIVE_ELEVATION]: Set<string>;
}
