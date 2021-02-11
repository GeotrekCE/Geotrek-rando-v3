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

  const practices = initialFiltersStateWithSelectedOptions[0];
  const services = initialFiltersStateWithSelectedOptions[1];
  const isPracticeOrCategorySelected =
    (practices.selectedOptions.length > 0 && services.selectedOptions.length === 0) ||
    (practices.selectedOptions.length === 0 && services.selectedOptions.length === 1);

  const [filterBarExpansionState, setFilterBarExpansionState] = useState<'EXPANDED' | 'COLLAPSED'>(
    isPracticeOrCategorySelected ? 'EXPANDED' : 'COLLAPSED',
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
