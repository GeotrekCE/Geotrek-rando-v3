import { useQuery } from 'react-query';

import { getMapResults } from 'modules/mapResults/connector';
import { MapResults } from 'modules/mapResults/interface';
import { FilterState } from 'modules/filters/interface';
import { parseFilters, parseTextFilter } from '../utils';

export const useMapResults = (
  filters: {
    filtersState: FilterState[];
    textFilterState: string | null;
  },
  language: string,
) => {
  const { filtersState, textFilterState } = filters;

  const parsedFiltersState = parseFilters(filtersState);

  const { data: mapResults, isLoading: isMapLoading } = useQuery<MapResults, Error>(
    ['mapResults', parsedFiltersState, language, parseTextFilter(textFilterState)],
    () => getMapResults({ filtersState: parsedFiltersState, textFilterState }, language),
  );

  return {
    mapResults,
    isMapLoading,
  };
};
