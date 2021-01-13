import { FilterState, Option } from 'modules/filters/interface';
import { getFiltersState } from 'modules/filters/utils';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const useFilter = () => {
  const { data } = useQuery('filters', getFiltersState);

  const [filtersState, setFiltersState] = useState<FilterState[]>([]);

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    setFiltersState(currentState =>
      currentState.map(filterState => {
        if (filterState.id === filterId) {
          return {
            ...filterState,
            selectedOptions: options,
          };
        }
        return filterState;
      }),
    );
  };

  useEffect(() => {
    if (data !== undefined) {
      setFiltersState(data);
    }
  }, [data]);

  return {
    filtersState,
    setFilterSelectedOptions,
  };
};
