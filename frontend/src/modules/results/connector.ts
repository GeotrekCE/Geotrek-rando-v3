import { getTouristicContentCategories } from 'modules/touristicContentCategory/connector';
import { getActivities } from 'modules/activities/connector';
import { getDifficulties } from 'modules/filters/difficulties';
import { getThemes } from 'modules/filters/theme/connector';
import { CATEGORY_ID, EVENT_ID, OUTDOOR_ID, PRACTICE_ID } from 'modules/filters/constant';
import { QueryFilterState } from 'components/pages/search/utils';
import { fetchTouristicContentResult } from 'modules/touristicContent/api';
import { getGlobalConfig } from 'modules/utils/api.config';
import { DateFilter } from 'modules/filters/interface';
import { TouristicContentResult } from 'modules/touristicContent/interface';
import { getCities } from 'modules/city/connector';
import { adaptTouristicContentResult } from 'modules/touristicContent/adapter';
import { getOutdoorPractices } from '../outdoorPractice/connector';
import { adaptOutdoorSites } from '../outdoorSite/adapter';
import { fetchOutdoorSites } from '../outdoorSite/api';
import { OutdoorSite } from '../outdoorSite/interface';
import { adaptTouristicEvents } from '../touristicEvent/adapter';
import { fetchTouristicEvents } from '../touristicEvent/api';
import { TouristicEvent } from '../touristicEvent/interface';
import { getTouristicEventTypes } from '../touristicEventType/connector';

import { adaptTrekResultList } from './adapter';
import {
  fetchOutdoorSitesResultsNumber,
  fetchTouristicContentResultsNumber,
  fetchTouristicEventsResultsNumber,
  fetchTrekResult,
  fetchTrekResults,
  fetchTrekResultsNumber,
} from './api';
import { SearchResults, TrekResult } from './interface';
import {
  extractNextPageId,
  formatBboxFilter,
  formatDateFilter,
  formatOutdoorSiteFiltersToUrlParams,
  formatTextFilter,
  formatTouristicContentFiltersToUrlParams,
  formatTouristicEventsFiltersToUrlParams,
  formatTrekFiltersToUrlParams,
} from './utils';

const emptyResultPromise = Promise.resolve({
  count: 0,
  next: null,
  previous: null,
  results: [],
});

