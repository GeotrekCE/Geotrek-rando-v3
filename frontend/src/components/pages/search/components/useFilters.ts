import { FilterState, Option } from 'modules/filters/interface';
import { useState } from 'react';

export const useFilter = (initialFiltersState: FilterState[]) => {
  const [filtersState, setFiltersState] = useState<FilterState[]>(initialFiltersState);

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

  return {
    filtersState,
    setFilterSelectedOptions,
  };
};
