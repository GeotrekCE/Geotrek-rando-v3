import { FILTERS_CATEGORIES } from 'components/pages/search/components/FilterBar';
import MobileBottomClear from 'components/pages/search/components/FilterBar/MobileBottomClear';
import ShowFilters from 'components/pages/search/components/FilterBar/ShowFilters';
import styled from 'styled-components';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { FilterState, Option } from 'modules/filters/interface';
import React from 'react';
// @ts-ignore Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';
import { colorPalette } from 'stylesheet';

import { CloseButton } from './CloseButton';

interface Props {
  handleClose: () => void;
  filterId: string;
  filtersState: FilterState[];
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  resultsNumber: number;
  resetFilter: () => void;
}

export const MobileFilterSubMenu: React.FC<Props> = ({
  handleClose,
  filterId,
  filtersState,
  setFilterSelectedOptions,
  resultsNumber,
  resetFilter,
}) => {
  const item = FILTERS_CATEGORIES.find(i => i.id === filterId);

  if (!item) return null;

  const { name, filters, subFilters } = item;

  const subFiltersToDisplay = filtersState.filter(({ id }) => subFilters?.includes(id));
  const filtersToDisplay = filtersState.filter(({ id }) => filters?.includes(id));

  /* * The library default behaviour is to have a fixed close icon which * made the icon overlap
     with the menu content as we scrolled. * To fix this issue we use our own close button which
     scrolls along * the content and imperatively closes the drawer. */
  return (
    <Slide
      isOpen={true}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={false}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
    >
      <div className="relative text-center w-full pb-4 font-bold border-b border-solid border-greySoft outline-none">
        <CloseButton
          onClick={handleClose}
          className="absolute left-0"
          icon={<ArrowLeft size={24} />}
        />
        <span>{name}</span>
      </div>

      <div className="mt-4" />

      <div className="pb-10">
        {filtersToDisplay.map(state => (
          <ShowFilters
            key={state.id}
            item={state}
            setFilterSelectedOptions={setFilterSelectedOptions}
            hideLabel
          />
        ))}

        {subFiltersToDisplay.length > 0 && filtersToDisplay.length > 0 && <Separator />}

        <div className="space-y-4">
          {subFiltersToDisplay.map(state => (
            <ShowFilters
              key={state.id}
              item={state}
              setFilterSelectedOptions={setFilterSelectedOptions}
            />
          ))}
        </div>
      </div>

      <MobileBottomClear resultsNumber={resultsNumber} resetFilter={resetFilter} />
    </Slide>
  );
};

const Separator = styled.div`
  width: 80%;
  height: 1px;
  margin: 16px auto;
  background-color: ${colorPalette.greySoft.DEFAULT};
`;