export const getSearchResults = async (
  filters: {
    filtersState: QueryFilterState[];
    textFilterState: string | null;
    bboxState: string | null;
    dateFilter: DateFilter | null;
  },
  pages: {
    treks: number | null;
    touristicContents: number | null;
    outdoorSites: number | null;
    touristicEvents: number | null;
  },
  language: string,
): Promise<SearchResults> => {
  const { filtersState, textFilterState, bboxState, dateFilter } = filters;

  try {
    const practiceFilter = filtersState.find(({ id }) => id === PRACTICE_ID);
    const isPracticeSelected = practiceFilter ? practiceFilter.selectedOptions.length > 0 : false;
    const serviceFilter = filtersState.find(({ id }) => id === CATEGORY_ID);
    const isServiceSelected = serviceFilter ? serviceFilter.selectedOptions.length > 0 : false;
    const outdoorFilter = filtersState.find(({ id }) => id === OUTDOOR_ID);
    const isOutdoorSiteSelected = outdoorFilter ? outdoorFilter.selectedOptions.length > 0 : false;
    const touristicEventFilter = filtersState.find(({ id }) => id === EVENT_ID);
    const isTouristicEventSelected = touristicEventFilter
      ? touristicEventFilter.selectedOptions.length > 0
      : false;

    const shouldFetchTreks =
      (!isServiceSelected && !isOutdoorSiteSelected && !isTouristicEventSelected) ||
      isPracticeSelected;
    const shouldFetchTouristicContents =
      (!isPracticeSelected && !isOutdoorSiteSelected && !isTouristicEventSelected) ||
      isServiceSelected;
    const shouldFetchOutdoorSites =
      ((!isPracticeSelected && !isServiceSelected && !isTouristicEventSelected) ||
        isOutdoorSiteSelected) &&
      getGlobalConfig().enableOutdoor;
    const shouldFetchTouristicEvents =
      ((!isPracticeSelected && !isServiceSelected && !isOutdoorSiteSelected) ||
        isTouristicEventSelected) &&
      getGlobalConfig().enableTouristicEvents;

    const trekFilters = formatTrekFiltersToUrlParams(filtersState);
    const touristicContentFilter = formatTouristicContentFiltersToUrlParams(filtersState);
    const outdoorSiteFilter = formatOutdoorSiteFiltersToUrlParams(filtersState);
    const touristicEventsFilter = formatTouristicEventsFiltersToUrlParams(filtersState);

    const textFilter = formatTextFilter(textFilterState);
    const newDateFilter = formatDateFilter(dateFilter);

    const bboxFilter = formatBboxFilter(bboxState);

    // We get the treks and touristic content counts on their own call to handle the "null" next page edge case

    const getTreksCountPromise = shouldFetchTreks
      ? fetchTrekResultsNumber({
          language,
          page_size: 1,
          page: 1,
          ...trekFilters,
          ...textFilter,
          ...bboxFilter,
        })
      : emptyResultPromise;
    const getTouristicContentsCountPromise = shouldFetchTouristicContents
      ? fetchTouristicContentResultsNumber({
          language,
          page_size: 1,
          page: 1,
          ...touristicContentFilter,
          ...textFilter,
          ...bboxFilter,
        })
      : emptyResultPromise;
    const getOutdoorSitesCountPromise = shouldFetchOutdoorSites
      ? fetchOutdoorSitesResultsNumber({
          language,
          page_size: 1,
          page: 1,
          ...outdoorSiteFilter,
          ...textFilter,
          ...bboxFilter,
        })
      : emptyResultPromise;
    const getTouristicEventsCountPromise = shouldFetchTouristicEvents
      ? fetchTouristicEventsResultsNumber({
          language,
          page_size: 1,
          page: 1,
          dates_before: newDateFilter.dates_before === '' ? '' : newDateFilter.dates_before,
          dates_after: newDateFilter.dates_after === '' ? '' : newDateFilter.dates_after,
          ...touristicEventsFilter,
          ...textFilter,
          ...bboxFilter,
        })
      : emptyResultPromise;

    const [
      { count: treksCount },
      { count: touristicContentsCount },
      { count: outdoorSitesCount },
      { count: touristicEventsCount },
    ] = await Promise.all([
      getTreksCountPromise,
      getTouristicContentsCountPromise,
      getOutdoorSitesCountPromise,
      getTouristicEventsCountPromise,
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
            ...bboxFilter,
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
            ...bboxFilter,
          })
        : Promise.resolve({
            count: touristicContentsCount, // We keep the touristic content counts event if the query only concerns the treks
            next: null,
            previous: null,
            results: [],
          });

    const getOutdoorSitesPromise =
      pages.outdoorSites !== null
        ? fetchOutdoorSites({
            language,
            page_size: getGlobalConfig().searchResultsPageSize,
            page: pages.outdoorSites ?? undefined,
            ...outdoorSiteFilter,
            ...textFilter,
            ...bboxFilter,
          })
        : Promise.resolve({
            count: outdoorSitesCount,
            next: null,
            previous: null,
            results: [],
          });

    const getTouristicEventsPromise =
      pages.touristicEvents !== null
        ? fetchTouristicEvents({
            language,
            page_size: getGlobalConfig().searchResultsPageSize,
            page: pages.touristicEvents ?? undefined,
            dates_before: newDateFilter.dates_before === '' ? '' : newDateFilter.dates_before,
            dates_after: newDateFilter.dates_after === '' ? '' : newDateFilter.dates_after,
            ...touristicEventsFilter,
            ...textFilter,
            ...bboxFilter,
          })
        : Promise.resolve({
            count: touristicEventsCount,
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
      rawOutdoorSites,
      rawTouristicEvents,
      touristicContentCategories,
      cityDictionnary,
      outdoorPracticeDictionnary,
    ] = await Promise.all([
      shouldFetchTreks ? getTreksResultsPromise : emptyResultPromise,
      getDifficulties(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      getThemes(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      getActivities(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      shouldFetchTouristicContents ? getToursticContentsPromise : emptyResultPromise,
      shouldFetchOutdoorSites ? getOutdoorSitesPromise : emptyResultPromise,
      shouldFetchTouristicEvents ? getTouristicEventsPromise : emptyResultPromise,
      getTouristicContentCategories(language), // Todo: Find a way to store this hashmap to avoid calling this every time
      getCities(language),
      getOutdoorPractices(language),
    ]);

    const [touristicEventType] = await Promise.all([getTouristicEventTypes(language)]);

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
      themeDictionnary: themes,
      cityDictionnary,
    });

    const adaptedOutdoorSitesList: OutdoorSite[] = adaptOutdoorSites({
      rawOutdoorSites: rawOutdoorSites.results,
      themeDictionnary: themes,
      outdoorPracticeDictionnary,
      cityDictionnary,
    });

    const adaptedTouristicEventsList: TouristicEvent[] = adaptTouristicEvents({
      rawTouristicEvents: rawTouristicEvents.results,
      themeDictionnary: themes,
      cityDictionnary,
      touristicEventType,
    });

    const nextTreksPage = extractNextPageId(rawTrekResults.next);
    const nextTouristicContentsPage = extractNextPageId(rawTouristicContents.next);
    const nextOutdoorSitesPage = extractNextPageId(rawOutdoorSites.next);
    const nextTouristicEventsPage = extractNextPageId(rawTouristicEvents.next);

    return {
      resultsNumber: treksCount + touristicContentsCount + outdoorSitesCount + touristicEventsCount,
      resultsNumberDetails: {
        treksCount,
        touristicContentsCount,
        outdoorSitesCount,
        touristicEventsCount,
      },
      nextPages: {
        treks: nextTreksPage,
        touristicContents: nextTouristicContentsPage,
        outdoorSites: nextOutdoorSitesPage,
        touristicEvents: nextTouristicEventsPage,
      },
      results: [
        ...adaptedResultsList,
        ...adaptedTouristicContentsList,
        ...adaptedOutdoorSitesList,
        ...adaptedTouristicEventsList,
      ],
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

export const getTrekResults = async (language: string, query = {}) => {
  const [rawTrekResults, difficulties, themes, activities, cityDictionnary] = await Promise.all([
    fetchTrekResults({ language, ...query }),
    getDifficulties(language),
    getThemes(language),
    getActivities(language),
    getCities(language),
  ]);

  return adaptTrekResultList({
    resultsList: rawTrekResults.results,
    difficulties,
    themes,
    activities,
    cityDictionnary,
  });
};
