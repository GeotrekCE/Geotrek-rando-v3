import { FILTERS_CATEGORIES } from 'components/pages/search/components/FilterBar';
import { FilterCategory } from 'modules/filters/interface';
import { useState } from 'react';

export const useFilterMenu = (
  selectFilter: (filterId: string) => void,
): {
  menuState: 'DISPLAYED' | 'HIDDEN';
  displayMenu: () => void;
  hideMenu: () => void;
  filtersList: FilterCategory[];
} => {
  const [menuState, setMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMenu = () => setMenuState('DISPLAYED');
  const hideMenu = () => setMenuState('HIDDEN');

  const filtersList = FILTERS_CATEGORIES.map(item => ({
    ...item,
    onSelect: () => selectFilter(item.id),
  }));

  return {
    menuState,
    displayMenu,
    hideMenu,
    filtersList,
  };
};
