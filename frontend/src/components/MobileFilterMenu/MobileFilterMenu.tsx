import { Bin } from 'components/Icons/Bin';
import { FILTERS_CATEGORIES } from 'components/pages/search/components/FilterBar';
import React from 'react';
// @ts-ignore Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';
import { FormattedMessage, useIntl } from 'react-intl';

import { Cross } from 'components/Icons/Cross';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
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
  const intl = useIntl();
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
              title={item.name}
              key={item.id}
              onClick={item.onSelect}
              numberSelected={numberSelected}
            />
          );
        })}
      </div>

      <BottomContainer className="shadow-lg">
        <div
          onClick={resetFilter}
          className="text-primary1 font-bold text-P2 cursor-pointer flex items-center w-1/2 justify-center"
        >
          <Bin size={12} className="mr-2" />
          {intl.formatMessage({ id: 'search.filters.clearAll' }).toUpperCase()}
        </div>

        <ClearContainer className="w-1/2">
          <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFoundShort" />
        </ClearContainer>
      </BottomContainer>
    </Slide>
  );
};

const BottomContainer = styled.div`
  display: flex !important;
  align-items: center;
  position: fixed;
  width: 80vw;
  height: 32px;
  bottom: 0;
  right: 0;
`;

const ClearContainer = styled.div`
  border-left: 1px solid ${colorPalette.greySoft.DEFAULT};
  text-align: center;
`;
