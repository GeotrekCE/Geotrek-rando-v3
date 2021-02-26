import { useQuery } from 'react-query';

import { getMapResults } from 'modules/mapResults/connector';
import { MapResults } from 'modules/mapResults/interface';
import { FilterState } from 'modules/filters/interface';
import { parseFilters } from '../utils';

export const useMapResults = (filtersState: FilterState[], language: string) => {
  const parsedFiltersState = parseFilters(filtersState);

  const { data: mapResults, isLoading: isMapLoading } = useQuery<MapResults, Error>(
    ['mapResults', parsedFiltersState, language],
    () => getMapResults(parsedFiltersState, language),
  );

  return {
    mapResults,
    isMapLoading,
  };
};
