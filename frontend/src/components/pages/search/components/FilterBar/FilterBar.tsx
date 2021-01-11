import {
  BaseFilters,
  DisplayableAvailableFilters,
  FilterValues,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

import { Button } from 'components/Button';
import { Plus } from 'components/Icons/Plus';

import { SelectableDropdown } from './SelectableDropdown';

interface Props {
  availableFilters: DisplayableAvailableFilters | undefined;
  selectedFilters: SelectedFilters;
  setFilterValues: (filter: BaseFilters | TrekFilters, values: FilterValues) => void;
}

export const FilterBar: React.FC<Props> = props => {
  return (
    <div className="w-full py-3 pl-5 pr-2 hidden desktop:block shadow">
      <div className="flex">
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <SeeMoreButton icon={Plus}>Voir plus</SeeMoreButton>
      </div>
      <div className="flex mt-4">
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <Filter />
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

const SeeMoreButton = styled(Button)`
  margin: 0 ${getSpacing(1)};
`;
