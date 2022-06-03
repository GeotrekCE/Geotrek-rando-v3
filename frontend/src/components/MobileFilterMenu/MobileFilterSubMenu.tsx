import { FILTERS_CATEGORIES } from 'components/pages/search/components/FilterBar';
import MobileBottomClear from 'components/pages/search/components/FilterBar/MobileBottomClear';
import ShowFilters from 'components/pages/search/components/FilterBar/ShowFilters';
import { groupBy } from 'lodash';
import styled from 'styled-components';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { DateFilter, FilterCategory, FilterState, Option } from 'modules/filters/interface';
import React, { useState } from 'react';
// @ts-ignore Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';
import { colorPalette } from 'stylesheet';

import { FormattedMessage, useIntl } from 'react-intl';
import { getGlobalConfig } from 'modules/utils/api.config';
import { EVENT_ID } from 'modules/filters/constant';
import InputDateWithMagnifier from 'components/pages/search/components/InputDateWithMagnifier';
import { CloseButton } from './CloseButton';

interface Props {
  handleClose: () => void;
  filterId: string;
  filtersState: FilterState[];
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  resultsNumber: number;
  resetFilter: () => void;
  dateFilter: DateFilter;
  setDateFilter: (beginDate?: any, endDate?: any) => void;
}

export const MobileFilterSubMenu: React.FC<Props> = ({
  handleClose,
  filterId,
  filtersState,
  setFilterSelectedOptions,
  resultsNumber,
  resetFilter,
  dateFilter,
  setDateFilter,
}) => {
  const intl = useIntl();
  const categories: FilterCategory | undefined = FILTERS_CATEGORIES.find(i => i.id === filterId);

  if (!categories) return null;

  const { filters, subFilters } = categories;

  const name = Array.isArray(categories.name) ? (
    <FormattedMessage id={'search.filters.treksOutdoorGrouped'} />
  ) : (
    categories.name
  );

  const nextSubFilters =
    (Array.isArray(subFilters) &&
    subFilters.some((subFilter: string | string[]) => !Array.isArray(subFilter))
      ? ([subFilters] as string[][])
      : (subFilters as string[][])) ?? [];

  const subFiltersToDisplay = nextSubFilters.map(
    item =>
      groupBy(
        filtersState.filter(({ id }) =>
          item.some((subFilter: string) => new RegExp(subFilter).test(id)),
        ),
        'category',
      ) ?? {},
  );

  const filtersToDisplay = filtersState.filter(({ id }) => filters?.includes(id));

  const entriesFilters = Object.entries(filtersToDisplay);

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
      width={'80vw'}
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
        {entriesFilters[0][1].id === EVENT_ID && (
          <div className="flex flex-col mt-4 desktop:mt-0 desktop:ml-5">
            <div className="font-bold mb-2 text-lg">Agenda</div>
            <InputDateWithMagnifier
              value={dateFilter.beginDate}
              onChange={event => {
                setDateFilter({
                  beginDate: event.target.value,
                  endDate: dateFilter.endDate,
                });
              }}
              placeholder={intl.formatMessage({ id: 'search.beginDateFilter' })}
            />
            <InputDateWithMagnifier
              value={dateFilter.endDate}
              onChange={event => {
                setDateFilter({
                  beginDate: dateFilter.beginDate,
                  endDate: event.target.value,
                });
              }}
              placeholder={intl.formatMessage({ id: 'search.endDateFilter' })}
            />
          </div>
        )}
        {subFiltersToDisplay.map((subFilter, index) => (
          <>
            {Object.keys(subFilter).length > 0 && filtersToDisplay.length > 0 && <Separator />}
            <div className="space-y-4" key={index}>
              {Object.keys(subFilter).map(key => {
                return (
                  <div className={'m-1'} key={key}>
                    <div className={'font-bold mb-2'}>
                      {key !== 'undefined' && key !== 'event'
                        ? key
                        : filtersToDisplay[index].selectedOptions
                            .map(({ label }) => label)
                            .join('/')}
                    </div>
                    {subFilter[key].map(filterState => (
                      <div className={'my-1'} key={filterState.id}>
                        <ShowFilters
                          item={filterState}
                          setFilterSelectedOptions={setFilterSelectedOptions}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        ))}
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
