import { ChevronDown } from 'components/Icons/ChevronDown';
import { Cross } from 'components/Icons/Cross';
import ShowFilters from 'components/pages/search/components/FilterBar/ShowFilters';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { colorPalette, sizes } from 'stylesheet';
import { groupBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { DateFilter, FilterState, Option } from '../../../../../modules/filters/interface';
import { countFiltersSelected } from '../../../../../modules/filters/utils';
import getActivityColor from '../ResultCard/getActivityColor';
import SubFilterField from './SubFilterField';

interface Props {
  id: string;
  name: React.ReactElement | React.ReactElement[];
  filters?: string[];
  subFilters?: string[] | string[][];
  filtersState: FilterState[];
  dateFilter: DateFilter;
  expanded: boolean;
  onClick: () => void;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (dFilter: DateFilter) => void;
}

const BACKGROUND_EXPANDED = '#fefefe';

const FilterField: React.FC<Props> = ({
  id,
  name,
  expanded,
  onClick,
  filters,
  subFilters,
  filtersState,
  dateFilter,
  setFilterSelectedOptions,
  setDateFilter,
}) => {
  const filtersToDisplay = filtersState.filter(filter => filters?.includes(filter.id));

  const numberSelected = countFiltersSelected(filtersState, filters, subFilters);

  const tabLabel = Array.isArray(name) ? (
    <FormattedMessage id={'search.filters.treksOutdoorGrouped'} />
  ) : (
    name
  );

  const nextSubFilters =
    (Array.isArray(subFilters) &&
    subFilters.some((subFilter: string | string[]) => !Array.isArray(subFilter))
      ? ([subFilters] as string[][])
      : (subFilters as string[][])) ?? [];

  const subFiltersToDisplay = nextSubFilters.map(
    item =>
      groupBy(
        filtersState.filter(filter =>
          item.some((subFilter: string) => new RegExp(subFilter).test(filter.id)),
        ),
        'category',
      ) ?? {},
  );

  const nextFilters: FilterState[] = filtersToDisplay.length
    ? filtersToDisplay
    : Array.from({ length: subFiltersToDisplay.length });

  return (
    <div>
      <Container
        className={`inline-flex items-center pl-2 pr-2 ${expanded ? 'shadow-inner' : ''}`}
        style={{ background: expanded ? BACKGROUND_EXPANDED : 'white' }}
        onClick={onClick}
      >
        {numberSelected > 0 && (
          <div
            className="bg-primary1 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold"
            style={{ background: getActivityColor(id) }}
          >
            {numberSelected}
          </div>
        )}
        {tabLabel !== null && <div className="ml-4 mr-4">{tabLabel}</div>}
        <ChevronDown
          className={`transform ${expanded ? '' : '-rotate-90'} text-primary1`}
          size={30}
        />
      </Container>
      <BackgroundFields style={{ display: expanded ? 'block' : 'none' }} onClick={onClick} />
      <ContainerFields
        className="shadow-inner"
        style={{ display: expanded ? 'block' : 'none', background: BACKGROUND_EXPANDED }}
      >
        {nextFilters.map((filterState, index) => (
          <Fragment key={filterState?.id ?? index}>
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-4xl">{Array.isArray(name) ? name[index] : name}</div>
              {index === 0 && (
                <button type="button" onClick={onClick}>
                  <Cross size={30} />
                </button>
              )}
            </div>
            <div className="mb-4">
              <ShowFilters
                item={filterState}
                setFilterSelectedOptions={setFilterSelectedOptions}
                hideLabel
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <SubFilterField
                filters={subFiltersToDisplay[index]}
                dateFilter={dateFilter}
                setFilterSelectedOptions={setFilterSelectedOptions}
                setDateFilter={setDateFilter}
              />
            </div>
          </Fragment>
        ))}
      </ContainerFields>
    </div>
  );
};

const ContainerFields = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  background: ${colorPalette.white};
  width: 100%;
  z-index: 10;
  padding: 32px;
`;

const BackgroundFields = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: ${sizes.headerAndFilterbar}px;
  background-color: ${colorPalette.greyDarkColored};
  opacity: 0.4;
  z-index: 9;
`;

const Container = styled.div`
  height: 55px;
  border-left: 1px solid ${colorPalette.greySoft.DEFAULT};
  cursor: pointer;
`;

export default FilterField;
