import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { getActivities } from 'modules/activities/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { CATEGORY_ID, PRACTICE_ID } from 'modules/filters/constant';
import { QueryFilterState } from 'components/pages/search/utils';
import { fetchTouristicContentResult } from 'modules/touristicContent/api';
import { getGlobalConfig } from 'modules/utils/api.config';
import { TouristicContentResult } from 'modules/touristicContent/interface';
import { getCities } from 'modules/city/connector';
import { adaptTouristicContentResult } from 'modules/touristicContent/adapter';

import { adaptTrekResultList } from './adapter';
import {
  fetchTouristicContentResultsNumber,
  fetchTrekResult,
  fetchTrekResults,
  fetchTrekResultsNumber,
} from './api';
import { SearchResults, TrekResult } from './interface';
import {
  extractNextPageId,
  formatTextFilter,
  formatTouristicContentFiltersToUrlParams,
  formatTrekFiltersToUrlParams,
} from './utils';

const emptyResultPromise = Promise.resolve({
  count: 0,
  next: null,
  previous: null,
  results: [],
});

export const getSearchResults = async (
  filters: { filtersState: QueryFilterState[]; textFilterState: string | null },
  pages: {
    treks: number | null;
    touristicContents: number | null;
  },
  language: string,
): Promise<SearchResults> => {
  const { filtersState, textFilterState } = filters;

  try {
    const practiceFilter = filtersState.find(({ id }) => id === PRACTICE_ID);
    const isPracticeSelected = practiceFilter ? practiceFilter.selectedOptions.length > 0 : false;
    const serviceFilter = filtersState.find(({ id }) => id === CATEGORY_ID);
    const isServiceSelected = serviceFilter ? serviceFilter.selectedOptions.length > 0 : false;

    const shouldFetchTreks = !isServiceSelected || isPracticeSelected;
    const shouldFetchTouristicContents = !isPracticeSelected || isServiceSelected;

    const trekFilters = formatTrekFiltersToUrlParams(filtersState);
    const touristicContentFilter = formatTouristicContentFiltersToUrlParams(filtersState);

    const textFilter = formatTextFilter(textFilterState);

    // We get the treks and touristic content counts on their own call to handle the "null" next page edge case

    const getTreksCountPromise = shouldFetchTreks
      ? fetchTrekResultsNumber({
          language,
          page_size: 1,
          page: 1,
          ...trekFilters,
          ...textFilter,
        })
      : emptyResultPromise;
    const getTouristicContentsCountPromise = shouldFetchTouristicContents
      ? fetchTouristicContentResultsNumber({
          language,
          page_size: 1,
          page: 1,
          ...touristicContentFilter,
          ...textFilter,
        })
      : emptyResultPromise;

    const [{ count: treksCount }, { count: touristicContentsCount }] = await Promise.all([
      getTreksCountPromise,
      getTouristicContentsCountPromise,
    ]);

    // Then we prepare the content queries with empty array if the page is null, meaning we reached the end of the pagination for this ressource

    const getTreksResultsPromise =
      pages.treks !== null
        ? fetchTrekResults({
            language,
            page_size: getGlobalConfig().searchResultsPageSize,
            page: pages.treks ?? undefined,
            ...trekFilters,
            ...textFilter,
          })
        : Promise.resolve({
            count: treksCount, // We keep the treks counts event if the query only concerns the touristic content
            next: null,
            previous: null,
            results: [],
          });

    const getToursticContentsPromise =
      pages.touristicContents !== null
        ? fetchTouristicContentResult({
            language,
            page_size: getGlobalConfig().searchResultsPageSize,
            page: pages.touristicContents ?? undefined,
            ...touristicContentFilter,
            ...textFilter,
          })
        : Promise.resolve({
            count: touristicContentsCount, // We keep the touristic content counts event if the query only concerns the treks
            next: null,
            previous: null,
            results: [],
          });

    // Then we perform the actual call, querying the required hashmaps by the way

    const [
      rawTrekResults,
      difficulties,
      themes,
      activities,
      rawTouristicContents,
      touristicContentCategories,
      themeDictionnary,
      cityDictionnary,
    ] = await Promise.all([
      shouldFetchTreks ? getTreksResultsPromise : emptyResultPromise,
      getDifficulties(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      getThemes(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      getActivities(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      shouldFetchTouristicContents ? getToursticContentsPromise : emptyResultPromise,
      getTouristicContentCategories(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      getThemes(language),
      getCities(language),
    ]);
    const adaptedResultsList: TrekResult[] = adaptTrekResultList({
      resultsList: rawTrekResults.results,
      difficulties,
      themes,
      activities,
      cityDictionnary,
    });

    const adaptedTouristicContentsList: TouristicContentResult[] = adaptTouristicContentResult({
      rawTouristicContent: rawTouristicContents.results,
      touristicContentCategories,
      themeDictionnary,
      cityDictionnary,
    });

    const nextTreksPage = extractNextPageId(rawTrekResults.next);
    const nextTouristicContentsPage = extractNextPageId(rawTouristicContents.next);

    return {
      resultsNumber: treksCount + touristicContentsCount,
      nextPages: {
        treks: nextTreksPage,
        touristicContents: nextTouristicContentsPage,
      },
      results: [...adaptedResultsList, ...adaptedTouristicContentsList],
    };
  } catch (e) {
    console.error('Error in connector / results', e);
    throw e;
  }
};

export const getTrekResultsById = async (
  trekIds: number[],
  language: string,
): Promise<TrekResult[]> => {
  try {
    if (trekIds === null || trekIds === undefined || trekIds.length === 0) {
      return [];
    }
    const [difficulties, themes, activities, cityDictionnary] = await Promise.all([
      getDifficulties(language),
      getThemes(language),
      getActivities(language),
      getCities(language),
    ]);
    const rawTrekResults = await Promise.all(
      trekIds.map(trekId => fetchTrekResult({ language }, trekId)),
    );
    return adaptTrekResultList({
      resultsList: rawTrekResults,
      difficulties,
      themes,
      activities,
      cityDictionnary,
    });
  } catch (e) {
    console.error('Error in results connector', e);
    throw e;
  }
};
