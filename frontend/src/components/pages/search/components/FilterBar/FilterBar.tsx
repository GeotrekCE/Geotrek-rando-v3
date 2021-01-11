import {
  BaseFilters,
  DisplayableAvailableFilters,
  FilterValues,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import { useState } from 'react';
import styled from 'styled-components';
import { getSpacing, sizes } from 'stylesheet';

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

export const FilterBar: React.FC<Props> = props => {
  const [filterBarState, setFilterBarState] = useState<'OPENED' | 'CLOSED'>('CLOSED');

  const collapsableSectionClassName = `flex mt-4 ${filterBarState === 'CLOSED' ? 'hidden' : ''}`;
  const containerClassName = `w-full py-3 pl-5 pr-2 hidden desktop:block fixed shadow bg-white z-floatingButton ${
    filterBarState === 'CLOSED' ? 'h-filterBar' : ''
  }`;

  const filterBarDisplayedState = useHideOnScrollDown(sizes.desktopHeader);

  return (
    <Container className={containerClassName} displayedState={filterBarDisplayedState}>
      <div className="flex">
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <SeeMoreButton
          icon={Plus}
          onClick={() => setFilterBarState('OPENED')}
          filterBarState={filterBarState}
        >
          Voir plus
        </SeeMoreButton>
      </div>
      <div className={collapsableSectionClassName}>
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <div
          className="mx-4 text-primary1 cursor-pointer"
          onClick={() => setFilterBarState('CLOSED')}
        >
          <ChevronUp size={44} />
        </div>
      </div>
    </Container>
  );
};

const Filter = () => (
  <div className="mx-1">
    <SelectableDropdown
      name="difficulties"
      placeholder="Difficulté"
      options={[
        { value: 'veryEasy', label: 'Très facile' },
        { value: 'easy', label: 'Facile' },
        { value: 'medium', label: 'Moyen' },
        { value: 'hard', label: 'Difficile' },
      ]}
    />
  </div>
);

const Container = styled.div<{ displayedState: 'DISPLAYED' | 'HIDDEN' }>`
  transition: top 0.3s ease-in-out 0.1s;
  top: ${({ displayedState }) =>
    displayedState === 'DISPLAYED'
      ? sizes.desktopHeader
      : -sizes.desktopHeader - sizes.filterBar}px;
`;

const SeeMoreButton = styled(Button)<{ filterBarState: 'OPENED' | 'CLOSED' }>`
  margin: 0 ${getSpacing(1)};

  ${({ filterBarState }) => filterBarState === 'OPENED' && 'display: none'};
`;
