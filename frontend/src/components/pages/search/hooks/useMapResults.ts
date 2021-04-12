import { useQuery } from 'react-query';

import { getMapResults } from 'modules/mapResults/connector';
import { MapResults } from 'modules/mapResults/interface';
import { FilterState } from 'modules/filters/interface';
import { parseFilters } from '../utils';

export const useMapResults = (
  filters: {
    filtersState: FilterState[];
    textFilter: string | null;
  },
  language: string,
) => {
  const parsedFiltersState = parseFilters(filters.filtersState);

  const { data: mapResults, isLoading: isMapLoading } = useQuery<MapResults, Error>(
    ['mapResults', parsedFiltersState, language],
    () => getMapResults({ filtersState: parsedFiltersState }, language),
  );

  return {
    mapResults,
    isMapLoading,
  };
};
