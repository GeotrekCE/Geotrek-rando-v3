import { useQuery } from 'react-query';

import { getTrekResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';
import { FilterState } from 'modules/filters/interface';

import { parseFilters } from './utils';

export const useSearchPage = (filtersState: FilterState[]) => {
  const parsedFiltersState = parseFilters(filtersState);

  const { data: searchResults, isLoading, isError, refetch } = useQuery<TrekResults, Error>(
    ['trekResults', parsedFiltersState],
    () => getTrekResults(parsedFiltersState),
  );

  return { searchResults, isLoading, isError, refetch };
};
