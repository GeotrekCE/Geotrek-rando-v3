import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';

import { getSearchResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { formatInfiniteQuery, parseFilters } from '../utils';

const computeFilterHash = (filtersState: FilterState[]) =>
  filtersState
    .map(filterState =>
      [
        filterState.id,
        ...filterState.selectedOptions.map(selectedOption => selectedOption.value),
      ].join(''),
    )
    .join('');

export const useTrekResults = (filtersState: FilterState[]) => {
  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  const parsedFiltersState = parseFilters(filtersState);

  const filterHash = useRef(computeFilterHash(filtersState));

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TrekResults, Error>(
    ['trekResults', parsedFiltersState],
    ({ pageParam }) => getSearchResults(parsedFiltersState, pageParam),
    {
      retry: false,
      // We already have a fallback component to allow the user to refetch
      // Leaving these on induced issues with our refetching only next page strategy
      // When it refetched on reconnect/focus the infinite scroll then stopped working
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // hasNextPage will be set to false if getNextPageParam returns undefined
      getNextPageParam: lastPageResult =>
        lastPageResult.nextPages.treks !== null ? lastPageResult.nextPages : undefined,
    },
  );

  useEffect(() => {
    const currentFilterHash = computeFilterHash(filtersState);
    if (currentFilterHash !== filterHash.current) {
      filterHash.current = currentFilterHash;
      void refetch();
    }
  }, [filtersState]);

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
