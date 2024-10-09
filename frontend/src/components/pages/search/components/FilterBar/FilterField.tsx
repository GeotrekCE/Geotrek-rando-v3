import { ChevronDown } from 'components/Icons/ChevronDown';
import { Cross } from 'components/Icons/Cross';
import ShowFilters from 'components/pages/search/components/FilterBar/ShowFilters';
import { Fragment } from 'react';
import { groupBy } from 'modules/utils/array';

import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { DateFilter, FilterState, Option } from '../../../../../modules/filters/interface';
import { countFiltersSelected } from '../../../../../modules/filters/utils';
import { getActivityColorClassName } from '../ResultCard/getActivityColor';
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
      <button
        type="button"
        className={cn(
          'h-14 border-l block border-greysoft inline-flex items-center pl-2 pr-2',
          expanded ? 'shadow-inner' : 'bg-white',
        )}
        onClick={onClick}
      >
        {numberSelected > 0 && (
          <span
            className={cn(
              'bg-primary1 text-white rounded-full size-6 flex items-center justify-center font-bold',
              getActivityColorClassName(id, { withBackground: true }),
            )}
          >
            {numberSelected}
          </span>
        )}
        {tabLabel !== null && <span className="ml-4 mr-4">{tabLabel}</span>}
        <ChevronDown className={`${expanded ? '' : '-rotate-90'} text-primary1`} size={30} />
      </button>
      <div
        className={cn(
          'fixed left-0 right-0 bottom-0 top-headerAndFilterBar bg-greyDarkColored opacity-40 z-[101]',
          expanded ? 'block' : 'hidden',
        )}
        onClick={onClick}
      />
      <div
        className={cn(
          'fixed left-0 right-0 top-headerAndFilterBar bg-white p-8 shadow-inner z-[101]',
          expanded ? 'block' : 'hidden',
        )}
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
      </div>
    </div>
  );
};

export default FilterField;
