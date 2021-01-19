import { getActivities } from 'modules/activities/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { QueryFilterState } from 'components/pages/search/utils';

import { adaptTrekResults } from './adapter';
import { fetchTrekResults } from './api';
import { TrekResults } from './interface';
import { formatFiltersToUrlParams } from './utils';

// TODO it should come from the config
const resultsNumber = 5;

export const getTrekResults = async (
  filtersState: QueryFilterState[],
  pageNumber = 1,
): Promise<TrekResults> => {
  const [rawTrekResults, difficulties, themes, activities] = await Promise.all([
    fetchTrekResults({
      language: 'fr',
      page_size: resultsNumber,
      page: pageNumber,
      ...formatFiltersToUrlParams(filtersState),
    }),
    getDifficulties(),
    getThemes(),
    getActivities(),
  ]);

  return adaptTrekResults({ rawTrekResults, difficulties, themes, activities });
};
