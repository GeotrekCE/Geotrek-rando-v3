import { getActivities } from 'modules/activities/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { QueryFilterState } from 'components/pages/search/utils';
import { getApiCallsConfig } from 'modules/utils/api.config';

import { adaptTrekResultList, adaptTrekResults } from './adapter';
import { fetchTrekResult, fetchTrekResults } from './api';
import { TrekResult, TrekResults } from './interface';
import { formatFiltersToUrlParams } from './utils';

export const getTrekResults = async (
  filtersState: QueryFilterState[],
  pages: {
    treks: number | null;
  },
): Promise<TrekResults> => {
  try {
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

    return adaptTrekResults({ rawTrekResults, difficulties, themes, activities });
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
