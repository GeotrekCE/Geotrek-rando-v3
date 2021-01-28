/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * We disable unsafe return beccause the lib react-select types it styles with any
 */

import { ReactElement } from 'react';
import Select, { ValueType } from 'react-select';
import { Option } from 'modules/filters/interface';
import { useIntl } from 'react-intl';
import { colorPalette, sizes } from 'stylesheet';

interface Props {
  name: string;
  options: Option[];
  placeholder: string;
  setFilterSelectedOptions: (options: Option[]) => void;
  selectedFilters: Option[];
}

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: 'none',
    minWidth: '180px',
    borderColor: colorPalette.filter.borderColor,
    ':hover': {
      borderColor: colorPalette.filter.borderColor,
    },
    height: sizes.button,
  }),
  option: (styles: any) => {
    return {
      ...styles,
      backgroundColor: colorPalette.filter.background,
      color: colorPalette.filter.color,
      ':hover': {
        backgroundColor: colorPalette.filter.hover.background,
        color: colorPalette.filter.hover.color,
      },
    };
  },
  multiValue: (styles: any, { data }: { data: Option }) => {
    return {
      ...styles,
      padding: '4px 0',
      backgroundColor: colorPalette.filter.selected.background,
      ':before': {
        content: "' '",
        background: data.pictogramUrl !== undefined ? `url(${data.pictogramUrl})` : '',
        display: 'block',
        marginRight: 2,
        marginLeft: 4,
        width: 24,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    };
  },
  input: (styles: any) => ({ ...styles, backgroundColor: 'black' }),
  placeholder: (styles: any) => ({ ...styles, color: colorPalette.filter.placeholder.color }),
};

export const SelectableDropdown = (props: Props): ReactElement => {
  const intl = useIntl();
  return (
    <Select
      options={props.options}
      isClearable={false}
      isSearchable={false}
      name={props.name}
      placeholder={intl.formatMessage({ id: props.placeholder })}
      isMulti
      classNamePrefix="select"
      closeMenuOnSelect={false}
      styles={colourStyles}
      value={props.selectedFilters}
      onChange={(action: ValueType<Option, true>) => {
        const options = action ? [...action] : [];
        props.setFilterSelectedOptions(options);
      }}
    />
  );
};
