import { SelectableDropdown } from 'components/pages/search/components/FilterBar/SelectableDropdown';
import Field from 'components/pages/search/components/FilterBar/Field';
import React from 'react';
import { FilterState, Option } from '../../../../../modules/filters/interface';

interface Props {
  item: FilterState;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  hideLabel?: boolean;
}

const ShowFilters: React.FC<Props> = ({ item, setFilterSelectedOptions, hideLabel = false }) => {
  // The API can send empty item
  if (item.label === '' || item.options.length === 0) {
    return null;
  }
  return item.options.length > 10 ? (
    <SelectableDropdown
      key={item.id}
      name={item.id}
      placeholder={item.label}
      options={item.options}
      selectedFilters={item.selectedOptions}
      setFilterSelectedOptions={(options: Option[]) => {
        setFilterSelectedOptions(item.id, options);
      }}
      filterType={item.type}
    />
  ) : (
    <Field
      key={item.id}
      id={item.id}
      filterState={item}
      onSelect={(options: Option[]) => {
        setFilterSelectedOptions(item.id, options);
      }}
      hideLabel={hideLabel}
    />
  );
};

export default ShowFilters;
