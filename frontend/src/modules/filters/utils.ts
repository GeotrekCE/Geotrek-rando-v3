import { getConfigOld, getFiltersConfig } from './config';
import { getDifficulties } from './connector/index';
import {
  AvailableFilters,
  BaseFilters,
  DisplayableAvailableFilters,
  DisplayableFilter,
  Filter,
  FilterConfig,
  FilterConfigWithOptions,
  FilterState,
  TrekFilters,
} from './interface';

const adaptFilterConfigWithOptionsToFilter = (
  filterConfigWithOptions: FilterConfigWithOptions,
): Filter => ({
  id: filterConfigWithOptions.id,
  options: filterConfigWithOptions.options.map(option => ({
    value: `${option.minValue}`,
    label: option.label,
  })),
});

const getFilterOptions = async (filterConfig: FilterConfig): Promise<Filter | null> => {
  switch (filterConfig.id) {
    case 'difficulty':
      return getDifficulties();
    default:
      return null;
  }
};

const isElementNotNull = <ElementType>(element: ElementType | null): element is ElementType =>
  element !== null;

const getFilters = async (): Promise<Filter[]> => {
  const config = getFiltersConfig();
  const filters = await Promise.all(
    config.map(filterConfig => {
      if (filterConfig.options !== undefined) {
        return adaptFilterConfigWithOptionsToFilter(filterConfig);
      }
      return getFilterOptions(filterConfig);
    }),
  );
  return filters.filter(isElementNotNull);
};

export const getFiltersState = async (): Promise<FilterState[]> => {
  const filters = await getFilters();
  return filters.map(filter => ({
    ...filter,
    label: `search.filters.${filter.id}`,
    selectedOptions: [],
  }));
};

const getAvailableFiltersOld = async (): Promise<AvailableFilters> => {
  const config = getConfigOld();

  const difficulties = await getDifficulties();

  return {
    [BaseFilters.ACTIVITIES]: {
      ...config[BaseFilters.ACTIVITIES],
      choices: {},
    },
    [BaseFilters.CITY]: {
      ...config[BaseFilters.CITY],
      choices: {},
    },
    [BaseFilters.DISTRICT]: {
      ...config[BaseFilters.DISTRICT],
      choices: {},
    },
    [BaseFilters.THEME]: {
      ...config[BaseFilters.THEME],
      choices: {},
    },
    [TrekFilters.DIFFICULTY]: {
      ...config[TrekFilters.DIFFICULTY],
      choices: difficulties,
    },
    [TrekFilters.COURSE_TYPE]: {
      ...config[TrekFilters.COURSE_TYPE],
      choices: {},
    },
    [TrekFilters.ACCESSIBILITY]: {
      ...config[TrekFilters.ACCESSIBILITY],
      choices: {},
    },
    [TrekFilters.DURATION]: {
      ...config[TrekFilters.DURATION],
    },
    [TrekFilters.LENGTH]: {
      ...config[TrekFilters.LENGTH],
    },
    [TrekFilters.POSITIVE_ELEVATION]: {
      ...config[TrekFilters.POSITIVE_ELEVATION],
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
  const availableFilters = await getAvailableFiltersOld();
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
