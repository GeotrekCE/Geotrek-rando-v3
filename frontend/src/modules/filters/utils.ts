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
import {
  ACCESSIBILITY_ID,
  CATEGORY_ID,
  CITY_ID,
  DISTRICT_ID,
  PRACTICE_ID,
  ROUTE_ID,
  STRUCTURE_ID,
  THEME_ID,
} from './constant';

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

const getFilterOptions = async (
  filterId: string,
  language: string,
): Promise<FilterWithoutType | null> => {
  switch (filterId) {
    case 'difficulty':
      return getDifficultyFilter(language);
    case PRACTICE_ID:
      return getActivityFilter(language);
    case CITY_ID:
      return getCityFilter(language);
    case DISTRICT_ID:
      return getDistrictFilter(language);
    case THEME_ID:
      return getThemeFilter(language);
    case ROUTE_ID:
      return getCourseTypeFilter(language);
    case ACCESSIBILITY_ID:
      return getAccessibilityFilter(language);
    case STRUCTURE_ID:
      return getStructureFilter(language);
    case CATEGORY_ID:
      return getTouristicContentCategoryFilter(language);
    default:
      return null;
  }
};

const isElementNotNull = <ElementType>(element: ElementType | null): element is ElementType =>
  element !== null;

const getFilterAndAddType = async (
  filterId: string,
  filterType: 'SINGLE' | 'MULTIPLE',
  language: string,
): Promise<Filter | null> => {
  const filter = await getFilterOptions(filterId, language);
  if (filter === null) return null;
  return { ...filter, type: filterType };
};

const getFilters = async (language: string): Promise<Filter[]> => {
  const config = getFiltersConfig();
  const filters = await Promise.all(
    config.map(filterConfig => {
      if (filterConfig.options !== undefined) {
        return adaptFilterConfigWithOptionsToFilter(filterConfig);
      }
      return getFilterAndAddType(filterConfig.id, filterConfig.type, language);
    }),
  );
  return filters.filter(isElementNotNull);
};

const trekSpecificFilters = [
  'difficulty',
  'duration',
  'length',
  'ascent',
  ROUTE_ID,
  ACCESSIBILITY_ID,
];
const touristicContentSpecificFilters = ['type1', 'type2'];

export const commonFilters = [
  PRACTICE_ID,
  CATEGORY_ID,
  THEME_ID,
  CITY_ID,
  DISTRICT_ID,
  STRUCTURE_ID,
];

export const getFiltersState = async (language: string): Promise<FilterState[]> => {
  const filters = await getFilters(language);
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

  if (selectedFilterId === PRACTICE_ID) {
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
  if (selectedFilterId === CATEGORY_ID) {
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

const getInitialFiltersStateWithRelevantFilters = ({
  initialFiltersState,
  initialOptions,
  touristicContentCategoryMapping,
}: {
  initialFiltersState: FilterState[];
  initialOptions: { [filterId: string]: string[] | undefined };
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
}): FilterState[] => {
  const initialStateWithOnlyCommon = initialFiltersState.filter(({ id }) =>
    commonFilters.includes(id),
  );
  const practices = initialOptions[PRACTICE_ID];
  const services = initialOptions[CATEGORY_ID];
  if (practices !== undefined && practices.length > 0 && services === undefined) {
    return [...initialStateWithOnlyCommon, ...getTreksFiltersState(initialFiltersState)];
  }
  if (practices === undefined && services !== undefined && services.length === 1) {
    return [
      ...initialStateWithOnlyCommon,
      ...getTypesFiltersState({
        serviceId: services[0],
        touristicContentCategoryMapping,
      }),
    ];
  }
  return initialStateWithOnlyCommon;
};

const sanitizeInitialOptions = (initialOptions: {
  [filterId: string]: string;
}): { [filterId: string]: string[] } =>
  Object.keys(initialOptions).reduce(
    (sanitizedOptions, key) => ({
      ...sanitizedOptions,
      ...(initialOptions[key] === '' ? {} : { [key]: initialOptions[key].split(',') }),
    }),
    {},
  );

export const getInitialFiltersStateWithSelectedOptions = ({
  initialFiltersState,
  initialOptions,
  touristicContentCategoryMapping,
}: {
  initialFiltersState: FilterState[];
  initialOptions: { [filterId: string]: string };
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
}): FilterState[] => {
  const sanitizedInitialOptions = sanitizeInitialOptions(initialOptions);
  const initialFiltersStateWithRelevantFilters = getInitialFiltersStateWithRelevantFilters({
    initialFiltersState,
    initialOptions: sanitizedInitialOptions,
    touristicContentCategoryMapping,
  });
  return initialFiltersStateWithRelevantFilters.reduce<FilterState[]>(
    (initialStateWithSelectedOptions, currentFilterState) => {
      const selectedOptionsIds = sanitizedInitialOptions[currentFilterState.id];
      if (selectedOptionsIds === undefined) {
        return [...initialStateWithSelectedOptions, currentFilterState];
      }
      return [
        ...initialStateWithSelectedOptions,
        {
          ...currentFilterState,
          selectedOptions: currentFilterState.options.filter(({ value }) =>
            selectedOptionsIds.includes(`${value}`),
          ),
        },
      ];
    },
    [],
  );
};
