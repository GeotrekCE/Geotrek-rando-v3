import { InfiniteData } from 'react-query';

import { routes } from 'services/routes';
import { FilterState, Option } from 'modules/filters/interface';
import { TrekResult, TrekResults } from 'modules/results/interface';

/**
 * Interface of an objet representing a filter state informations
 * suitable for a backend query
 */
export interface QueryFilterState {
  /** Name of the API parameter */
  id: string;
  /** Selected values to query */
  selectedOptions: string[];
}

/** Transforms an option array into one suitable for the API query */
export const parseSelectedOptions = (selectedOptions: Option[]): string[] =>
  selectedOptions.map(selectedOption => selectedOption.value);

/** Transforms a FilterState object into one suitable for the API query */
export const parseFilter = (filter: FilterState): QueryFilterState => ({
  id: filter.id,
  selectedOptions: parseSelectedOptions(filter.selectedOptions),
});

/** Transforms a FilterState array into one suitable for the API query */
export const parseFilters = (filters: FilterState[]): QueryFilterState[] =>
  filters.map(parseFilter);

/** Concatenates multiple TrekResults into one with all results concatenated */
export const concatResultsPages = (resultsPages: TrekResults[]): TrekResults | null => {
  if (resultsPages.length === 0) return null;

  const resultsNumber = resultsPages[0].resultsNumber;
  const nextPages = resultsPages[0].nextPages;
  const results = resultsPages.reduce<TrekResult[]>(
    (resultsAcc, currentPage) => resultsAcc.concat(currentPage.results),
    [],
  );

  return { resultsNumber, results, nextPages };
};

/** Formats the data of useInfiniteQuery to make it interpretable by the Search page */
export const formatInfiniteQuery = (
  infiniteQueryData: InfiniteData<TrekResults> | undefined,
): TrekResults | null => {
  if (infiniteQueryData === undefined) {
    return null;
  }
  return concatResultsPages(infiniteQueryData?.pages);
};

/** Generates the details page url related to a result */
export const generateResultDetailsUrl = (id: number, title: string) => {
  const titleWithNoSpace = title.replace(/ /g, '-');
  const detailsPageUrl = `${routes.DETAILS}-${id}-${encodeURI(titleWithNoSpace)}`;

  return detailsPageUrl;
};
