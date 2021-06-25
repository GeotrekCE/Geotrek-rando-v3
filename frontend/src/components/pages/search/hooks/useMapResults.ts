import { useContext } from 'react';
import { useQuery } from 'react-query';

import { getMapResults } from 'modules/mapResults/connector';
import { MapResults } from 'modules/mapResults/interface';
import { FilterState } from 'modules/filters/interface';
import { ListAndMapContext } from '../../../../modules/map/ListAndMapContext';
import { parseFilters, parseTextFilter } from '../utils';

interface ReturnType {
  mapResults: MapResults | undefined;
  isMapLoading: boolean;
}

export const useMapResults = (
  filters: {
    filtersState: FilterState[];
    textFilterState: string | null;
  },
  language: string,
): ReturnType => {
  const { setPoints } = useContext(ListAndMapContext);

  const { filtersState, textFilterState } = filters;

  const parsedFiltersState = parseFilters(filtersState);

  const { data: mapResults, isLoading: isMapLoading } = useQuery<MapResults, Error>(
    ['mapResults', parsedFiltersState, language, parseTextFilter(textFilterState)],
    () => getMapResults({ filtersState: parsedFiltersState, textFilterState }, language),
  );

  if (mapResults) setPoints(mapResults);

  return {
    mapResults,
    isMapLoading,
  };
};
