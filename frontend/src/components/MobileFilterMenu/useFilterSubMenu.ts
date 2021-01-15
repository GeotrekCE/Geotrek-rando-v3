import { FilterState, Option } from 'modules/filters/interface';
import { useState } from 'react';

export const useFilterSubMenu = (
  filtersState: FilterState[],
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void,
) => {
  const [currentFilterId, setCurrentFilterId] = useState<string | null>(null);
  const hideSubMenu = () => setCurrentFilterId(null);
  const selectFilter = (filterId: string) => setCurrentFilterId(filterId);

  const subMenuState: 'DISPLAYED' | 'HIDDEN' = currentFilterId === null ? 'HIDDEN' : 'DISPLAYED';

  const filteredFiltersState = filtersState.filter(({ id }) => id === currentFilterId);
  const currentFilterState = filteredFiltersState.length > 0 ? filteredFiltersState[0] : null;

  const selectOption = (option: Option) => {
    if (currentFilterId !== null && currentFilterState) {
      setFilterSelectedOptions(currentFilterId, [...currentFilterState.selectedOptions, option]);
    }
  };

  const deSelectOption = (option: Option) => {
    if (currentFilterId !== null && currentFilterState) {
      const newSelectedOptions = currentFilterState.selectedOptions.filter(
        opt => opt.value !== option.value,
      );
      setFilterSelectedOptions(currentFilterId, [...newSelectedOptions]);
    }
  };

  return {
    currentFilterId,
    subMenuState,
    hideSubMenu,
    selectFilter,
    currentFilterState,
    selectOption,
    deSelectOption,
  };
};
