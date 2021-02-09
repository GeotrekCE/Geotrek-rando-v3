import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { getActivities } from 'modules/activities/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { QueryFilterState } from 'components/pages/search/utils';
import { fetchTouristicContent } from 'modules/touristicContent/api';
import { getApiCallsConfig } from 'modules/utils/api.config';
import { TouristicContent } from 'modules/touristicContent/interface';
import { adaptTouristicContent } from 'modules/touristicContent/adapter';

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
  formatTouristicContentFiltersToUrlParams,
  formatTrekFiltersToUrlParams,
} from './utils';

export const getSearchResults = async (
  filtersState: QueryFilterState[],
  pages: {
    treks: number | null;
    touristicContents: number | null;
  },
): Promise<SearchResults> => {
  try {
    const trekFilters = formatTrekFiltersToUrlParams(filtersState);
    const touristicContentFilter = formatTouristicContentFiltersToUrlParams(filtersState);

    // We get the treks and touristic content counts on their own call to handle the "null" next page edge case

    const [{ count: treksCount }, { count: touristicContentsCount }] = await Promise.all([
      fetchTrekResultsNumber({
        language: 'fr',
        page_size: 1,
        page: 1,
        ...trekFilters,
      }),
      fetchTouristicContentResultsNumber({
        language: 'fr',
        page_size: 1,
        page: 1,
        ...touristicContentFilter,
      }),
    ]);

    // Then we prepare the content queries with empty array if the page is null, meaning we reached the end of the pagination for this ressource

    const getTreksResultsPromise =
      pages.treks !== null
        ? fetchTrekResults({
            language: 'fr',
            page_size: getApiCallsConfig().searchResultsPageSize,
            page: pages.treks ?? undefined,
            ...trekFilters,
          })
        : Promise.resolve({
            count: treksCount, // We keep the treks counts event if the query only concerns the touristic content
            next: null,
            previous: null,
            results: [],
          });

    const getToursticContentsPromise =
      pages.touristicContents !== null
        ? fetchTouristicContent({
            language: 'fr',
            page_size: getApiCallsConfig().searchResultsPageSize,
            page: pages.touristicContents ?? undefined,
            ...touristicContentFilter,
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
    ] = await Promise.all([
      getTreksResultsPromise,
      getDifficulties(), // Todo: Find a way to store this hashmap to avoid calling this every time
      getThemes(), // Todo: Find a way to store this hashmap to avoid calling this every time
      getActivities(), // Todo: Find a way to store this hashmap to avoid calling this every time
      getToursticContentsPromise,
      getTouristicContentCategories(), // Todo: Find a way to store this hashmap to avoid calling this every time
    ]);
    const adaptedResultsList: TrekResult[] = adaptTrekResultList({
      resultsList: rawTrekResults.results,
      difficulties,
      themes,
      activities,
    });

    const adaptedTouristicContentsList: TouristicContent[] = adaptTouristicContent({
      rawTouristicContent: rawTouristicContents.results,
      touristicContentCategories,
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

export const getTrekResultsById = async (trekIds: number[]): Promise<TrekResult[]> => {
  try {
    if (trekIds === null || trekIds === undefined || trekIds.length === 0) {
      return [];
    }
    const [difficulties, themes, activities] = await Promise.all([
      getDifficulties(),
      getThemes(),
      getActivities(),
    ]);
    const rawTrekResults = await Promise.all(
      trekIds.map(trekId => fetchTrekResult({ language: 'fr' }, trekId)),
    );
    return adaptTrekResultList({ resultsList: rawTrekResults, difficulties, themes, activities });
  } catch (e) {
    console.error('Error in results connector', e);
    throw e;
  }
};
