import { QueryFilterState } from 'components/pages/search/utils';
import { getActivities } from 'modules/activities/connector';
import { formatTrekFiltersToUrlParams } from 'modules/results/utils';
import { getApiCallsConfig } from 'modules/utils/api.config';

import { generatePageNumbersArray } from 'modules/utils/connector';
import { adaptTrekMapResults } from './adapter';
import { fetchMapResults } from './api';
import { MapResults } from './interface';

export const getMapResults = async (filtersState: QueryFilterState[]): Promise<MapResults> => {
  const resultsNumber = getApiCallsConfig().mapResultsPageSize;

  const formattedFiltersToUrlParams = formatTrekFiltersToUrlParams(filtersState);
  const rawMapResults = await fetchMapResults({
    language: 'fr',
    page_size: resultsNumber,
    ...formattedFiltersToUrlParams,
  });

  const mapResults = await Promise.all(
    generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
      fetchMapResults({
        language: 'fr',
        page_size: resultsNumber,
        page: pageNumber,
        ...formattedFiltersToUrlParams,
      }),
    ),
  );

  const activities = await getActivities();

  return adaptTrekMapResults({ mapResults, activities });
};
