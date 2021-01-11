import {
  BaseFilters,
  DisplayableAvailableFilters,
  FilterValues,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import { useState } from 'react';
import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

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
  const [filterBarState, setFilterBarState] = useState<'HIDDEN' | 'DISPLAYED'>('HIDDEN');
  const collapsableSectionClassName = `flex mt-4 ${filterBarState === 'HIDDEN' ? 'hidden' : ''}`;
  const containerClassName = `w-full py-3 pl-5 pr-2 hidden desktop:block fixed shadow bg-white z-sliderMenu ${
    filterBarState === 'HIDDEN' ? 'h-filterBar' : ''
  }`;

  return (
    <div className={containerClassName}>
      <div className="flex">
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <SeeMoreButton
          icon={Plus}
          onClick={() => setFilterBarState('DISPLAYED')}
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
          onClick={() => setFilterBarState('HIDDEN')}
        >
          <ChevronUp size={44} />
        </div>
      </div>
    </div>
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

const SeeMoreButton = styled(Button)<{ filterBarState: 'DISPLAYED' | 'HIDDEN' }>`
  margin: 0 ${getSpacing(1)};

  ${({ filterBarState }) => filterBarState === 'DISPLAYED' && 'display: none'};
`;
