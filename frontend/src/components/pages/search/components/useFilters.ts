import {
  CATEGORY_ID,
  CITY_ID,
  DISTRICT_ID,
  PRACTICE_ID,
  STRUCTURE_ID,
  THEME_ID,
} from 'modules/filters/constant';
import { FilterState, Option } from 'modules/filters/interface';
import { computeFiltersToDisplay } from 'modules/filters/utils';
import { TouristicContentCategoryMapping } from 'modules/touristicContentCategory/interface';
import { useState } from 'react';

const commonFilters = [PRACTICE_ID, CATEGORY_ID, THEME_ID, CITY_ID, DISTRICT_ID, STRUCTURE_ID];

export const useFilter = (
  initialFiltersState: FilterState[],
  touristicContentCategoryMapping: TouristicContentCategoryMapping,
) => {
  const [filtersState, setFiltersState] = useState<FilterState[]>(
    initialFiltersState.filter(({ id }) => commonFilters.includes(id)),
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
  };
};
