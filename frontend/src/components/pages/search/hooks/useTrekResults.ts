import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { getSearchResults } from 'modules/results/connector';
import { SearchParams, SearchResults } from 'modules/results/interface';
import { DateFilter, FilterState } from 'modules/filters/interface';

import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
import { formatInfiniteQuery, parseBboxFilter, parseFilters, parseTextFilter } from '../utils';
import { getGlobalConfig } from '../../../../modules/utils/api.config';

const formatFiltersUrl = (filtersState: FilterState[]): string[] =>
  filtersState.reduce<string[]>(
    (selectedOptions, { id, selectedOptions: currentlySelectedOptions }) => {
      if (currentlySelectedOptions.length === 0) return selectedOptions;
      return [
        ...selectedOptions,
        `${id}=${currentlySelectedOptions.map(({ value }) => value).join(',')}`,
      ];
    },
    [],
  );

const computeUrl = (
  filtersState: FilterState[],
  textFilter: string | null,
  dateFilter: DateFilter | null,
) => {
  const urlParams = formatFiltersUrl(filtersState);

  textFilter && urlParams.push(`text=${textFilter}`);
  dateFilter?.beginDate && urlParams.push(`beginDate=${dateFilter.beginDate}`);
  dateFilter?.endDate && urlParams.push(`endDate=${dateFilter.endDate}`);

  const params = urlParams.join('&');
  const formattedUrl = params ? `search?${params}` : 'search';

  return formattedUrl;
};

export const useTrekResults = (
  filters: {
    filtersState: FilterState[];
    textFilterState: string | null;
    bboxState: string | null;
    dateFilter: DateFilter;
    page: number;
  },
  language: string,
) => {
  const { filtersState, textFilterState, bboxState, dateFilter, page } = filters;

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => {
    setMobileMapState('DISPLAYED');

    // We must fire a resize event for leaflet because the first render is not displayed and leaflet can not calculate the height of the container
    window.dispatchEvent(new Event('resize'));
  };
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  const parsedFiltersState = parseFilters(filtersState);

  const filterUrl = useRef(computeUrl(filtersState, textFilterState, dateFilter));

  const router = useRouter();

  const commonDictionaries = useQueryCommonDictionaries(language);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchResults, Error>({
    queryKey: [
      'trekResults',
      JSON.stringify(parsedFiltersState),
      language,
      parseTextFilter(textFilterState),
      parseBboxFilter(bboxState),
      JSON.stringify(dateFilter),
      page,
    ],
    queryFn: ({
      pageParam = {
        treks: page,
        touristicContents: page,
        outdoorSites: getGlobalConfig().enableOutdoor ? page : null,
        touristicEvents: getGlobalConfig().enableTouristicEvents ? page : null,
      },
    }) => {
      return getSearchResults(
        { filtersState: parsedFiltersState, textFilterState, bboxState, dateFilter },
        pageParam as SearchParams,
        language,
        commonDictionaries,
      );
    },
    initialPageParam: {
      treks: page,
      touristicContents: page,
      outdoorSites: getGlobalConfig().enableOutdoor ? page : null,
      touristicEvents: getGlobalConfig().enableTouristicEvents ? page : null,
    },
    retry: false,
    // We already have a fallback component to allow the user to refetch
    // Leaving these on induced issues with our refetching only next page strategy
    // When it refetched on reconnect/focus the infinite scroll then stopped working
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // hasNextPage will be set to false if getNextPageParam returns undefined
    getNextPageParam: lastPageResult =>
      lastPageResult.nextPages.treks !== null ||
      lastPageResult.nextPages.touristicContents !== null ||
      lastPageResult.nextPages.outdoorSites !== null ||
      lastPageResult.nextPages.touristicEvents !== null
        ? lastPageResult.nextPages
        : undefined,
    getPreviousPageParam: lastPageResult =>
      lastPageResult.previousPages.treks !== null ||
      lastPageResult.previousPages.touristicContents !== null ||
      lastPageResult.previousPages.outdoorSites !== null ||
      lastPageResult.previousPages.touristicEvents !== null
        ? lastPageResult.previousPages
        : undefined,
  });

  useEffect(() => {
    const url = computeUrl(filtersState, textFilterState, dateFilter);
    if (url !== filterUrl.current) {
      filterUrl.current = url;
      void router.push(url, undefined, { shallow: true });
      void refetch();
    }
  }, [filtersState, textFilterState, dateFilter, refetch, router]);

  return {
    searchResults: formatInfiniteQuery(data),
    isLoading,
    isError,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  };
};
