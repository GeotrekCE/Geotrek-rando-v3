import { Bin } from 'components/Icons/Bin';
import { Filter } from 'components/Icons/Filter';
import FilterField from 'components/pages/search/components/FilterBar/FilterField';
import useCounter from 'components/pages/search/hooks/useCounter';
import { getGlobalConfig } from 'modules/utils/api.config';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import {
  CATEGORY_ID,
  CITY_ID,
  DATE_FILTER,
  DISTRICT_ID,
  EVENT_ID,
  ORGANIZER_ID,
  OUTDOOR_ID,
  PRACTICE_ID,
  STRUCTURE_ID,
  THEME_ID,
} from '../../../../../modules/filters/constant';
import {
  DateFilter,
  FilterCategory,
  FilterState,
  Option,
} from '../../../../../modules/filters/interface';

interface Props {
  filtersState: FilterState[];
  dateFilter: DateFilter;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (dFilter: DateFilter) => void;
  resetFilters: () => void;
  resultsNumber: number;
  language: string;
}

const { groupTreksAndOutdoorFilters, enableOutdoor } = getGlobalConfig();

const treksAndOutdoorCategories =
  groupTreksAndOutdoorFilters === true && enableOutdoor === true
    ? [
        {
          id: PRACTICE_ID,
          name: [
            <FormattedMessage key="practices" id={'search.filters.practices'} />,
            <FormattedMessage key="outdoors" id={'search.filters.outdoorPractice'} />,
          ],
          filters: [PRACTICE_ID, OUTDOOR_ID],
          subFilters: [
            [
              'difficulty',
              'duration',
              'length',
              'routes',
              'ascent',
              'accessibilities',
              'networks',
              'labels',
            ],
            ['type-outdoorRating-.+'],
          ],
        },
      ]
    : [
        {
          id: PRACTICE_ID,
          name: <FormattedMessage id={'search.filters.practices'} />,
          filters: [PRACTICE_ID],
          subFilters: [
            'difficulty',
            'duration',
            'length',
            'routes',
            'ascent',
            'accessibilities',
            'networks',
            'labels',
          ],
        },
        {
          id: OUTDOOR_ID,
          name: <FormattedMessage id={'search.filters.outdoorPractice'} />,
          filters: [OUTDOOR_ID],
          subFilters: ['type-outdoorRating-.+'],
        },
      ];

export const FILTERS_CATEGORIES: FilterCategory[] = [
  ...treksAndOutdoorCategories,
  {
    id: CATEGORY_ID,
    name: <FormattedMessage id={'search.filters.categories'} />,
    filters: [CATEGORY_ID],
    subFilters: ['type-services-.+'],
  },
  {
    id: EVENT_ID,
    name: <FormattedMessage id={'search.filters.event'} />,
    filters: [EVENT_ID],
    subFilters: [DATE_FILTER, ORGANIZER_ID],
  },
  {
    id: THEME_ID,
    name: <FormattedMessage id={'search.filters.themes'} />,
    filters: [THEME_ID],
  },
  {
    id: 'localization',
    name: <FormattedMessage id={'search.filters.localization'} />,
    subFilters: [CITY_ID, DISTRICT_ID, STRUCTURE_ID],
  },
];

const FilterBarNew: React.FC<Props> = ({
  filtersState,
  dateFilter,
  setFilterSelectedOptions,
  setDateFilter,
  resetFilters,
  resultsNumber,
  language,
}) => {
  const [expanded, setExpanded] = useState<string>('');
  const { treksCount, touristicContentsCount, outdoorSitesCount, touristicEventsCount } =
    useCounter({ language });

  return (
    <ClearContainer className="flex items-center shadow-lg bg-white z-20">
      <div className="inline-block ml-4 mr-4 flex items-center">
        <Filter size={24} className="text-primary1" />
        <span className="uppercase text-primary1 ml-2">
          <FormattedMessage id={'search.filters.filters'} />
        </span>
      </div>

      {FILTERS_CATEGORIES.map(filterField => {
        const handleClick = () => setExpanded(expanded === filterField.id ? '' : filterField.id);

        if (treksCount === 0 && filterField.id === PRACTICE_ID) return null;
        if (touristicContentsCount === 0 && filterField.id === CATEGORY_ID) return null;
        if (outdoorSitesCount === 0 && filterField.id === OUTDOOR_ID) return null;
        if (touristicEventsCount === 0 && filterField.id === EVENT_ID) return null;

        return (
          <FilterField
            key={filterField.id}
            id={filterField.id}
            name={filterField.name}
            filters={filterField.filters}
            subFilters={filterField.subFilters}
            filtersState={filtersState}
            dateFilter={dateFilter}
            expanded={expanded === filterField.id}
            onClick={handleClick}
            setFilterSelectedOptions={setFilterSelectedOptions}
            setDateFilter={setDateFilter}
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
