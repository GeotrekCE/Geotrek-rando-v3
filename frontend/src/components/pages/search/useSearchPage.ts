import { useInfiniteQuery } from 'react-query';

import { getTrekResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { formatInfiniteQuery, parseFilters } from './utils';

export const useSearchPage = (filtersState: FilterState[]) => {
  const parsedFiltersState = parseFilters(filtersState);

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
    ({ pageParam }) => getTrekResults(parsedFiltersState, pageParam),
    {
      retry: false,
      // hasNextPage will be set to false if getNextPageParam returns undefined
      getNextPageParam: lastPageResult => lastPageResult.nextPageId ?? undefined,
    },
  );

  return {
    searchResults: formatInfiniteQuery(data),
    isLoading,
    isError,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
