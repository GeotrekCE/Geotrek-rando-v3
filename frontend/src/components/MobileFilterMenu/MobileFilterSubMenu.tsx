import MobileBottomClear from 'components/pages/search/components/FilterBar/MobileBottomClear';
import ShowFilters from 'components/pages/search/components/FilterBar/ShowFilters';
import VigilanceSection from 'components/pages/search/components/FilterBar/VigilanceSection';
import { groupBy } from 'modules/utils/array';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { DateFilter, FilterCategory, FilterState, Option } from 'modules/filters/interface';

import { FormattedMessage } from 'react-intl';
import { useFilterBar } from 'components/pages/search/components/FilterBar/useFilterBar';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from 'components/Sheet';
import {
  CATEGORY_ID,
  DATE_FILTER,
  DATE_FILTER_CONTENTS,
  HIDE_CLOSED_CONTENTS_ID,
  HIDE_CLOSED_TREKS_ID,
  PRACTICE_ID,
  VIGILANCE_TYPE_CONTENTS_EXCLUDE_ID,
  VIGILANCE_TYPE_CONTENTS_ID,
  VIGILANCE_TYPE_EXCLUDE_ID,
  VIGILANCE_TYPE_ID,
} from 'modules/filters/constant';
import { getGlobalConfig } from 'modules/utils/api.config';
import { CloseButton } from './CloseButton';

const VIGILANCE_SECTION_IDS = [
  DATE_FILTER,
  HIDE_CLOSED_TREKS_ID,
  VIGILANCE_TYPE_ID,
  VIGILANCE_TYPE_EXCLUDE_ID,
  DATE_FILTER_CONTENTS,
  HIDE_CLOSED_CONTENTS_ID,
  VIGILANCE_TYPE_CONTENTS_ID,
  VIGILANCE_TYPE_CONTENTS_EXCLUDE_ID,
];

interface Props {
  handleClose: () => void;
  filterId: string;
  filtersState: FilterState[];
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  resultsNumber: number;
  resetFilter: () => void;
  dateFilter: DateFilter;
  setDateFilter: (dFilter: DateFilter) => void;
  isOpen: boolean;
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
  isOpen,
}) => {
  const isVigilanceEnabled = getGlobalConfig().enableVigilanceAreas;

  const { FILTERS_CATEGORIES } = useFilterBar();
  const categories = FILTERS_CATEGORIES.find(i => i.id === filterId);
  const filters = categories?.filters;
  const subFilters = categories?.subFilters;
  const name = categories?.name;

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

  const filtersToDisplay = filtersState.filter(({ id }) => filters?.includes(id));

  const practiceFilter = filtersState.find(f => f.id === PRACTICE_ID);
  const hasSelectedPractice = (practiceFilter?.selectedOptions?.length ?? 0) > 0;
  const categoryFilter = filtersState.find(f => f.id === CATEGORY_ID);
  const hasSelectedCategory = (categoryFilter?.selectedOptions?.length ?? 0) > 0;

  const shouldShowVigilanceSection =
    isVigilanceEnabled &&
    ((filterId === PRACTICE_ID && hasSelectedPractice) ||
      (filterId === CATEGORY_ID && hasSelectedCategory));

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="z-sliderMenu w-[80vw]">
        <SheetHeader>
          <SheetTitle className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none">
            <CloseButton
              onClick={handleClose}
              className="absolute left-0"
              icon={<ArrowLeft size={24} aria-hidden />}
            >
              <span className="sr-only">
                <FormattedMessage id="details.close" />
              </span>
            </CloseButton>
            {Array.isArray(name) ? (
              <FormattedMessage id={'search.filters.treksOutdoorGrouped'} />
            ) : (
              name
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="pb-20 h-full overflow-auto p-6 -mx-6">
          {filtersToDisplay.map(state => (
            <ShowFilters
              key={state.id}
              item={state}
              setFilterSelectedOptions={setFilterSelectedOptions}
              hideLabel
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          ))}
          {shouldShowVigilanceSection && (
            <VigilanceSection
              filtersState={filtersState}
              dateFilter={dateFilter}
              setFilterSelectedOptions={setFilterSelectedOptions}
              setDateFilter={setDateFilter}
              filterId={filterId}
            />
          )}
          {subFiltersToDisplay.map((subFilter, index) => (
            <div className="space-y-4" key={index}>
              {Object.keys(subFilter).length > 0 &&
                filtersToDisplay.length > 0 &&
                !shouldShowVigilanceSection && (
                  <div className="w-10/12 h-1p mx-auto my-4 bg-greySoft" key="sep" />
                )}
              {Object.keys(subFilter).map(key => {
                const value =
                  key !== 'undefined' && key !== 'event'
                    ? key
                    : filtersToDisplay[index]?.selectedOptions.map(({ label }) => label).join('/');
                const validList = subFilter[key].filter(filter =>
                  isVigilanceEnabled ? !VIGILANCE_SECTION_IDS.includes(filter.id) : true,
                );
                if (validList.length === 0) return null;
                return (
                  <div className="m-1" key={value}>
                    <p className="font-bold mb-2">{value}</p>
                    {validList.map(filterState => (
                      <div className="my-1" key={value + filterState.id}>
                        <ShowFilters
                          item={filterState}
                          setFilterSelectedOptions={setFilterSelectedOptions}
                          dateFilter={dateFilter}
                          setDateFilter={setDateFilter}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <SheetFooter>
          <MobileBottomClear resetFilter={resetFilter} resultsNumber={resultsNumber} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
