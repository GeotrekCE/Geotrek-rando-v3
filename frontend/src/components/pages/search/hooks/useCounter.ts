import { useQuery } from 'react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { getSearchResults } from '../../../../modules/results/connector';

interface Args {
  language: string;
}

interface CountResult {
  treksCount: number;
  touristicContentsCount: number;
  outdoorSitesCount: number;
}

const useCounter = ({ language }: Args): CountResult => {
  const result = useQuery(
    ['counter'],
    ({ pageParam = { treks: 1, touristicContents: 1, outdoorSites: 1 } }) =>
      getSearchResults(
        { filtersState: [], textFilterState: null, bboxState: null },
        pageParam,
        language,
      ),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: ONE_DAY,
    },
  );

  return {
    treksCount: result?.data?.resultsNumberDetails?.treksCount ?? 0,
    touristicContentsCount: result?.data?.resultsNumberDetails?.touristicContentsCount ?? 0,
    outdoorSitesCount: result?.data?.resultsNumberDetails?.outdoorSitesCount ?? 0,
  };
};

export default useCounter;
