import { getActivityFilter } from 'modules/activities/connector';
import { getAccessibilityFilter } from './accessibility/connector';
import { getCityFilter } from './city/connector';
import { getFiltersConfig } from './config';
import { getDifficultyFilter } from './difficulties/connector';
import { getCourseTypeFilter } from './courseType/connector';
import { getDistrictFilter } from './district/connector';
import { Filter, FilterConfigWithOptions, FilterState, FilterWithoutType } from './interface';
import { getStructureFilter } from './structures/connector';
import { getThemeFilter } from './theme/connector';

const adaptFilterConfigWithOptionsToFilter = (
  filterConfigWithOptions: FilterConfigWithOptions,
): Filter => ({
  id: filterConfigWithOptions.id,
  type: filterConfigWithOptions.type,
  options: filterConfigWithOptions.options.map(option => ({
    value: `${option.minValue}`,
    label: option.label,
  })),
});

const getFilterOptions = async (filterId: string): Promise<FilterWithoutType | null> => {
  switch (filterId) {
    case 'difficulty':
      return getDifficultyFilter();
    case 'practice':
      return getActivityFilter();
    case 'city':
      return getCityFilter();
    case 'district':
      return getDistrictFilter();
    case 'theme':
      return getThemeFilter();
    case 'courseType':
      return getCourseTypeFilter();
    case 'accessibility':
      return getAccessibilityFilter();
    case 'structure':
      return getStructureFilter();
    default:
      return null;
  }
};

const isElementNotNull = <ElementType>(element: ElementType | null): element is ElementType =>
  element !== null;

const getFilterAndAddType = async (
  filterId: string,
  filterType: 'SINGLE' | 'MULTIPLE',
): Promise<Filter | null> => {
  const filter = await getFilterOptions(filterId);
  if (filter === null) return null;
  return { ...filter, type: filterType };
};

const getFilters = async (): Promise<Filter[]> => {
  const config = getFiltersConfig();
  const filters = await Promise.all(
    config.map(filterConfig => {
      if (filterConfig.options !== undefined) {
        return adaptFilterConfigWithOptionsToFilter(filterConfig);
      }
      return getFilterAndAddType(filterConfig.id, filterConfig.type);
    }),
  );
  return filters.filter(isElementNotNull);
};

export const getFiltersState = async (): Promise<FilterState[]> => {
  const filters = await getFilters();
  return filters.map(filter => ({
    ...filter,
    label: `search.filters.${filter.id}`,
    status: 'ENABLED',
    selectedOptions: [],
  }));
};
