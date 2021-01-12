import { getDifficulties } from './connector';
import { AvailableFilters, BaseFilters, TrekFilters } from './interface';

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
