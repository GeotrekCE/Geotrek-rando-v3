import { getDifficulties } from './connector';
import {
  AvailableFilters,
  BaseFilters,
  DisplayableAvailableFilters,
  DisplayableFilter,
  Filter,
  TrekFilters,
} from './interface';

export const getAvailableFilters = async (): Promise<AvailableFilters> => {
  const difficulties = await getDifficulties();
  return {
    [BaseFilters.ACTIVITIES]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${BaseFilters.ACTIVITIES}`,
      choices: {},
    },
    [BaseFilters.CITY]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${BaseFilters.CITY}`,
      choices: {},
    },
    [BaseFilters.DISTRICT]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${BaseFilters.DISTRICT}`,
      choices: {},
    },
    [BaseFilters.THEME]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${BaseFilters.THEME}`,
      choices: {},
    },
    [TrekFilters.DIFFICULTY]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${TrekFilters.DIFFICULTY}`,
      choices: difficulties,
    },
    [TrekFilters.COURSE_TYPE]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${TrekFilters.COURSE_TYPE}`,
      choices: {},
    },
    [TrekFilters.ACCESSIBILITY]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filters.${TrekFilters.ACCESSIBILITY}`,
      choices: {},
    },
    [TrekFilters.DURATION]: {
      status: 'ENABLED',
      source: 'USER',
      label: `search.filters.${TrekFilters.DURATION}`,
      choices: {},
    },
    [TrekFilters.LENGTH]: {
      status: 'ENABLED',
      source: 'USER',
      label: `search.filters.${TrekFilters.LENGTH}`,
      choices: {},
    },
    [TrekFilters.POSITIVE_ELEVATION]: {
      status: 'ENABLED',
      source: 'USER',
      label: `search.filters.${TrekFilters.POSITIVE_ELEVATION}`,
      choices: {},
    },
  };
};

const adaptAvailableFilters = (
  filter: Filter,
): { label: string; options: DisplayableFilter[] } => ({
  label: filter.label,
  options: Object.keys(filter.choices).map(difficultyId => ({
    value: difficultyId,
    label: filter.choices[difficultyId].label,
  })),
});

export const getDisplayableAvailableFilters = async (): Promise<DisplayableAvailableFilters> => {
  const availableFilters = await getAvailableFilters();
  return {
    [BaseFilters.ACTIVITIES]: adaptAvailableFilters(availableFilters[BaseFilters.ACTIVITIES]),
    [BaseFilters.CITY]: adaptAvailableFilters(availableFilters[BaseFilters.CITY]),
    [BaseFilters.DISTRICT]: adaptAvailableFilters(availableFilters[BaseFilters.DISTRICT]),
    [BaseFilters.THEME]: adaptAvailableFilters(availableFilters[BaseFilters.THEME]),
    [TrekFilters.DIFFICULTY]: adaptAvailableFilters(availableFilters[TrekFilters.DIFFICULTY]),
    [TrekFilters.COURSE_TYPE]: adaptAvailableFilters(availableFilters[TrekFilters.COURSE_TYPE]),
    [TrekFilters.ACCESSIBILITY]: adaptAvailableFilters(availableFilters[TrekFilters.ACCESSIBILITY]),
    [TrekFilters.DURATION]: adaptAvailableFilters(availableFilters[TrekFilters.DURATION]),
    [TrekFilters.LENGTH]: adaptAvailableFilters(availableFilters[TrekFilters.LENGTH]),
    [TrekFilters.POSITIVE_ELEVATION]: adaptAvailableFilters(
      availableFilters[TrekFilters.POSITIVE_ELEVATION],
    ),
  };
};
