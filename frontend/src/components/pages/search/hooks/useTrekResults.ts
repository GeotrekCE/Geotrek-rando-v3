import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';

import { getSearchResults } from 'modules/results/connector';
import { SearchResults } from 'modules/results/interface';
import { DateFilter, FilterState } from 'modules/filters/interface';
import { getGlobalConfig } from '../../../../modules/utils/api.config';

import { formatInfiniteQuery, parseBboxFilter, parseFilters, parseTextFilter } from '../utils';

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
  dateFilter: DateFilter,
) => {
  const urlParams = textFilter
    ? [...formatFiltersUrl(filtersState), `text=${textFilter}`]
    : formatFiltersUrl(filtersState);

  dateFilter && dateFilter.beginDate !== '' && urlParams.push(`beginDate=${dateFilter?.beginDate}`);
  dateFilter && dateFilter.endDate !== '' && urlParams.push(`endDate=${dateFilter?.endDate}`);
  const formattedUrl = `search?${urlParams.join('&')}`;

  return formattedUrl;
};

export const useTrekResults = (
  filters: {
    filtersState: FilterState[];
    textFilterState: string | null;
    bboxState: string | null;
    dateFilter: DateFilter;
  },
  language: string,
) => {
  const { filtersState, textFilterState, bboxState, dateFilter } = filters;

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

  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<SearchResults, Error>(
      [
        'trekResults',
        parsedFiltersState,
        language,
        parseTextFilter(textFilterState),
        parseBboxFilter(bboxState),
        dateFilter,
      ],
      ({
        pageParam = {
          treks: 1,
          touristicContents: 1,
          outdoorSites: getGlobalConfig().enableOutdoor ? 1 : null,
          touristicEvents: getGlobalConfig().enableTouristicEvents ? 1 : null,
        },
      }) => {
        return getSearchResults(
          { filtersState: parsedFiltersState, textFilterState, bboxState, dateFilter },
          pageParam,
          language,
        );
      },
      {
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
      },
    );

  useEffect(() => {
    const url = computeUrl(filtersState, textFilterState, dateFilter);
    if (url !== filterUrl.current) {
      filterUrl.current = url;
      void router.push(url, undefined, { shallow: true });
      void refetch();
    }
  }, [filtersState, textFilterState, dateFilter, refetch]);

  return {
    searchResults: formatInfiniteQuery(data),
    isLoading,
    isError,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  };
};
