import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { getTrekResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { formatInfiniteQuery, parseFilters } from './utils';

export const useSearchPage = (filtersState: FilterState[]) => {
  const parsedFiltersState = parseFilters(filtersState);

  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    TrekResults,
    Error
  >(
    ['trekResults', parsedFiltersState],
    ({ pageParam }) => getTrekResults(parsedFiltersState, pageParam),
    {
      retry: false,
      // hasNextPage will be set to false if getNextPageParam returns undefined
      getNextPageParam: lastPageResult => lastPageResult.nextPageId ?? undefined,
    },
  );

  /** Used to detect when to load next page */
  const loadNextPageRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadNextPageRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return { searchResults: formatInfiniteQuery(data), isLoading, isError, refetch, loadNextPageRef };
};
