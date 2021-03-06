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
  filtersList: {
    id: string;
    label: string;
    onSelect: () => void;
    selectedFiltersLabels: string[];
  }[];
  activeFiltersNumber: number;
} => {
  const [menuState, setMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMenu = () => setMenuState('DISPLAYED');
  const hideMenu = () => setMenuState('HIDDEN');

  const intl = useIntl();
  const filtersList = filtersState.map(({ id, label, selectedOptions }) => ({
    id,
    label: id === 'type1' || id === 'type2' ? label : intl.formatMessage({ id: label }),
    onSelect: () => selectFilter(id),
    selectedFiltersLabels: selectedOptions.map(option => option.label),
  }));

  const activeFiltersNumber = filtersState.reduce((selectedFiltersNb, currentFilter) => {
    if (currentFilter.selectedOptions.length > 0) return selectedFiltersNb + 1;
    return selectedFiltersNb;
  }, 0);

  return {
    menuState,
    displayMenu,
    hideMenu,
    filtersList,
    activeFiltersNumber,
  };
};
