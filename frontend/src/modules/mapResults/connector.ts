import { QueryFilterState } from 'components/pages/search/utils';
import { getActivities } from 'modules/activities/connector';
import { formatFiltersToUrlParams } from 'modules/results/utils';

import { adaptMapResults } from './adapter';
import { fetchMapResults } from './api';
import { MapResults } from './interface';
import { generatePageNumbersArray } from './utils';

// TODO it should come from the config
const resultsNumber = 5;

export const getMapResults = async (filtersState: QueryFilterState[]): Promise<MapResults> => {
  const formattedFiltersToUrlParams = formatFiltersToUrlParams(filtersState);
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

  return adaptMapResults({ mapResults, activities });
};
