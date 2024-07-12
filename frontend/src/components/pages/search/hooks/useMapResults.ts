import { useQuery } from '@tanstack/react-query';

import { getMapResults } from 'modules/mapResults/connector';
import { MapResults } from 'modules/mapResults/interface';
import { DateFilter, FilterState } from 'modules/filters/interface';
import { parseFilters, parseTextFilter } from '../utils';

interface ReturnType {
  mapResults: MapResults | undefined;
  isMapLoading: boolean;
}

export const useMapResults = (
  filters: {
    filtersState: FilterState[];
    textFilterState: string | null;
    dateFilter: DateFilter | null;
  },
  language: string,
): ReturnType => {
  const { filtersState, textFilterState, dateFilter } = filters;

  const parsedFiltersState = parseFilters(filtersState);

  const { data: mapResults, isLoading: isMapLoading } = useQuery<MapResults, Error>({
    queryKey: [
      'mapResults',
      parsedFiltersState,
      language,
      parseTextFilter(textFilterState),
      dateFilter,
    ],
    queryFn: () =>
      getMapResults({ filtersState: parsedFiltersState, textFilterState, dateFilter }, language),
  });

  return {
    isMapLoading,
    mapResults,
  };
};
