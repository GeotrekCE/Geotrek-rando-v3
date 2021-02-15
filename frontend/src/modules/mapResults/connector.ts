import { QueryFilterState } from 'components/pages/search/utils';
import { getActivities } from 'modules/activities/connector';
import { CATEGORY_ID, PRACTICE_ID } from 'modules/filters/constant';
import {
  formatTouristicContentFiltersToUrlParams,
  formatTrekFiltersToUrlParams,
} from 'modules/results/utils';
import { getApiCallsConfig } from 'modules/utils/api.config';

import { generatePageNumbersArray } from 'modules/utils/connector';
import { adaptMapResults } from './adapter';
import { fetchTrekMapResults } from './api';
import { MapResults } from './interface';

const emptyResultPromise = Promise.resolve({
  count: 0,
  next: null,
  previous: null,
  results: [],
});

export const getMapResults = async (filtersState: QueryFilterState[]): Promise<MapResults> => {
  try {
    const practiceFilter = filtersState.find(({ id }) => id === PRACTICE_ID);
    const isPracticeSelected = practiceFilter ? practiceFilter.selectedOptions.length > 0 : false;
    const serviceFilter = filtersState.find(({ id }) => id === CATEGORY_ID);
    const isServiceSelected = serviceFilter ? serviceFilter.selectedOptions.length > 0 : false;

    const shouldFetchTreks = !isServiceSelected || isPracticeSelected;
    const shouldFetchTouristicContents = !isPracticeSelected || isServiceSelected;

    const trekFilters = formatTrekFiltersToUrlParams(filtersState);
    const touristicContentFilter = formatTouristicContentFiltersToUrlParams(filtersState);

    const resultsNumber = getApiCallsConfig().searchResultsPageSize;

    const mapResults: MapResults = [];

    if (shouldFetchTreks) {
      const rawMapResults = await fetchTrekMapResults({
        language: 'fr',
        page_size: resultsNumber,
        ...trekFilters,
      });
      const mapTrekResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchTrekMapResults({
            language: 'fr',
            page_size: resultsNumber,
            page: pageNumber,
            ...trekFilters,
          }),
        ),
      );
      const activities = await getActivities();
      mapResults.push(...adaptMapResults({ mapResults: mapTrekResults, activities }));
    }

    return mapResults;
  } catch (error) {
    console.error('Error in connector / mapResults', error);
    throw error;
  }
};
