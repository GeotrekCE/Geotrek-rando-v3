import {
  BaseFilters,
  FiltersConfig,
  RawFiltersConfig,
  TrekFilters,
  RangeChoices,
  RawFilterConfig,
} from './interface';

import filterConfig from '../../../config/filterConfig.json';

const getFilterStatus = (rawFilter: RawFilterConfig): 'ENABLED' | 'DISABLED' =>
  rawFilter.status === 'ENABLED' ? 'ENABLED' : 'DISABLED';

const adaptRangeChoice = (
  rawChoices: {
    minValue: number;
    maxValue: number;
    label: string;
  }[],
): RangeChoices =>
  rawChoices.reduce(
    (choices, currentChoice) => ({
      ...choices,
      [currentChoice.minValue]: {
        maxValue: currentChoice.maxValue,
        label: currentChoice.label,
      },
    }),
    {},
  );

export const getConfig = (): FiltersConfig => {
  const rawConfig: RawFiltersConfig = filterConfig;
  const durationChoices = rawConfig[TrekFilters.DURATION].choices;
  const lengthChoices = rawConfig[TrekFilters.LENGTH].choices;
  const positiveElevation = rawConfig[TrekFilters.POSITIVE_ELEVATION].choices;

  return {
    [BaseFilters.ACTIVITIES]: {
      status: getFilterStatus(rawConfig[BaseFilters.ACTIVITIES]),
      label: `search.filters.${BaseFilters.ACTIVITIES}`,
    },
    [BaseFilters.CITY]: {
      status: getFilterStatus(rawConfig[BaseFilters.CITY]),
      label: `search.filters.${BaseFilters.CITY}`,
    },
    [BaseFilters.DISTRICT]: {
      status: getFilterStatus(rawConfig[BaseFilters.DISTRICT]),
      label: `search.filters.${BaseFilters.DISTRICT}`,
    },
    [BaseFilters.THEME]: {
      status: getFilterStatus(rawConfig[BaseFilters.THEME]),
      label: `search.filters.${BaseFilters.THEME}`,
    },
    [TrekFilters.DIFFICULTY]: {
      status: getFilterStatus(rawConfig[TrekFilters.DIFFICULTY]),
      label: `search.filters.${TrekFilters.DIFFICULTY}`,
    },
    [TrekFilters.COURSE_TYPE]: {
      status: getFilterStatus(rawConfig[TrekFilters.COURSE_TYPE]),
      label: `search.filters.${TrekFilters.COURSE_TYPE}`,
    },
    [TrekFilters.ACCESSIBILITY]: {
      status: getFilterStatus(rawConfig[TrekFilters.ACCESSIBILITY]),
      label: `search.filters.${TrekFilters.ACCESSIBILITY}`,
    },
    [TrekFilters.DURATION]: {
      status: getFilterStatus(rawConfig[TrekFilters.DURATION]),
      label: `search.filters.${TrekFilters.DURATION}`,
      choices: durationChoices ? adaptRangeChoice(durationChoices) : {},
    },
    [TrekFilters.LENGTH]: {
      status: getFilterStatus(rawConfig[TrekFilters.LENGTH]),
      label: `search.filters.${TrekFilters.LENGTH}`,
      choices: lengthChoices ? adaptRangeChoice(lengthChoices) : {},
    },
    [TrekFilters.POSITIVE_ELEVATION]: {
      status: getFilterStatus(rawConfig[TrekFilters.POSITIVE_ELEVATION]),
      label: `search.filters.${TrekFilters.POSITIVE_ELEVATION}`,
      choices: positiveElevation ? adaptRangeChoice(positiveElevation) : {},
    },
  };
};
