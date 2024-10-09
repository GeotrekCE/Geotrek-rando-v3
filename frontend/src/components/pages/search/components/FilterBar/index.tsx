import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Bin } from 'components/Icons/Bin';
import { Filter } from 'components/Icons/Filter';
import FilterField from 'components/pages/search/components/FilterBar/FilterField';
import useCounter from 'components/pages/search/hooks/useCounter';

import { CATEGORY_ID, EVENT_ID, OUTDOOR_ID, PRACTICE_ID } from 'modules/filters/constant';
import { DateFilter, FilterState, Option } from 'modules/filters/interface';
import { useFilterBar } from './useFilterBar';

interface Props {
  filtersState: FilterState[];
  dateFilter: DateFilter;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  setDateFilter: (dFilter: DateFilter) => void;
  resetFilters: () => void;
  resultsNumber: number;
  language: string;
}

const FilterBar: React.FC<Props> = ({
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

  const { FILTERS_CATEGORIES } = useFilterBar();

  return (
    <div className="sticky top-desktopHeader flex items-center shadow-lg bg-white z-20 border-l border-gresySoft">
      <div className="inline-block ml-4 mr-4 flex items-center">
        <Filter size={24} className="text-primary1" aria-hidden />
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

      <button
        type="button"
        className="text-primary1 font-bold h-full flex items-center p-4 border-l border-greySoft"
        onClick={resetFilters}
      >
        <Bin size={16} className="mr-2" aria-hidden />
        <FormattedMessage id={'search.filters.clearAll'} />
      </button>

      <div className="pl-2 border-solid border-l border-greySoft">
        <FormattedMessage values={{ count: resultsNumber }} id="search.resultsFoundShort" />
      </div>
    </div>
  );
};

export default FilterBar;
