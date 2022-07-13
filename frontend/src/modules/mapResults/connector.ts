import { QueryFilterState } from 'components/pages/search/utils';
import { getActivities } from 'modules/activities/connector';
import { CATEGORY_ID, EVENT_ID, OUTDOOR_ID, PRACTICE_ID } from 'modules/filters/constant';
import { DateFilter } from 'modules/filters/interface';
import {
  formatDateFilter,
  formatOutdoorSiteFiltersToUrlParams,
  formatTextFilter,
  formatTouristicContentFiltersToUrlParams,
  formatTouristicEventsFiltersToUrlParams,
  formatTrekFiltersToUrlParams,
} from 'modules/results/utils';
import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { getGlobalConfig } from 'modules/utils/api.config';

import { generatePageNumbersArray } from 'modules/utils/connector';
import { getOutdoorPractices } from '../outdoorPractice/connector';
import { fetchOutdoorSites } from '../outdoorSite/api';
import { fetchTouristicEvents } from '../touristicEvent/api';
import { getTouristicEventTypes } from '../touristicEventType/connector';
import {
  adaptOutdoorSitesMapResults,
  adaptTouristicContentMapResults,
  adaptTouristicEventsMapResults,
  adaptTrekMapResults,
} from './adapter';
import { fetchTouristicContentMapResults, fetchTrekMapResults } from './api';
import { MapResults } from './interface';

export const getMapResults = async (
  filters: {
    filtersState: QueryFilterState[];
    textFilterState: string | null;
    dateFilter: DateFilter | null;
  },
  language: string,
): Promise<MapResults> => {
  const { filtersState, textFilterState, dateFilter } = filters;

  try {
    const practiceFilter = filtersState.find(({ id }) => id === PRACTICE_ID);
    const isPracticeSelected = practiceFilter ? practiceFilter.selectedOptions.length > 0 : false;
    const serviceFilter = filtersState.find(({ id }) => id === CATEGORY_ID);
    const isServiceSelected = serviceFilter ? serviceFilter.selectedOptions.length > 0 : false;
    const outdoorFilter = filtersState.find(({ id }) => id === OUTDOOR_ID);
    const isOutdoorSiteSelected = outdoorFilter ? outdoorFilter.selectedOptions.length > 0 : false;
    const eventsFilter = filtersState.find(({ id }) => id === EVENT_ID);
    const isTouristicEventsSelected = eventsFilter
      ? eventsFilter.selectedOptions.length > 0
      : false;

    const shouldFetchTreks =
      (!isServiceSelected && !isOutdoorSiteSelected && !isTouristicEventsSelected) ||
      isPracticeSelected;
    const shouldFetchTouristicContents =
      (!isPracticeSelected && !isOutdoorSiteSelected && !isTouristicEventsSelected) ||
      isServiceSelected;
    const shouldFetchOutdoorSites =
      ((!isPracticeSelected && !isServiceSelected && !isTouristicEventsSelected) ||
        isOutdoorSiteSelected) &&
      getGlobalConfig().enableOutdoor;
    const shouldFetchTouristicEvents =
      ((!isPracticeSelected && !isServiceSelected && !isOutdoorSiteSelected) ||
        isTouristicEventsSelected) &&
      getGlobalConfig().enableTouristicEvents;

    const trekFilters = formatTrekFiltersToUrlParams(filtersState);
    const touristicContentFilter = formatTouristicContentFiltersToUrlParams(filtersState);
    const outdoorSiteFilter = formatOutdoorSiteFiltersToUrlParams(filtersState);
    const touristicEventsFilter = formatTouristicEventsFiltersToUrlParams(filtersState);

    const textFilter = formatTextFilter(textFilterState);
    const newDateFilter = formatDateFilter(dateFilter);

    const resultsNumber = getGlobalConfig().mapResultsPageSize;

    const mapResults: MapResults = [];

    if (shouldFetchTreks) {
      const rawMapResults = await fetchTrekMapResults({
        language,
        page_size: resultsNumber,
        ...trekFilters,
        ...textFilter,
      });
      const mapTrekResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchTrekMapResults({
            language,
            page_size: resultsNumber,
            page: pageNumber,
            ...trekFilters,
            ...textFilter,
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
        ...textFilter,
      });
      const mapTouristicContentResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchTouristicContentMapResults({
            language,
            page_size: resultsNumber,
            page: pageNumber,
            ...touristicContentFilter,
            ...textFilter,
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

    if (shouldFetchOutdoorSites) {
      const rawMapResults = await fetchOutdoorSites({
        language,
        page_size: resultsNumber,
        ...outdoorSiteFilter,
        ...textFilter,
      });
      const mapOutdoorSiteResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchOutdoorSites({
            language,
            page_size: resultsNumber,
            page: pageNumber,
            ...outdoorSiteFilter,
            ...textFilter,
          }),
        ),
      );
      const outdoorPracticeDictionnary = await getOutdoorPractices(language);
      mapResults.push(
        ...adaptOutdoorSitesMapResults({
          mapResults: mapOutdoorSiteResults,
          outdoorPracticeDictionnary,
        }),
      );
    }

    if (shouldFetchTouristicEvents) {
      const rawMapResults = await fetchTouristicEvents({
        language,
        page_size: resultsNumber,
        dates_before: newDateFilter.dates_before,
        dates_after: newDateFilter.dates_after,
        ...touristicEventsFilter,
        ...textFilter,
      });
      const mapTouristicEventsResults = await Promise.all(
        generatePageNumbersArray(resultsNumber, rawMapResults.count).map(pageNumber =>
          fetchTouristicEvents({
            language,
            page_size: resultsNumber,
            page: pageNumber,
            dates_before: newDateFilter.dates_before,
            dates_after: newDateFilter.dates_after,
            ...touristicEventsFilter,
            ...textFilter,
          }),
        ),
      );

      const touristicEventTypes = await getTouristicEventTypes(language);

      mapResults.push(
        ...adaptTouristicEventsMapResults({
          mapResults: mapTouristicEventsResults,
          touristicEventTypes,
        }),
      );
    }

    return mapResults;
  } catch (error) {
    console.error('Error in connector / mapResults', error);
    throw error;
  }
};
