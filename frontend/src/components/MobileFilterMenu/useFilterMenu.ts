import { FilterState } from 'modules/filters/interface';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export const useFilterMenu = (
  filtersState: FilterState[],
): {
  menuState: 'DISPLAYED' | 'HIDDEN';
  displayMenu: () => void;
  hideMenu: () => void;
  subMenuState: 'DISPLAYED' | 'HIDDEN';
  displaySubMenu: () => void;
  hideSubMenu: () => void;
  filtersList: { id: string; label: string; onSelect: () => void }[];
} => {
  const [menuState, setMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMenu = () => setMenuState('DISPLAYED');
  const hideMenu = () => setMenuState('HIDDEN');

  const [subMenuState, setSubMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displaySubMenu = () => setSubMenuState('DISPLAYED');
  const hideSubMenu = () => setSubMenuState('HIDDEN');

  const intl = useIntl();
  const filtersList = filtersState.map(filterState => ({
    id: filterState.id,
    label: intl.formatMessage({ id: filterState.label }),
    onSelect: () => console.log(`Selected ${filterState.id}`),
  }));

  return {
    menuState,
    displayMenu,
    hideMenu,
    subMenuState,
    displaySubMenu,
    hideSubMenu,
    filtersList,
  };
};
