import { getDifficulties } from './connector';
import { AvailableFilters, BaseFilters, TrekFilters } from './interface';

export const getAvailableFilters = async (): Promise<AvailableFilters> => {
  const difficulties = await getDifficulties();
  return {
    [BaseFilters.ACTIVITIES]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${BaseFilters.ACTIVITIES}`,
      choices: {},
    },
    [BaseFilters.CITY]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${BaseFilters.CITY}`,
      choices: {},
    },
    [BaseFilters.DISTRICT]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${BaseFilters.DISTRICT}`,
      choices: {},
    },
    [BaseFilters.THEME]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${BaseFilters.THEME}`,
      choices: {},
    },
    [TrekFilters.DIFFICULTY]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${TrekFilters.DIFFICULTY}`,
      choices: difficulties,
    },
    [TrekFilters.COURSE_TYPE]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${TrekFilters.COURSE_TYPE}`,
      choices: {},
    },
    [TrekFilters.ACCESSIBILITY]: {
      status: 'ENABLED',
      source: 'API',
      label: `search.filter.${TrekFilters.ACCESSIBILITY}`,
      choices: {},
    },
    [TrekFilters.DURATION]: {
      status: 'ENABLED',
      source: 'USER',
      label: `search.filter.${TrekFilters.DURATION}`,
      choices: {},
    },
    [TrekFilters.LENGTH]: {
      status: 'ENABLED',
      source: 'USER',
      label: `search.filter.${TrekFilters.LENGTH}`,
      choices: {},
    },
    [TrekFilters.POSITIVE_ELEVATION]: {
      status: 'ENABLED',
      source: 'USER',
      label: `search.filter.${TrekFilters.POSITIVE_ELEVATION}`,
      choices: {},
    },
  };
};
