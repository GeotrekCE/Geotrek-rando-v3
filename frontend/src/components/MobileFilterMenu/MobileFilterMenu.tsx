import MobileBottomClear from 'components/pages/search/components/FilterBar/MobileBottomClear';
import React from 'react';
// @ts-ignore Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';

import { Cross } from 'components/Icons/Cross';
import getActivityColor from 'components/pages/search/components/ResultCard/getActivityColor';
import { FilterCategory, FilterState } from '../../modules/filters/interface';
import { countFiltersSelected } from '../../modules/filters/utils';

import { CloseButton } from './CloseButton';
import { MobileFilterMenuSection } from './MobileFilterMenuSection';

interface Props {
  handleClose: () => void;
  title: React.ReactNode;
  filtersState: FilterState[];
  filtersList: FilterCategory[];
  resetFilter: () => void;
  resultsNumber: number;
}

export const MobileFilterMenu: React.FC<Props> = ({
  filtersState,
  handleClose,
  title,
  resetFilter,
  resultsNumber,
  filtersList,
}) => {
  return (
    /*
     * The library default behaviour is to have a fixed close icon which
     * made the icon overlap with the menu content as we scrolled.
     * To fix this issue we use our own close button which scrolls along
     * the content and imperatively closes the drawer.
     */
    <Slide
      isOpen={true}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={false}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
      width={'80vw'}
    >
      <div className="relative text-center w-full pb-4 font-bold border-b border-solid border-greySoft outline-none">
        <CloseButton onClick={handleClose} className="absolute left-0" icon={<Cross size={24} />} />
        <span>{title}</span>
      </div>

      <div>
        {filtersList.map(item => {
          const numberSelected = countFiltersSelected(filtersState, item.filters, item.subFilters);

          return (
            <MobileFilterMenuSection
              color={getActivityColor(item.id)}
              title={item.name}
              key={item.id}
              onClick={item.onSelect}
              numberSelected={numberSelected}
            />
          );
        })}
      </div>

      <MobileBottomClear resetFilter={resetFilter} resultsNumber={resultsNumber} />
    </Slide>
  );
};
