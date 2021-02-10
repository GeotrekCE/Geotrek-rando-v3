import { getTouristicContentCategoryFilter } from 'modules/touristicContentCategory/connector';
import { getActivityFilter } from 'modules/activities/connector';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { getAccessibilityFilter } from './accessibility/connector';
import { getCityFilter } from './city/connector';
import { getFiltersConfig } from './config';
import { getDifficultyFilter } from './difficulties/connector';
import { getCourseTypeFilter } from './courseType/connector';
import { getDistrictFilter } from './district/connector';
import {
  Filter,
  FilterConfigWithOptions,
  FilterState,
  FilterWithoutType,
  Option,
} from './interface';
import { getStructureFilter } from './structures/connector';
import { getThemeFilter } from './theme/connector';
import { CITY_ID, PRACTICE_ID, THEME_ID } from './constant';

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
    case PRACTICE_ID:
      return getActivityFilter();
    case CITY_ID:
      return getCityFilter();
    case 'district':
      return getDistrictFilter();
    case THEME_ID:
      return getThemeFilter();
    case 'route':
      return getCourseTypeFilter();
    case 'accessibility':
      return getAccessibilityFilter();
    case 'structure':
      return getStructureFilter();
    case 'service':
      return getTouristicContentCategoryFilter();
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
  console.log('🚀 ~ file: utils.ts ~ line 63 ~ filterId', filterId);

  const filter = await getFilterOptions(filterId);
  console.log('🚀 ~ file: utils.ts ~ line 66 ~ filter', filter);
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

const trekSpecificFilters = [
  'difficulty',
  'duration',
  'length',
  'ascent',
  'route',
  'accessibility',
];
const touristicContentSpecificFilters = ['type1', 'type2'];

export const getFiltersState = async (): Promise<FilterState[]> => {
  const filters = await getFilters();
  return filters.map(filter => ({
    ...filter,
    label: `search.filters.${filter.id}`,
    selectedOptions: [],
  }));
};

export const getTreksFiltersState = (initialFiltersState: FilterState[]): FilterState[] =>
  initialFiltersState.filter(({ id }) => trekSpecificFilters.includes(id));

const getTypesFiltersState = ({
  serviceId,
  touristicContentCategoryMapping,
}: {
  serviceId: string;
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
}): FilterState[] => {
  const getTypeFilterStateForService = (type: 'type1' | 'type2'): FilterState | null =>
    touristicContentCategoryMapping[parseInt(serviceId, 10)][type].label === ''
      ? null
      : {
          id: type,
          label: touristicContentCategoryMapping[parseInt(serviceId, 10)][type].label,
          selectedOptions: [],
          options: touristicContentCategoryMapping[parseInt(serviceId, 10)][type].values,
          type: 'MULTIPLE',
        };
  return [getTypeFilterStateForService('type1'), getTypeFilterStateForService('type2')].filter(
    isElementNotNull,
  );
};

export const computeFiltersToDisplay = ({
  initialFiltersState,
  currentFiltersState,
  selectedFilterId,
  optionsSelected,
  touristicContentCategoryMapping,
}: {
  initialFiltersState: FilterState[];
  currentFiltersState: FilterState[];
  selectedFilterId: string;
  optionsSelected: Option[];
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
}): FilterState[] => {
  const currentNumberOfPracticeOptionsSelected = currentFiltersState[0].selectedOptions.length;
  const currentNumberOfTouristicContentOptionsSelected =
    currentFiltersState[1].selectedOptions.length;
  const numberOfOptionsSelected = optionsSelected.length;

  if (selectedFilterId === 'practice') {
    if (numberOfOptionsSelected === 1 && currentNumberOfPracticeOptionsSelected === 0) {
      if (currentNumberOfTouristicContentOptionsSelected === 0) {
        return [...currentFiltersState, ...getTreksFiltersState(initialFiltersState)];
      }
      if (currentNumberOfTouristicContentOptionsSelected === 1) {
        return currentFiltersState.filter(
          ({ id }) => !touristicContentSpecificFilters.includes(id),
        );
      }
    }
    if (numberOfOptionsSelected === 0 && currentNumberOfPracticeOptionsSelected === 1) {
      if (currentNumberOfTouristicContentOptionsSelected === 0) {
        return currentFiltersState.filter(({ id }) => !trekSpecificFilters.includes(id));
      }
      if (currentNumberOfTouristicContentOptionsSelected === 1) {
        return [
          ...currentFiltersState,
          ...getTypesFiltersState({
            serviceId: currentFiltersState[1].selectedOptions[0].value,
            touristicContentCategoryMapping,
          }),
        ];
      }
    }
  }
  if (selectedFilterId === 'service') {
    if (numberOfOptionsSelected === 1 && currentNumberOfTouristicContentOptionsSelected === 0) {
      if (currentNumberOfPracticeOptionsSelected === 0) {
        return [
          ...currentFiltersState,
          ...getTypesFiltersState({
            serviceId: optionsSelected[0].value,
            touristicContentCategoryMapping,
          }),
        ];
      }
      if (currentNumberOfPracticeOptionsSelected >= 1) {
        return currentFiltersState.filter(({ id }) => !trekSpecificFilters.includes(id));
      }
    }
    if (numberOfOptionsSelected === 2 && currentNumberOfTouristicContentOptionsSelected === 1) {
      if (currentNumberOfPracticeOptionsSelected === 0) {
        return currentFiltersState.filter(
          ({ id }) => !touristicContentSpecificFilters.includes(id),
        );
      }
    }
    if (numberOfOptionsSelected === 1 && currentNumberOfTouristicContentOptionsSelected === 2) {
      if (currentNumberOfPracticeOptionsSelected === 0) {
        return [
          ...currentFiltersState,
          ...getTypesFiltersState({
            serviceId: optionsSelected[0].value,
            touristicContentCategoryMapping,
          }),
        ];
      }
    }
    if (numberOfOptionsSelected === 0 && currentNumberOfTouristicContentOptionsSelected === 1) {
      if (currentNumberOfPracticeOptionsSelected === 0) {
        return currentFiltersState.filter(
          ({ id }) => !touristicContentSpecificFilters.includes(id),
        );
      }
      if (currentNumberOfPracticeOptionsSelected >= 1) {
        return [...currentFiltersState, ...getTreksFiltersState(initialFiltersState)];
      }
    }
  }
  return currentFiltersState;
};
