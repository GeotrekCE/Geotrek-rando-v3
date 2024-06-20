import Select, { CSSObjectWithLabel, OnChangeValue } from 'react-select';
import { Option } from 'modules/filters/interface';
import { useIntl } from 'react-intl';
import { theme } from '../../../../../../tailwind.config';

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
    borderColor: theme.extend.colors.primary1.DEFAULT,
    ':hover': {
      borderColor: theme.extend.colors.primary1.DEFAULT,
    },
    minHeight: theme.spacing[12],
  }),
  option: (styles: CSSObjectWithLabel, { data }: { data: Option }) => {
    return {
      ...styles,
      backgroundColor: theme.extend.colors.white,
      color: theme.extend.colors.black,
      ':hover': {
        backgroundColor: theme.extend.colors.primary2,
        color: theme.extend.colors.black,
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
        backgroundColor: theme.extend.colors.primary1.DEFAULT,
        backgroundOrigin: 'content-box',
      },
    };
  },
  multiValue: (styles: CSSObjectWithLabel, { data }: { data: Option }) => {
    return {
      ...styles,
      padding: '4px 0',
      backgroundColor: theme.extend.colors.primary2,
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
        backgroundColor: theme.extend.colors.primary1.DEFAULT,
        backgroundOrigin: 'content-box',
      },
    };
  },
  input: (styles: CSSObjectWithLabel) => ({ ...styles, backgroundColor: 'black' }),
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: theme.extend.colors.greyDarkColored,
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
