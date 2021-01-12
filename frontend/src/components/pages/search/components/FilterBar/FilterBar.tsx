import {
  BaseFilters,
  DisplayableAvailableFilters,
  FilterValues,
  SelectedFilters,
  TrekFilters,
} from 'modules/filters/interface';
import { SelectableDropdown } from './SelectableDropdown';

interface Props {
  availableFilters: DisplayableAvailableFilters | undefined;
  selectedFilters: SelectedFilters;
  setFilterValues: (filter: BaseFilters | TrekFilters, values: FilterValues) => void;
}

export const FilterBar: React.FC<Props> = props => {
  return (
    <div className="w-full py-3 pl-6 pr-2 hidden desktop:flex shadow">
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
    </div>
  );
};
