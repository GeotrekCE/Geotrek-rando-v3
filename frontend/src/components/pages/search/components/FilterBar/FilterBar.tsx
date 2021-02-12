import { useIntl } from 'react-intl';
import { Option } from 'modules/filters/interface';
import styled from 'styled-components';
import { getSpacing, sizes } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { Button } from 'components/Button';
import { Plus } from 'components/Icons/Plus';
import { ChevronUp } from 'components/Icons/ChevronUp';

import { FilterState } from 'modules/filters/interface';
import { SelectableDropdown } from './SelectableDropdown';

const NUMBER_OF_PRIMARY_FILTERS_DISPLAYED = 6;

interface Props {
  filtersState: FilterState[];
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  filterBarExpansionState: 'EXPANDED' | 'COLLAPSED';
  setFilterBarExpansionState: (state: 'EXPANDED' | 'COLLAPSED') => void;
  resetFilters: () => void;
}

export const FilterBar: React.FC<Props> = props => {
  /**
   * Disabled for now to handle the map on the search page
   */
  // const filterBarDisplayedState = useHideOnScrollDown(sizes.desktopHeader);
  const filterBarDisplayedState = 'DISPLAYED';

  const filterBarContainerClassName = `w-full py-3 pl-6 pr-2 hidden desktop:block fixed shadow bg-white z-subHeader text-P2`;

  const intl = useIntl();

  return (
    <Container className={filterBarContainerClassName} displayedState={filterBarDisplayedState}>
      <div className={`${props.filterBarExpansionState === 'EXPANDED' ? 'mb-4' : ''}`}>
        <FiltersLayout>
          {props.filtersState.slice(0, NUMBER_OF_PRIMARY_FILTERS_DISPLAYED).map(filterState => (
            <div key={filterState.id} className="mr-2">
              <SelectableDropdown
                name={filterState.id}
                placeholder={filterState.label}
                options={filterState.options}
                selectedFilters={filterState.selectedOptions}
                setFilterSelectedOptions={(options: Option[]) => {
                  props.setFilterSelectedOptions(filterState.id, options);
                }}
                filterType={filterState.type}
              />
            </div>
          ))}
          <SeeMoreButton
            icon={Plus}
            onClick={() => props.setFilterBarExpansionState('EXPANDED')}
            filterBarState={props.filterBarExpansionState}
          >
            Voir plus
          </SeeMoreButton>
          <div className="flex items-center cursor-pointer" onClick={props.resetFilters}>
            <span className="underline text-primary1 font-bold">
              {intl.formatMessage({ id: 'search.filters.clearAll' }).toUpperCase()}
            </span>
          </div>
        </FiltersLayout>
      </div>
      <AdditionalFilters expansionState={props.filterBarExpansionState}>
        <FiltersLayout>
          {props.filtersState.slice(NUMBER_OF_PRIMARY_FILTERS_DISPLAYED).map(filterState => (
            <div key={filterState.id} className="mr-2">
              <SelectableDropdown
                name={filterState.id}
                placeholder={filterState.label}
                options={filterState.options}
                selectedFilters={filterState.selectedOptions}
                setFilterSelectedOptions={(options: Option[]) => {
                  props.setFilterSelectedOptions(filterState.id, options);
                }}
                filterType={filterState.type}
              />
            </div>
          ))}
          <CollapseFiltersButton
            collapseFilters={() => props.setFilterBarExpansionState('COLLAPSED')}
          />
        </FiltersLayout>
      </AdditionalFilters>
    </Container>
  );
};

const Container = styled.div<{ displayedState: 'DISPLAYED' | 'HIDDEN' }>`
  transition-property: top transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.1s;

  top: ${({ displayedState }) =>
    displayedState === 'DISPLAYED'
      ? sizes.desktopHeader
      : -sizes.desktopHeader - sizes.filterBar}px;

  ${({ displayedState }) => (displayedState === 'HIDDEN' ? 'transform: translateY(-100%)' : '')}
`;

const FiltersLayout = styled.div`
  ${flexGap(getSpacing(2), getSpacing(4))}
`;

const SeeMoreButton = styled(Button)<{ filterBarState: 'EXPANDED' | 'COLLAPSED' }>`
  ${({ filterBarState }) => filterBarState === 'EXPANDED' && 'display: none'};
`;

const AdditionalFilters = styled.div<{ expansionState: 'EXPANDED' | 'COLLAPSED' }>`
  ${({ expansionState }) => (expansionState === 'EXPANDED' ? 'display: flex' : 'display: none')};
  flex-wrap: wrap;
`;

const CollapseFiltersButton = ({ collapseFilters }: { collapseFilters: () => void }) => (
  <div className="mx-4 text-primary1 cursor-pointer" onClick={collapseFilters}>
    <ChevronUp size={44} />
  </div>
);
