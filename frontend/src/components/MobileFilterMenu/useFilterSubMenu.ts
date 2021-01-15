import { FilterState } from 'modules/filters/interface';
import { useState } from 'react';

export const useFilterSubMenu = (filtersState: FilterState[]) => {
  const [currentFilterId, setCurrentFilterId] = useState<string | null>(null);
  const hideSubMenu = () => setCurrentFilterId(null);
  const selectFilter = (filterId: string) => setCurrentFilterId(filterId);

  const subMenuState: 'DISPLAYED' | 'HIDDEN' = currentFilterId === null ? 'HIDDEN' : 'DISPLAYED';

  const filteredFiltersState = filtersState.filter(({ id }) => id === currentFilterId);

  const currentFilterState = filteredFiltersState.length > 0 ? filteredFiltersState[0] : null;

  return { currentFilterId, subMenuState, hideSubMenu, selectFilter, currentFilterState };
};
