import { FilterState, Option } from 'modules/filters/interface';
import { computeFiltersToDisplay } from 'modules/filters/utils';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { useState } from 'react';

export const useFilter = (
  initialFiltersState: FilterState[],
  touristicContentCategoryMapping: TouristicContentCategoryMapping,
  initialFiltersStateWithSelectedOptions: FilterState[],
) => {
  const [filtersState, setFiltersState] = useState<FilterState[]>(
    initialFiltersStateWithSelectedOptions,
  );

  const [filterBarExpansionState, setFilterBarExpansionState] = useState<'EXPANDED' | 'COLLAPSED'>(
    'COLLAPSED',
  );

  const setFilterSelectedOptions = (filterId: string, options: Option[]) => {
    setFiltersState(currentState => {
      const currentStateWithRelevantFilters = computeFiltersToDisplay({
        currentFiltersState: currentState,
        initialFiltersState,
        optionsSelected: options,
        selectedFilterId: filterId,
        touristicContentCategoryMapping,
      });
      return currentStateWithRelevantFilters.map(filterState => {
        if (filterState.id === filterId) {
          return {
            ...filterState,
            selectedOptions: options,
          };
        }
        return filterState;
      });
    });
  };

  return {
    filtersState,
    setFilterSelectedOptions,
    filterBarExpansionState,
    setFilterBarExpansionState,
  };
};
