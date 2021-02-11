import { QueryFilterState } from 'components/pages/search/utils';
import { getFiltersConfig } from 'modules/filters/config';
import {
  CATEGORY_ID,
  CITY_ID,
  DISTRICT_ID,
  STRUCTURE_ID,
  THEME_ID,
} from 'modules/filters/constant';
import { FilterConfig, FilterConfigWithOptions } from 'modules/filters/interface';

export const formatDistance = (distance: number): string => {
  if (distance >= 1000) {
    return `${roundWithDecimals(distance / 1000)}km`;
  }
  return `${Math.round(distance)}m`;
};

const roundWithDecimals = (number: number, decimals = 1) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(number);
};

// We must initialize our vaariable min and max so min is greater than any possible value and max is lower than any possible values
const MIN_VALUE = 99999;
const MAX_VALUE = -1;
/**
 * Formats an array of selected options into a value understandable by the API
 * @param selectedOptions Array of selected options
 */
export const formatSelectedFilter = (selectedOptions: string[]): string =>
  selectedOptions.join(',');

const getMinAndMaxValueFromSelectedOptions = (options: string[]) =>
  options.reduce(
    (currentMinAndMax, currentOption) => ({
      min:
        currentMinAndMax.min === null
          ? parseInt(currentOption, 10)
          : Math.min(currentMinAndMax.min, parseInt(currentOption, 10)),
      max:
        currentMinAndMax.max === null
          ? parseInt(currentOption, 10)
          : Math.max(currentMinAndMax.max, parseInt(currentOption, 10)),
    }),
    { min: MIN_VALUE, max: MAX_VALUE },
  );

const getMinAndMaxValueFromConfig = ({
  config,
  queryFilterState,
}: {
  config: (FilterConfig | FilterConfigWithOptions)[];
  queryFilterState: QueryFilterState;
}): { [filterId: string]: string } => {
  const filterId = queryFilterState.id;
  const filterConfig = config.find(element => element.id === filterId);
  if (filterConfig === undefined || filterConfig.options === undefined) return {};
  const { min: minSelectedValue, max: maxSelectedValue } = getMinAndMaxValueFromSelectedOptions(
    queryFilterState.selectedOptions,
  );
  let min = '';
  let max = '';
  filterConfig.options.forEach(option => {
    if (option.minValue === minSelectedValue) {
      min = option.minValue.toString();
    }
    if (option.minValue === maxSelectedValue) {
      max = option.maxValue.toString();
    }
  });
  return {
    [`${filterId}_min`]: min,
    [`${filterId}_max`]: max,
  };
};

const getMinAndMaxDifficulty = (difficulties: string[]) => {
  let min = parseInt(difficulties[0], 10);
  let max = parseInt(difficulties[0], 10);
  difficulties.forEach(difficulty => {
    const intDifficulty = parseInt(difficulty, 10);
    min = Math.min(min, intDifficulty);
    max = Math.max(max, intDifficulty);
  });
  return {
    difficulty_min: min.toString(),
    difficulty_max: max.toString(),
  };
};

const formatFilter = (filterState: QueryFilterState) => {
  const config = getFiltersConfig();
  if (filterState.id === 'duration' || filterState.id === 'length' || filterState.id === 'ascent') {
    return getMinAndMaxValueFromConfig({ queryFilterState: filterState, config });
  }
  if (filterState.id === 'difficulty') {
    return getMinAndMaxDifficulty(filterState.selectedOptions);
  }
  return {
    [filterState.id]: formatSelectedFilter(filterState.selectedOptions),
  };
};

/**
 * Formats an array of Filters to an object of query parameters
 * @param filtersState Array of filters
 */
export const formatTrekFiltersToUrlParams = (
  filtersState: QueryFilterState[],
): { [key: string]: string } =>
  filtersState.reduce<{ [key: string]: string }>((queryParameters, currentFilterState) => {
    if (
      currentFilterState.id === CATEGORY_ID ||
      currentFilterState.id === 'type1' ||
      currentFilterState.id === 'type2'
    )
      return queryParameters;
    if (currentFilterState.selectedOptions.length > 0) {
      const filter = formatFilter(currentFilterState);
      return {
        ...queryParameters,
        ...filter,
      };
    } else {
      return queryParameters;
    }
  }, {});

const commonFiltersWithoutTrekSelector = [
  CATEGORY_ID,
  THEME_ID,
  CITY_ID,
  DISTRICT_ID,
  STRUCTURE_ID,
];

export const formatTouristicContentFiltersToUrlParams = (
  filtersState: QueryFilterState[],
): { [key: string]: string } => {
  const filters = filtersState.reduce<{ [key: string]: string[] }>(
    (currentFilters, currentFilterState) => {
      if (currentFilterState.id === 'type1' || currentFilterState.id === 'type2') {
        if (currentFilterState.selectedOptions.length > 0) {
          return {
            ...currentFilters,
            types: [
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              ...(currentFilters.types ? currentFilters.types : []),
              ...currentFilterState.selectedOptions,
            ],
          };
        }
      }
      if (
        commonFiltersWithoutTrekSelector.includes(currentFilterState.id) &&
        currentFilterState.selectedOptions.length > 0
      ) {
        return {
          ...currentFilters,
          [currentFilterState.id]: currentFilterState.selectedOptions,
        };
      }
      return currentFilters;
    },
    {},
  );

  return Object.keys(filters).reduce(
    (joinedFilters, key) => ({
      ...joinedFilters,
      [key]: filters[key].join(','),
    }),
    {},
  );
};

/** Extracts nextPageId from nextPageUrl */
export const extractNextPageId = (nextPageUrl: string | null): number | null => {
  if (nextPageUrl === null) return null;

  const regex = /page=[0-9]*/;
  const matches = regex.exec(nextPageUrl);
  if (matches !== null) return parseInt(matches[0].replace('page=', ''), 10);

  throw Error('results adapter could not parse nextPageUrl to extract nextPageId');
};
