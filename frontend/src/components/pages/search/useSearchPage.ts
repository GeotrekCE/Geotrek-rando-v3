import { useQuery } from 'react-query';
import { getTrekResults } from 'modules/results/connector';
import { TrekResults } from 'modules/results/interface';

export const useSearchPage = () => {
  const { data: searchResults, isLoading } = useQuery<TrekResults, Error>(
    'trekResults',
    getTrekResults,
  );

  return { searchResults, isLoading };
};
