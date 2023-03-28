import {
  SelectableDropdown,
  SelectableDropdownProps,
} from 'components/pages/search/components/FilterBar/SelectableDropdown';
import { useId } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  label?: string;
  error?: string | null;
  field: SelectableDropdownProps;
}

const SelectRow: React.FC<Props> = props => {
  const { error, field, label } = props;
  const inputId = useId();
  const selectErrorId = useId();
  const hasError = Boolean(error);

  return (
    <div className="w-full mb-5">
      {label !== undefined && (
        <label className="block font-bold mb-1" htmlFor={inputId}>
          {label}
          {field.required === true && (
            <>
              {' '}
              <span className="text-sm">
                <FormattedMessage id={'form.required'} />
              </span>
            </>
          )}
        </label>
      )}
      <SelectableDropdown
        {...field}
        {...(hasError && {
          ['aria-invalid']: true,
          ['aria-describedby']: selectErrorId,
          className: 'border border-solid border-hardKO',
        })}
      />
      {hasError && (
        <p className="text-hardKO text-small mt-1" id={selectErrorId}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectRow;
