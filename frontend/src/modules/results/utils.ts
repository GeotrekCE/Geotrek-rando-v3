import { QueryFilterState } from 'components/pages/search/utils';

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

/**
 * Formats an array of selected options into a value understandable by the API
 * @param selectedOptions Array of selected options
 */
export const formatSelectedFilter = (selectedOptions: string[]): string =>
  selectedOptions.join(',');

/**
 * Formats an array of Filters to an object of query parameters
 * @param filtersState Array of filters
 */
export const formatFiltersToUrlParams = (
  filtersState: QueryFilterState[],
): { [key: string]: string } =>
  filtersState.reduce<{ [key: string]: string }>(
    (queryParameters, currentFilterState) =>
      currentFilterState.selectedOptions.length > 0
        ? {
            ...queryParameters,
            [currentFilterState.id]: formatSelectedFilter(currentFilterState.selectedOptions),
          }
        : queryParameters,
    {},
  );

/** Extracts nextPageId from nextPageUrl */
export const extractNextPageId = (nextPageUrl: string): string | undefined => {
  const regex = /page=[0-9]*/;
  return regex.exec(nextPageUrl)?.[0].replace('page=', '');
};
