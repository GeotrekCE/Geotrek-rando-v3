import MobileBottomClear from 'components/pages/search/components/FilterBar/MobileBottomClear';
import { CATEGORY_ID, EVENT_ID, OUTDOOR_ID, PRACTICE_ID } from 'modules/filters/constant';
import useCounter from 'components/pages/search/hooks/useCounter';
import { FormattedMessage } from 'react-intl';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'components/Sheet';
import { FilterCategory, FilterState } from '../../modules/filters/interface';
import { countFiltersSelected } from '../../modules/filters/utils';

import { MobileFilterMenuSection } from './MobileFilterMenuSection';

interface Props {
  title: React.ReactNode;
  filtersState: FilterState[];
  filtersList: FilterCategory[];
  resetFilter: () => void;
  resultsNumber: number;
  language: string;
  children: React.ReactNode;
}

export const MobileFilterMenu: React.FC<Props> = ({
  filtersState,
  title,
  resetFilter,
  resultsNumber,
  filtersList,
  language,
  children,
}) => {
  const { treksCount, touristicContentsCount, outdoorSitesCount, touristicEventsCount } =
    useCounter({ language });

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="desktop:hidden z-sliderMenu w-[80vw]">
        <SheetHeader>
          <SheetTitle className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="pb-10 h-full overflow-auto p-6 -mt-6 -mx-6">
          {filtersList.map(item => {
            if (treksCount === 0 && item.id === PRACTICE_ID) return null;
            if (touristicContentsCount === 0 && item.id === CATEGORY_ID) return null;
            if (outdoorSitesCount === 0 && item.id === OUTDOOR_ID) return null;
            if (touristicEventsCount === 0 && item.id === EVENT_ID) return null;

            const numberSelected = countFiltersSelected(
              filtersState,
              item.filters,
              item.subFilters,
            );
            const name = Array.isArray(item.name) ? (
              <FormattedMessage id={'search.filters.treksOutdoorGrouped'} />
            ) : (
              item.name
            );
            return (
              <MobileFilterMenuSection
                type={item.id}
                title={name}
                key={item.id}
                onClick={item.onSelect}
                numberSelected={numberSelected}
              />
            );
          })}
        </div>
        <SheetFooter>
          <MobileBottomClear resetFilter={resetFilter} resultsNumber={resultsNumber} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
