import { Bin } from 'components/Icons/Bin';
import { Filter } from 'components/Icons/Filter';
import FilterField from 'components/pages/search/components/FilterBar/FilterField';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { FilterState, Option } from '../../../../../modules/filters/interface';

interface Props {
  filtersState: FilterState[];
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  resetFilters: () => void;
  resultsNumber: number;
}

export const FILTERS_CATEGORIES = [
  {
    id: 'practices',
    name: <FormattedMessage id={'search.filters.practices'} />,
    filters: ['practices'],
    subFilters: ['difficulty', 'duration', 'length', 'routes', 'ascent', 'accessibilities'],
  },
  {
    id: 'outdoor',
    name: <FormattedMessage id={'search.filters.outdoor'} />,
  },
  {
    id: 'categories',
    name: <FormattedMessage id={'search.filters.categories'} />,
    filters: ['categories'],
    subFilters: ['type-services-.+'],
  },
  {
    id: 'events',
    name: <FormattedMessage id={'search.filters.events'} />,
  },
  {
    id: 'themes',
    name: <FormattedMessage id={'search.filters.themes'} />,
    filters: ['themes'],
  },
  {
    id: 'localization',
    name: <FormattedMessage id={'search.filters.localization'} />,
    subFilters: ['cities', 'districts', 'structures'],
  },
];

const FilterBarNew: React.FC<Props> = ({
  filtersState,
  setFilterSelectedOptions,
  resetFilters,
  resultsNumber,
}) => {
  const [expanded, setExpanded] = useState<string>('');

  return (
    <ClearContainer className="flex items-center shadow-lg bg-white" style={{ zIndex: 20 }}>
      <div className="inline-block ml-4 mr-4 flex items-center">
        <Filter size={24} className="text-primary1" />
        <span className="uppercase text-primary1 ml-2">
          <FormattedMessage id={'search.filters.filters'} />
        </span>
      </div>

      {FILTERS_CATEGORIES.map(filterField => {
        const handleClick = () => setExpanded(expanded === filterField.id ? '' : filterField.id);

        return (
          <FilterField
            key={filterField.id}
            name={filterField.name}
            filters={filterField.filters}
            subFilters={filterField.subFilters}
            filtersState={filtersState}
            expanded={expanded === filterField.id}
            onClick={handleClick}
            setFilterSelectedOptions={setFilterSelectedOptions}
          />
        );
      })}

      <ClearContainer
        className="text-primary1 font-bold h-full flex items-center p-4 cursor-pointer"
        onClick={resetFilters}
      >
        <Bin size={16} className="mr-2" />
        <FormattedMessage id={'search.filters.clearAll'} />
      </ClearContainer>

      <ClearContainer className="pl-2">
        <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFoundShort" />
      </ClearContainer>
    </ClearContainer>
  );
};

const ClearContainer = styled.div`
  border-left: 1px solid ${colorPalette.greySoft.DEFAULT};
`;

export default FilterBarNew;
