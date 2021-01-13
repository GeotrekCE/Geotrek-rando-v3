import {
  BaseFilters,
  DisplayableAvailableFilter,
  DisplayableAvailableFilters,
  DisplayableFilter,
  FilterValues,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import { useState } from 'react';
import styled from 'styled-components';
import { getSpacing, sizes } from 'stylesheet';
import { flexGap } from 'services/cssHelpers';

import { useHideOnScrollDown } from 'hooks/useHideOnScrollDown';
import { Button } from 'components/Button';
import { Plus } from 'components/Icons/Plus';
import { ChevronUp } from 'components/Icons/ChevronUp';

import { SelectableDropdown } from './SelectableDropdown';

interface Props {
  availableFilters: DisplayableAvailableFilters | undefined;
  selectedFilters: SelectedFilters;
  setFilterValues: (filter: BaseFilters | TrekFilters, values: FilterValues) => void;
}

const Filter = ({
  name,
  availableFilter,
  setFilterValues,
  selectedFilters,
}: {
  name: string;
  availableFilter: DisplayableAvailableFilter;
  setFilterValues: (values: FilterValues) => void;
  selectedFilters: DisplayableFilter[];
}) => {
  if (availableFilter.options.length > 0) {
    return (
      <div className="desktop:mr-2">
        <SelectableDropdown
          name={name}
          placeholder={availableFilter.label}
          options={availableFilter.options}
          setFilterValues={(values: FilterValues) => setFilterValues(values)}
          selectedFilters={selectedFilters}
        />
      </div>
    );
  } else return null;
};

export const FilterBar: React.FC<Props> = props => {
  const [filterBarExpansionState, setFilterBarExpansionState] = useState<'EXPANDED' | 'COLLAPSED'>(
    'COLLAPSED',
  );

  const filterBarDisplayedState = useHideOnScrollDown(sizes.desktopHeader);

  const filterBarContainerClassName = `w-full py-3 pl-6 pr-2 hidden desktop:block fixed shadow bg-white z-floatingButton`;

  return (
    <Container className={filterBarContainerClassName} displayedState={filterBarDisplayedState}>
      <div className={`${filterBarExpansionState === 'EXPANDED' ? 'mb-4' : ''}`}>
        <FiltersLayout>
          {props.availableFilters &&
            props.availableFilters[TrekFilters.DIFFICULTY].options.length > 0 && (
              <SelectableDropdown
                name={TrekFilters.DIFFICULTY}
                placeholder={props.availableFilters[TrekFilters.DIFFICULTY].label}
                options={props.availableFilters[TrekFilters.DIFFICULTY].options}
                setFilterValues={(values: FilterValues) =>
                  props.setFilterValues(TrekFilters.DIFFICULTY, values)
                }
                selectedFilters={props.selectedFilters[TrekFilters.DIFFICULTY]}
              />
            )}
          <Filter />
          <Filter />
          <SeeMoreButton
            icon={Plus}
            onClick={() => setFilterBarExpansionState('EXPANDED')}
            filterBarState={filterBarExpansionState}
          >
            Voir plus
          </SeeMoreButton>
        </FiltersLayout>
      </div>
      <AdditionalFilters expansionState={filterBarExpansionState}>
        <FiltersLayout>
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <Filter />
          <CollapseFiltersButton collapseFilters={() => setFilterBarExpansionState('COLLAPSED')} />
        </FiltersLayout>
      </AdditionalFilters>
    </Container>
  );
};

const Filter = () => (
  <SelectableDropdown
    name="difficulties"
    placeholder="search.filters.DIFFICULTY"
    options={[
      { value: 'veryEasy', label: 'Très facile' },
      { value: 'easy', label: 'Facile' },
      { value: 'medium', label: 'Moyen' },
      { value: 'hard', label: 'Difficile' },
    ]}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilterValues={(values: FilterValues) => {}}
    selectedFilters={[]}
  />
);

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
