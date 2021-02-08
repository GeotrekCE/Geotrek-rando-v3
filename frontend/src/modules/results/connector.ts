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
import { extractNextPageId, formatFiltersToUrlParams } from './utils';

export const getSearchResults = async (
  filtersState: QueryFilterState[],
  pages: {
    treks: number | null;
    touristicContents: number | null;
  },
): Promise<SearchResults> => {
  try {
    let nextTreksPage: number | null = null;
    let nextTouristicContentsPage: number | null = null;
    let treksCount: number | null = null;
    let touristicContentsCount: number | null = null;
    const results: (TrekResult | TouristicContent)[] = [];

    if (pages.treks !== null) {
      const [rawTrekResults, difficulties, themes, activities] = await Promise.all([
        fetchTrekResults({
          language: 'fr',
          page_size: getApiCallsConfig().searchResultsPageSize,
          page: pages.treks ?? undefined,
          ...formatFiltersToUrlParams(filtersState),
        }),
        getDifficulties(),
        getThemes(),
        getActivities(),
      ]);
      const adaptedResultsList: TrekResult[] = adaptTrekResultList({
        resultsList: rawTrekResults.results,
        difficulties,
        themes,
        activities,
      });
      nextTreksPage = extractNextPageId(rawTrekResults.next);
      treksCount = rawTrekResults.count;
      results.push(...adaptedResultsList);
    }
    if (pages.touristicContents !== null) {
      const [rawTouristicContents, touristicContentCategories] = await Promise.all([
        fetchTouristicContent({
          language: 'fr',
          page_size: getApiCallsConfig().searchResultsPageSize,
          page: pages.touristicContents ?? undefined,
        }),
        getTouristicContentCategories(),
      ]);
      const adaptedTouristicContentsList: TouristicContent[] = adaptTouristicContent({
        rawTouristicContent: rawTouristicContents.results,
        touristicContentCategories,
      });
      nextTouristicContentsPage = extractNextPageId(rawTouristicContents.next);
      touristicContentsCount = rawTouristicContents.count;
      results.push(...adaptedTouristicContentsList);
    }

    if (treksCount === null) {
      treksCount = (
        await fetchTrekResultsNumber({
          language: 'fr',
          page_size: 1,
          page: 1,
          ...formatFiltersToUrlParams(filtersState),
        })
      ).count;
    }
    if (touristicContentsCount === null) {
      touristicContentsCount = (
        await fetchTouristicContentResultsNumber({
          language: 'fr',
          page_size: 1,
          page: 1,
        })
      ).count;
    }

    return {
      resultsNumber: treksCount + touristicContentsCount,
      nextPages: {
        treks: nextTreksPage,
        touristicContents: nextTouristicContentsPage,
      },
      results,
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
