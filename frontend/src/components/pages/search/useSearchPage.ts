import { useInfiniteQuery } from 'react-query';

import { getTrekResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { formatInfiniteQuery, parseFilters } from './utils';

export const useSearchPage = (filtersState: FilterState[]) => {
  const parsedFiltersState = parseFilters(filtersState);

  const { data, isLoading, isError, refetch } = useInfiniteQuery<TrekResults, Error>(
    ['trekResults', parsedFiltersState],
    ({ pageParam }) => getTrekResults(parsedFiltersState, pageParam),
    { retry: false, getNextPageParam: lastPageResult => lastPageResult.nextPageId },
  );

  return { searchResults: formatInfiniteQuery(data), isLoading, isError, refetch };
};
