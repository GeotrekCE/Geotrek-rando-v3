import {
  BaseFilters,
  DisplayableAvailableFilters,
  DisplayableFilter,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import { SelectableDropdown } from './SelectableDropdown';

interface Props {
  availableFilters: DisplayableAvailableFilters;
  selectedFilters: SelectedFilters;
  setFilterValues: (filter: BaseFilters | TrekFilters, values: DisplayableFilter[]) => void;
}

export const FilterBar: React.FC<Props> = props => {
  return (
    <div className="w-full py-3 pl-6 pr-2 hidden desktop:flex shadow">
      <SelectableDropdown
        name={TrekFilters.DIFFICULTY}
        placeholder="Difficulté"
        options={props.availableFilters[TrekFilters.DIFFICULTY]}
        setFilterValues={(values: DisplayableFilter[]) =>
          props.setFilterValues(TrekFilters.DIFFICULTY, values)
        }
        selectedFilters={props.selectedFilters[TrekFilters.DIFFICULTY]}
      />
    </div>
  );
};
