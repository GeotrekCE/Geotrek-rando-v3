import Select, { CSSObjectWithLabel, OnChangeValue } from 'react-select';
import { Option } from 'modules/filters/interface';
import { useIntl } from 'react-intl';
import { colorPalette, sizes } from 'stylesheet';

export interface SelectableDropdownProps {
  name: string;
  options: Option[];
  placeholder: string;
  setFilterSelectedOptions: (options: Option[]) => void;
  selectedFilters: Option[];
  filterType: 'SINGLE' | 'MULTIPLE';
  closeMenuOnSelect?: boolean;
  required?: boolean;
  onBlur?: () => void;
}

const colourStyles = {
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: 'none',
    minWidth: '160px',
    borderColor: colorPalette.filter.borderColor,
    ':hover': {
      borderColor: colorPalette.filter.borderColor,
    },
    minHeight: sizes.button,
  }),
  option: (styles: CSSObjectWithLabel, { data }: { data: Option }) => {
    return {
      ...styles,
      backgroundColor: colorPalette.filter.background,
      color: colorPalette.filter.color,
      ':hover': {
        backgroundColor: colorPalette.filter.hover.background,
        color: colorPalette.filter.hover.color,
      },
      display: 'flex',
      alignItems: 'center',
      ':before': {
        content: data.pictogramUrl !== undefined ? '" "' : undefined,
        background: data.pictogramUrl !== undefined ? `url(${data.pictogramUrl})` : '',
        display: 'block',
        marginRight: 8,
        marginLeft: 4,
        width: 24,
        height: 24,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '50%',
        padding: 4,
        backgroundColor: colorPalette.primary1,
        backgroundOrigin: 'content-box',
      },
    };
  },
  multiValue: (styles: CSSObjectWithLabel, { data }: { data: Option }) => {
    return {
      ...styles,
      padding: '4px 0',
      backgroundColor: colorPalette.filter.selected.background,
      ':before': {
        content: data.pictogramUrl !== undefined ? '" "' : undefined,
        background: data.pictogramUrl !== undefined ? `url(${data.pictogramUrl})` : '',
        display: 'block',
        marginRight: 2,
        marginLeft: 4,
        width: 24,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '50%',
        padding: 4,
        backgroundColor: colorPalette.primary1,
        backgroundOrigin: 'content-box',
      },
    };
  },
  input: (styles: CSSObjectWithLabel) => ({ ...styles, backgroundColor: 'black' }),
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: colorPalette.filter.placeholder.color,
  }),
};

const computeAction = (action: OnChangeValue<Option, true>): Option[] => {
  if (action === undefined || action === null) return [];
  if (action.length >= 0) return [...action];
  // @ts-expect-error We ignore because the issue is between a readonly array and an array
  return [action];
};

export const SelectableDropdown = (props: SelectableDropdownProps) => {
  const placeholderText = props.placeholder || 'form.selectPlaceholder';
  const intl = useIntl();
  return (
    <Select
      closeMenuOnSelect={false}
      {...props}
      isClearable={props.filterType === 'SINGLE'}
      isSearchable={false}
      placeholder={intl.formatMessage({ id: placeholderText })}
      classNamePrefix="select"
      isMulti={props.filterType === 'MULTIPLE' ? true : undefined}
      instanceId={props.name}
      styles={colourStyles}
      value={props.selectedFilters}
      onChange={(action: OnChangeValue<Option, true>) => {
        const options = computeAction(action);
        props.setFilterSelectedOptions(options);
      }}
    />
  );
};
