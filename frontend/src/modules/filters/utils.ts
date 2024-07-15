import { uniqBy } from 'modules/utils/array';
import { getTouristicContentCategoryFilter } from 'modules/touristicContentCategory/connector';
import { getActivityFilter } from 'modules/activities/connector';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { getLabelsFilter } from 'modules/label/connector';

import { ParsedUrlQuery } from 'querystring';
import { getOutdoorPracticesFilter } from '../outdoorPractice/connector';
import { OutdoorPracticeChoices } from '../outdoorPractice/interface';
import { OutdoorRatingMapping } from '../outdoorRating/interface';
import { OutdoorRatingScale } from '../outdoorRatingScale/interface';
import { getTouristicEventTypesFilter } from '../touristicEventType/connector';
import { getAccessibilityFilter } from './accessibility/connector';
import { getCityFilter } from './city/connector';
import { getFiltersConfig } from './config';
import { getDifficultyFilter } from './difficulties/connector';
import { getCourseTypeFilter } from './courseType/connector';
import { getDistrictFilter } from './district/connector';
import {
  Filter,
  FilterConfig,
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
  DATE_FILTER,
  DISTRICT_ID,
  EVENT_ID,
  LABEL_EXCLUDE_ID,
  LABEL_ID,
  NETWORKS_ID,
  ORGANIZER_ID,
  OUTDOOR_ID,
  PRACTICE_ID,
  ROUTE_ID,
  STRUCTURE_ID,
  THEME_ID,
} from './constant';
import { getOrganizerFilter } from './organizer/connector';
import { getNetworksFilter } from './networks/connector';

const adaptFilterConfigWithOptionsToFilter = (
  filterConfigWithOptions: FilterConfigWithOptions,
): Filter => ({
  id: filterConfigWithOptions.id,
  type: filterConfigWithOptions.type,
  options: filterConfigWithOptions.options.map(option => ({
    value: `${option.minValue}`,
    label: option.label,
    translatedKey: option.translatedKey,
  })),
});

const getFilterOptions = async (
  filterId: string,
  language: string,
  withExclude = false,
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
    case OUTDOOR_ID:
      return getOutdoorPracticesFilter(language);
    case EVENT_ID:
      return getTouristicEventTypesFilter(language);
    case LABEL_ID:
    case LABEL_EXCLUDE_ID:
      return getLabelsFilter(language, withExclude);
    case NETWORKS_ID:
      return getNetworksFilter(language);
    case ORGANIZER_ID:
      return getOrganizerFilter(language);
    default:
      return null;
  }
};

const isElementNotNull = <ElementType>(element: ElementType | null): element is ElementType =>
  element !== null;

const getFilterAndAddType = async (
  { id, type, withExclude }: FilterConfig,
  language: string,
): Promise<Filter | null> => {
  const filter = await getFilterOptions(id, language, withExclude);
  if (filter === null) return null;
  return { ...filter, type };
};

