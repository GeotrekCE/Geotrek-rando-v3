import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';

import { getSearchResults } from 'modules/results/connector';
import { SearchResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { formatInfiniteQuery, parseFilters } from '../utils';

const computeUrl = (filtersState: FilterState[]) =>
  `search?${filtersState
    .reduce<string[]>((selectedOptions, { id, selectedOptions: currentlySelectedOptions }) => {
      if (currentlySelectedOptions.length === 0) return selectedOptions;
      return [
        ...selectedOptions,
        `${id}=${currentlySelectedOptions.map(({ value }) => value).join(',')}`,
      ];
    }, [])
    .join('&')}`;

export const useTrekResults = (filters: { filtersState: FilterState[] }, language: string) => {
  const { filtersState } = filters;

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  const parsedFiltersState = parseFilters(filtersState);

  const filterUrl = useRef(computeUrl(filtersState));

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchResults, Error>(
    ['trekResults', parsedFiltersState, language],
    ({ pageParam = { treks: 1, touristicContents: 1 } }) =>
      getSearchResults(parsedFiltersState, pageParam, language),
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
        lastPageResult.nextPages.touristicContents !== null
          ? lastPageResult.nextPages
          : undefined,
    },
  );

  useEffect(() => {
    const url = computeUrl(filtersState);
    if (url !== filterUrl.current) {
      filterUrl.current = url;
      window.history.replaceState(null, '', url);
      void refetch();
    }
  }, [filtersState, refetch]);

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
