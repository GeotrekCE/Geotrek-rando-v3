import React from 'react';
// @ts-ignore Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';
import { useIntl } from 'react-intl';

import { Cross } from 'components/Icons/Cross';

import { CloseButton } from './CloseButton';
import { MobileFilterMenuSection } from './MobileFilterMenuSection';

interface Props {
  menuState: 'DISPLAYED' | 'HIDDEN';
  handleClose: () => void;
  title: React.ReactNode;
  filtersList: {
    id: string;
    label: string;
    onSelect: () => void;
    selectedFiltersLabels: string[];
  }[];
  closeMenu: () => void;
  resetFilter: () => void;
}

export const MobileFilterMenu: React.FC<Props> = ({
  menuState,
  handleClose,
  title,
  filtersList,
  closeMenu,
  resetFilter,
}) => {
  const intl = useIntl();
  return (
    /*
     * The library default behaviour is to have a fixed close icon which
     * made the icon overlap with the menu content as we scrolled.
     * To fix this issue we use our own close button which scrolls along
     * the content and imperatively closes the drawer.
     */
    <Slide
      isOpen={menuState === 'DISPLAYED'}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={false}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
    >
      <div className="relative text-center w-full pb-4 font-bold border-b border-solid border-greySoft outline-none">
        <CloseButton onClick={closeMenu} className="absolute left-0" icon={<Cross size={24} />} />
        <span>{title}</span>
        <span
          onClick={resetFilter}
          className="underline text-primary1 font-normal text-P2 cursor-pointer absolute right-0 mt-2p"
        >
          {intl.formatMessage({ id: 'search.filters.clearAll' }).toUpperCase()}
        </span>
      </div>
      {filtersList.map(filter => (
        <MobileFilterMenuSection
          title={filter.label}
          key={filter.id}
          onClick={filter.onSelect}
          selectedFiltersLabels={filter.selectedFiltersLabels}
        />
      ))}
    </Slide>
  );
};
