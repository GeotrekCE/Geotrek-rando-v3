import { FilterState } from 'modules/filters/interface';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export const useFilterMenu = (
  filtersState: FilterState[],
  selectFilter: (filterId: string) => void,
): {
  menuState: 'DISPLAYED' | 'HIDDEN';
  displayMenu: () => void;
  hideMenu: () => void;
  filtersList: { id: string; label: string; onSelect: () => void }[];
} => {
  const [menuState, setMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMenu = () => setMenuState('DISPLAYED');
  const hideMenu = () => setMenuState('HIDDEN');

  const intl = useIntl();
  const filtersList = filtersState.map(filterState => ({
    id: filterState.id,
    label: intl.formatMessage({ id: filterState.label }),
    onSelect: () => selectFilter(filterState.id),
  }));

  return {
    menuState,
    displayMenu,
    hideMenu,
    filtersList,
  };
};
