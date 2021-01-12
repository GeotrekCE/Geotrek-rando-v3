export interface Choices {
  [value: string]: {
    label: string;
  };
}

export interface RangeChoices {
  [minValue: string]: {
    maxValue: string;
    label: string;
  };
}

interface BaseFilter {
  status: 'ENABLED' | 'DISABLED'; // From config
  source: 'USER' | 'API';
  label: string;
}

export interface Filter extends BaseFilter {
  choices: Choices;
}

export interface RangeFilter extends BaseFilter {
  choices: RangeChoices;
}

export enum BaseFilters {
  THEME = 'THEME',
  CITY = 'CITY',
  DISTRICT = 'DISTRICT',
  ACTIVITIES = 'ACTIVITIES',
}

export enum TrekFilters {
  DIFFICULTY = 'DIFFICULTY',
  COURSE_TYPE = 'COURSE_TYPE',
  ACCESSIBILITY = 'ACCESSIBILITY',
  DURATION = 'DURATION',
  LENGTH = 'LENGTH',
  POSITIVE_ELEVATION = 'POSITIVE_ELEVATION',
}

export interface DisplayableFilter {
  value: string;
  label: string;
}
interface DisplayableAvailableFilter {
  label: string;
  options: DisplayableFilter[];
}

export interface AvailableFilters {
  [BaseFilters.ACTIVITIES]: Filter;
  [BaseFilters.CITY]: Filter;
  [BaseFilters.DISTRICT]: Filter;
  [BaseFilters.THEME]: Filter;
  [TrekFilters.DIFFICULTY]: Filter;
  [TrekFilters.COURSE_TYPE]: Filter;
  [TrekFilters.ACCESSIBILITY]: Filter;
  [TrekFilters.DURATION]: RangeFilter;
  [TrekFilters.LENGTH]: RangeFilter;
  [TrekFilters.POSITIVE_ELEVATION]: RangeFilter;
}

export interface DisplayableAvailableFilters {
  [BaseFilters.ACTIVITIES]: DisplayableAvailableFilter;
  [BaseFilters.CITY]: DisplayableAvailableFilter;
  [BaseFilters.DISTRICT]: DisplayableAvailableFilter;
  [BaseFilters.THEME]: DisplayableAvailableFilter;
  [TrekFilters.DIFFICULTY]: DisplayableAvailableFilter;
  [TrekFilters.COURSE_TYPE]: DisplayableAvailableFilter;
  [TrekFilters.ACCESSIBILITY]: DisplayableAvailableFilter;
  [TrekFilters.DURATION]: DisplayableAvailableFilter;
  [TrekFilters.LENGTH]: DisplayableAvailableFilter;
  [TrekFilters.POSITIVE_ELEVATION]: DisplayableAvailableFilter;
}

export interface SelectedFilters {
  [BaseFilters.ACTIVITIES]: DisplayableFilter[];
  [BaseFilters.CITY]: DisplayableFilter[];
  [BaseFilters.DISTRICT]: DisplayableFilter[];
  [BaseFilters.THEME]: DisplayableFilter[];
  [TrekFilters.DIFFICULTY]: DisplayableFilter[];
  [TrekFilters.COURSE_TYPE]: DisplayableFilter[];
  [TrekFilters.ACCESSIBILITY]: DisplayableFilter[];
  [TrekFilters.DURATION]: DisplayableFilter[];
  [TrekFilters.LENGTH]: DisplayableFilter[];
  [TrekFilters.POSITIVE_ELEVATION]: DisplayableFilter[];
}

// React select interface

export type FilterValues = ReadonlyArray<DisplayableFilter> | undefined | null;

// Individual filters interfaces

export interface RawDifficulty {
  id: number;
  cirkwi_level: number;
  label: string;
  pictogram: string;
}
