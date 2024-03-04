import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
import { SearchParams } from 'modules/results/interface';
import { getSearchResults } from '../../../../modules/results/connector';
import { getGlobalConfig } from '../../../../modules/utils/api.config';

interface Args {
  language: string;
}

interface CountResult {
  treksCount: number;
  touristicContentsCount: number;
  outdoorSitesCount: number;
  touristicEventsCount: number;
}

const useCounter = ({ language }: Args): CountResult => {
  const commonDictionaries = useQueryCommonDictionaries(language);

  const result = useQuery(
    ['counter'],
    ({
      pageParam = {
        treks: 1,
        touristicContents: 1,
        outdoorSites: getGlobalConfig().enableOutdoor ? 1 : null,
        touristicEvents: getGlobalConfig().enableTouristicEvents ? 1 : null,
      },
    }) =>
      getSearchResults(
        {
          filtersState: [],
          textFilterState: null,
          bboxState: null,
          dateFilter: { endDate: '', beginDate: '' },
        },
        pageParam as SearchParams,
        language,
        commonDictionaries,
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
    touristicEventsCount: result?.data?.resultsNumberDetails?.touristicEventsCount ?? 0,
  };
};

export default useCounter;
