import { useQuery } from 'react-query';

import { getMapResults } from 'modules/mapResults/connector';
import { MapResults } from 'modules/mapResults/interface';

export const useMapResults = () => {
  const { data: mapResults } = useQuery<MapResults, Error>('mapResults', getMapResults);

  return {
    mapResults,
  };
};
