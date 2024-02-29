import { SelectableDropdown } from 'components/pages/search/components/FilterBar/SelectableDropdown';
import Field from 'components/pages/search/components/FilterBar/Field';
import { useIntl } from 'react-intl';
import { DATE_FILTER } from 'modules/filters/constant';
import { DateFilter, FilterState, Option } from '../../../../../modules/filters/interface';
import InputDateWithMagnifier from '../InputDateWithMagnifier';

interface Props {
  item: FilterState;
  setFilterSelectedOptions: (filterId: string, options: Option[]) => void;
  hideLabel?: boolean;
  dateFilter: DateFilter;
  setDateFilter: (dFilter: DateFilter) => void;
}

const ShowFilters: React.FC<Props> = ({
  item,
  setFilterSelectedOptions,
  hideLabel = false,
  dateFilter,
  setDateFilter,
}) => {
  const intl = useIntl();

  if (item === undefined) {
    return null;
  }

  if (item.id === DATE_FILTER) {
    return (
      <fieldset className="flex flex-col mt-4 desktop:mt-0 desktop:ml-5">
        <InputDateWithMagnifier
          value={dateFilter.beginDate}
          onChange={event => {
            const beginDate = event.target.value;
            setDateFilter({
              beginDate,
              endDate: dateFilter.endDate,
            });
          }}
          label={intl.formatMessage({ id: 'search.beginDateFilter' })}
        />
        <InputDateWithMagnifier
          value={dateFilter.endDate}
          onChange={event => {
            const endDate = event.target.value;
            setDateFilter({
              beginDate: dateFilter.beginDate,
              endDate,
            });
          }}
          label={intl.formatMessage({ id: 'search.endDateFilter' })}
        />
      </fieldset>
    );
  }
  // The API can send empty item
  if (item.options === undefined || item.label === '' || item.options.length === 0) {
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
      filterState={item}
      onSelect={(options: Option[], include = true) => {
        const id = include !== true ? `${item.id}_exclude` : item.id.replace('_exclude', '');
        const filteredOptions = options.filter(option => option.include === include);
        setFilterSelectedOptions(id, filteredOptions);
      }}
      hideLabel={hideLabel}
    />
  );
};

export default ShowFilters;
