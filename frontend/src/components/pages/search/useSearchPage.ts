import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { getTrekResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { formatInfiniteQuery, parseFilters } from './utils';

export const useSearchPage = (filtersState: FilterState[]) => {
  const parsedFiltersState = parseFilters(filtersState);

  const { data, isLoading, isError, refetch, fetchNextPage } = useInfiniteQuery<TrekResults, Error>(
    ['trekResults', parsedFiltersState],
    ({ pageParam }) => getTrekResults(parsedFiltersState, pageParam),
    { retry: false, getNextPageParam: lastPageResult => lastPageResult.nextPageId },
  );

  /** Used to detect when to load next page */
  const loadNextPageRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadNextPageRef,
    onIntersect: fetchNextPage,
  });

  return { searchResults: formatInfiniteQuery(data), isLoading, isError, refetch, loadNextPageRef };
};
