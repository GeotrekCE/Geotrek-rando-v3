import { QueryFilterState } from 'components/pages/search/utils';
import { getActivities } from 'modules/activities/connector';
import { CATEGORY_ID, PRACTICE_ID } from 'modules/filters/constant';
import {
  formatTouristicContentFiltersToUrlParams,
  formatTrekFiltersToUrlParams,
} from 'modules/results/utils';
import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { getApiCallsConfig } from 'modules/utils/api.config';

import { generatePageNumbersArray } from 'modules/utils/connector';
import { adaptTouristicContentMapResults, adaptTrekMapResults } from './adapter';
import { fetchTouristicContentMapResults, fetchTrekMapResults } from './api';
import { MapResults } from './interface';

export const getMapResults = async (
  filtersState: QueryFilterState[],
  language: string,
): Promise<MapResults> => {
  try {
    const practiceFilter = filtersState.find(({ id }) => id === PRACTICE_ID);
    const isPracticeSelected = practiceFilter ? practiceFilter.selectedOptions.length > 0 : false;
    const serviceFilter = filtersState.find(({ id }) => id === CATEGORY_ID);
    const isServiceSelected = serviceFilter ? serviceFilter.selectedOptions.length > 0 : false;

    const shouldFetchTreks = !isServiceSelected || isPracticeSelected;
    const shouldFetchTouristicContents = !isPracticeSelected || isServiceSelected;

    const trekFilters = formatTrekFiltersToUrlParams(filtersState);
    const touristicContentFilter = formatTouristicContentFiltersToUrlParams(filtersState);

    const resultsNumber = getApiCallsConfig().mapResultsPageSize;

    const mapResults: MapResults = [];

    if (shouldFetchTreks) {
      const rawMapResults = await fetchTrekMapResults({
        language,
        page_size: resultsNumber,
        ...trekFilters,
      });
      const mapTrekResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchTrekMapResults({
            language,
            page_size: resultsNumber,
            page: pageNumber,
            ...trekFilters,
          }),
        ),
      );
      const activities = await getActivities(language);
      mapResults.push(...adaptTrekMapResults({ mapResults: mapTrekResults, activities }));
    }

    if (shouldFetchTouristicContents) {
      const rawMapResults = await fetchTouristicContentMapResults({
        language,
        page_size: resultsNumber,
        ...touristicContentFilter,
      });
      const mapTouristicContentResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchTouristicContentMapResults({
            language,
            page_size: resultsNumber,
            page: pageNumber,
            ...touristicContentFilter,
          }),
        ),
      );
      const touristicContentCategories = await getTouristicContentCategories(language);
      mapResults.push(
        ...adaptTouristicContentMapResults({
          mapResults: mapTouristicContentResults,
          touristicContentCategories,
        }),
      );
    }

    return mapResults;
  } catch (error) {
    console.error('Error in connector / mapResults', error);
    throw error;
  }
};