const getFilters = async (language: string): Promise<Filter[]> => {
  const config = getFiltersConfig();
  const adaptFiltersConfig = config.flatMap(({ withExclude, ...item }) => {
    if (withExclude === true) {
      return [item, { ...item, id: `${item.id}_exclude`, withExclude }];
    }
    return [item];
  });

  const filters = await Promise.all(
    adaptFiltersConfig.map(filterConfig => {
      if (filterConfig.options !== undefined) {
        return adaptFilterConfigWithOptionsToFilter(filterConfig);
      }
      return getFilterAndAddType(filterConfig, language);
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
  NETWORKS_ID,
  'labels',
  'labels_exclude',
];

export const commonFilters = [
  PRACTICE_ID,
  CATEGORY_ID,
  OUTDOOR_ID,
  EVENT_ID,
  THEME_ID,
  CITY_ID,
  DISTRICT_ID,
  STRUCTURE_ID,
];

export const getTreksFiltersState = (initialFiltersState: FilterState[]): FilterState[] =>
  initialFiltersState.filter(({ id }) => trekSpecificFilters.includes(id));

export const getFiltersState = async (language: string): Promise<FilterState[]> => {
  const filters = await getFilters(language);

  return [
    ...filters.map(filter => ({
      ...filter,
      label: `search.filters.${filter.id}`.replace('_exclude', ''),
      selectedOptions: [],
    })),
  ];
};

const getTypesFiltersState = ({
  serviceId,
  touristicContentCategoryMapping,
}: {
  serviceId: string;
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
}): FilterState[] => {
  const data = touristicContentCategoryMapping[parseInt(serviceId, 10)];

  if (!data) return [];

  return data.map(i => {
    return {
      id: `type-services-${i.id}`,
      category: i.category,
      label: i.label,
      type: 'MULTIPLE',
      options: i.values.map(item => ({ ...item, value: `${item.value}` })),
      selectedOptions: [],
    };
  });
};

const getOutdoorRatingFiltersState = ({
  practiceId,
  outdoorRatingMapping,
  outdoorRatingScale,
  outdoorPractice,
}: {
  practiceId: string;
  outdoorRatingMapping: OutdoorRatingMapping;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorPractice: OutdoorPracticeChoices;
}): FilterState[] => {
  const result: FilterState[] = [];
  const scales = outdoorRatingScale.filter(i => String(i.practice) === practiceId);

  if (scales.length > 0) {
    scales.forEach(scale => {
      const data = outdoorRatingMapping[scale.id];

      if (data)
        result.push({
          id: `type-outdoorRating-${String(scale.id)}`,
          category: String(outdoorPractice?.[scale.practice]?.label),
          label: scale?.name ?? 'Error',
          type: 'MULTIPLE',
          options: data.map(i => ({
            value: `${i.id}`,
            label: i.name,
          })),
          selectedOptions: [],
        });
    });
  }

  return result;
};

const getEventsFiltersState = (organizerEvent: FilterWithoutType | null): FilterState[] => {
  const result: FilterState[] = [];
  result.push({
    id: DATE_FILTER,
    category: 'event',
    label: 'event date filter',
    type: 'MULTIPLE',
    options: [],
    selectedOptions: [],
  });

  if (organizerEvent !== null) {
    result.push({
      id: ORGANIZER_ID,
      category: 'event',
      label: 'search.filters.organizer',
      type: 'MULTIPLE',
      options: organizerEvent.options,
      selectedOptions: [],
    });
  }

  return result;
};

export const computeFiltersToDisplay = ({
  initialFiltersState,
  currentFiltersState,
  selectedFilterId,
  touristicContentCategoryMapping,
  outdoorRatingMapping,
  outdoorRatingScale,
  outdoorPractice,
  organizerEvent,
}: {
  initialFiltersState: FilterState[];
  currentFiltersState: FilterState[];
  selectedFilterId: string;
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
  outdoorRatingMapping: OutdoorRatingMapping;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorPractice: OutdoorPracticeChoices;
  organizerEvent: FilterWithoutType | null;
}): FilterState[] => {
  const trekPracticeFilter = currentFiltersState.find(i => i.id === PRACTICE_ID);
  const touristicContentFilter = currentFiltersState.find(i => i.id === CATEGORY_ID);
  const outdoorPracticeFilter = currentFiltersState.find(i => i.id === OUTDOOR_ID);
  const eventFilter = currentFiltersState.find(i => i.id === EVENT_ID);

  const currentNumberOfPracticeOptionsSelected = trekPracticeFilter?.selectedOptions.length ?? 0;
  const currentNumberOfTouristicContentOptionsSelected =
    touristicContentFilter?.selectedOptions.length ?? 0;
  const currentNumberOfOutdoorPraticeOptionsSelected =
    outdoorPracticeFilter?.selectedOptions.length ?? 0;
  const currentNumberOfEventsOptionsSelected = eventFilter?.selectedOptions.length ?? 0;

  const filtersToAdd: FilterState[][] = [];

  // *** Calculate which filters to display ***
  // Treks filters
  if (currentNumberOfPracticeOptionsSelected > 0) {
    filtersToAdd.push(getTreksFiltersState(initialFiltersState));
  }
  // Services filters
  if (currentNumberOfTouristicContentOptionsSelected > 0 || selectedFilterId === CATEGORY_ID) {
    touristicContentFilter?.selectedOptions.forEach(selectedOptions => {
      filtersToAdd.push(
        getTypesFiltersState({
          serviceId: selectedOptions.value,
          touristicContentCategoryMapping,
        }),
      );
    });
  }
  // Outdoor filters
  if (currentNumberOfOutdoorPraticeOptionsSelected > 0 || selectedFilterId === OUTDOOR_ID) {
    outdoorPracticeFilter?.selectedOptions.forEach(selectedOptions => {
      filtersToAdd.push(
        getOutdoorRatingFiltersState({
          practiceId: selectedOptions.value,
          outdoorRatingMapping,
          outdoorRatingScale,
          outdoorPractice,
        }),
      );
    });
  }
  // Event filters
  if (currentNumberOfEventsOptionsSelected > 0 || selectedFilterId === EVENT_ID) {
    eventFilter?.selectedOptions.forEach(() => {
      filtersToAdd.push(getEventsFiltersState(organizerEvent));
    });
  }

  // Prevent old filters to display
  const filtersToAddIds = filtersToAdd.flat().map(i => i.id);
  const filtersToExcludeIds = currentFiltersState
    .filter(i => !filtersToAddIds.includes(i.id) && !commonFilters.includes(i.id))
    .map(i => i.id);
  const currentFiltersStateToDisplay = currentFiltersState.filter(
    i => !filtersToExcludeIds.includes(i.id),
  );

  return uniqBy([...currentFiltersStateToDisplay, ...filtersToAdd.flat()], 'id');
};

const getInitialFiltersStateWithRelevantFilters = ({
  initialFiltersState,
  initialOptions,
  touristicContentCategoryMapping,
  outdoorRatingMapping,
  outdoorRatingScale,
  outdoorPractice,
  organizerEvent,
}: {
  initialFiltersState: FilterState[];
  initialOptions: { [filterId: string]: string[] | undefined };
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
  outdoorRatingMapping: OutdoorRatingMapping;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorPractice: OutdoorPracticeChoices;
  organizerEvent: FilterWithoutType | null;
}): FilterState[] => {
  const initialStateWithOnlyCommon = initialFiltersState.filter(({ id }) =>
    commonFilters.includes(id),
  );
  const practices = initialOptions[PRACTICE_ID];
  const services = initialOptions[CATEGORY_ID];
  const outdoorPractices = initialOptions[OUTDOOR_ID];
  const events = initialOptions[EVENT_ID];

  const result = [...initialStateWithOnlyCommon];

  if (Number(practices?.length) > 0) {
    result.push(...getTreksFiltersState(initialFiltersState));
  }

  if (Number(services?.length) > 0) {
    services?.forEach(service => {
      result.push(
        ...getTypesFiltersState({
          serviceId: service,
          touristicContentCategoryMapping,
        }),
      );
    });
  }

  if (Number(outdoorPractices?.length) > 0) {
    outdoorPractices?.forEach(outdoorPratice => {
      result.push(
        ...getOutdoorRatingFiltersState({
          practiceId: outdoorPratice,
          outdoorRatingMapping,
          outdoorRatingScale,
          outdoorPractice,
        }),
      );
    });
  }

  if (Number(events?.length) > 0) {
    result.push(...getEventsFiltersState(organizerEvent));
  }

  return result;
};

const sanitizeInitialOptions = (initialOptions: ParsedUrlQuery): { [filterId: string]: string[] } =>
  Object.entries(initialOptions).reduce(
    (sanitizedOptions, [key, value]) => ({
      ...sanitizedOptions,
      ...(value === '' || value === undefined
        ? {}
        : { [key]: Array.isArray(value) ? value : value.split(',') }),
    }),
    {},
  );

export const getInitialFiltersStateWithSelectedOptions = ({
  initialFiltersState,
  initialOptions,
  touristicContentCategoryMapping,
  outdoorRatingMapping,
  outdoorRatingScale,
  outdoorPractice,
  organizerEvent,
}: {
  initialFiltersState: FilterState[];
  initialOptions: ParsedUrlQuery;
  touristicContentCategoryMapping: TouristicContentCategoryMapping;
  outdoorRatingMapping: OutdoorRatingMapping;
  outdoorRatingScale: OutdoorRatingScale[];
  outdoorPractice: OutdoorPracticeChoices;
  organizerEvent: FilterWithoutType | null;
}): FilterState[] => {
  const sanitizedInitialOptions = sanitizeInitialOptions(initialOptions);
  const initialFiltersStateWithRelevantFilters = getInitialFiltersStateWithRelevantFilters({
    initialFiltersState,
    initialOptions: sanitizedInitialOptions,
    touristicContentCategoryMapping,
    outdoorRatingMapping,
    outdoorRatingScale,
    outdoorPractice,
    organizerEvent,
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

const getTranslatedOptions = (selectedOptions: Option[], translatedOptions: Option[]) => {
  const translatedSelectedOptions = selectedOptions.map(selectedOption => {
    const translatedSelectedOption = translatedOptions.find(
      ({ value }) => value === selectedOption.value,
    );
    if (translatedSelectedOption === undefined) return null;
    return translatedSelectedOption;
  });
  return translatedSelectedOptions.filter(isElementNotNull);
};

export const getNewLanguageFiltersState = (
  filtersState: FilterState[],
  translatedInitialFiltersState: FilterState[],
): FilterState[] => {
  const translatedFiltersState = filtersState.map(filterState => {
    const translatedFilterState = translatedInitialFiltersState.find(
      ({ id }) => id === filterState.id,
    );
    if (translatedFilterState === undefined) return null;

    return {
      ...filterState,
      label: translatedFilterState.label,
      options: translatedFilterState.options,
      selectedOptions: getTranslatedOptions(
        filterState.selectedOptions,
        translatedFilterState.options,
      ),
    };
  });
  return translatedFiltersState.filter(isElementNotNull);
};

export const countFiltersSelected = (
  filtersState: FilterState[],
  filters: string[] | null = [],
  subFilters: string[] | string[][] | null = [],
): number => {
  const subFiltersToDisplay = filtersState.filter(({ id }) => subFilters?.flat().includes(id));
  const filtersToDisplay = filtersState.filter(
    ({ id }) => filters?.includes(id) ?? filters === null,
  );

  return [...subFiltersToDisplay, ...filtersToDisplay].reduce(
    (acc, state) => state.selectedOptions.length + acc,
    0,
  );
};
