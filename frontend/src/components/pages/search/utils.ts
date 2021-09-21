import { InfiniteData } from 'react-query';
// @ts-ignore
import { remove as removeDiacritics } from 'diacritics';

import { routes } from 'services/routes';
import { FilterState, Option } from 'modules/filters/interface';
import { SearchResults, TrekResult } from 'modules/results/interface';
import { TouristicContentResult } from 'modules/touristicContent/interface';
import { MapResult } from 'modules/mapResults/interface';

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

export const parseTextFilter = (textFilter: string | null): string | undefined =>
  textFilter !== null ? textFilter : undefined;

export const parseBboxFilter = (bboxFilter: string | null): string | undefined =>
  bboxFilter !== null ? bboxFilter : undefined;

/** Concatenates multiple SearchResults into one with all results concatenated */
export const concatResultsPages = (resultsPages: SearchResults[]): SearchResults | null => {
  if (resultsPages.length === 0) return null;

  const resultsNumber = resultsPages[0].resultsNumber;
  const nextPages = resultsPages[0].nextPages;
  const results = resultsPages.reduce<(TrekResult | TouristicContentResult)[]>(
    (resultsAcc, currentPage) => resultsAcc.concat(currentPage.results),
    [],
  );

  return { resultsNumber, results, nextPages };
};

/** Formats the data of useInfiniteQuery to make it interpretable by the Search page */
export const formatInfiniteQuery = (
  infiniteQueryData: InfiniteData<SearchResults> | undefined,
): SearchResults | null => {
  if (infiniteQueryData === undefined) {
    return null;
  }
  return concatResultsPages(infiniteQueryData?.pages);
};

/** Generates the details page url related to a result */
export const generateResultDetailsUrl = (
  id: number | string,
  title: string,
  parentId?: number,
): string => {
  const titleWithNoSpace = convertStringForSitemap(title);
  const detailsPageUrl = `${routes.DETAILS}/${id}-${encodeURI(titleWithNoSpace)}${
    parentId ? `?parentId=${parentId}` : ''
  }`;

  return detailsPageUrl;
};

export const getHoverId = ({ id, type }: TrekResult | TouristicContentResult | MapResult): string =>
  `SEARCH-${type}-${id}`;

export const convertStringForSitemap = (text: string) =>
  removeDiacritics(
    (text || '')
      .replace(/ /g, '-')
      .replace(/'/g, '-')
      .replace(/°/g, '')
      .replace(/«/g, '')
      .replace(/»/g, '')
      .replace(/"/g, '')
      .replace(/>/g, '')
      .replace(/</g, '')
      .replace(/’/g, '-')
      .replace(/–/g, '-')
      .replace(/%/g, '-')
      .replace(/\+/g, '')
      .replace(/\//g, '')
      .replace(/\\/g, ''),
  );
