import { getActivityFilter } from 'modules/activities/connector';
import { getCityFilter } from './city/connector';
import { getFiltersConfig } from './config';
import { getDifficultyFilter } from './connector/connector';
import { getCourseTypeFilter } from './courseType/connector';
import { getDistrictFilter } from './district/connector';
import { Filter, FilterConfig, FilterConfigWithOptions, FilterState } from './interface';
import { getThemeFilter } from './theme/connector';

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
      return getDifficultyFilter();
    case 'activity':
      return getActivityFilter();
    case 'city':
      return getCityFilter();
    case 'district':
      return getDistrictFilter();
    case 'theme':
      return getThemeFilter();
    case 'courseType':
      return getCourseTypeFilter();
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
