/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * We disable unsafe return beccause the lib react-select types it styles with any
 */

import { ReactElement } from 'react';
import { colorPalette } from 'stylesheet';
import Select from 'react-select';

interface Props {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
}

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: 'none',
    minWidth: '150px',
    borderColor: colorPalette.filter.borderColor,
    ':hover': {
      borderColor: colorPalette.filter.borderColor,
    },
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
  multiValue: (styles: any) => {
    return {
      ...styles,
      backgroundColor: colorPalette.filter.selected.background,
    };
  },
  input: (styles: any) => ({ ...styles, backgroundColor: 'black' }),
  placeholder: (styles: any) => ({ ...styles, color: colorPalette.filter.placeholder.color }),
};

export const SelectableDropdown = (props: Props): ReactElement => (
  <Select
    options={props.options}
    isClearable={false}
    isSearchable={false}
    name={props.name}
    placeholder={props.placeholder}
    isMulti
    classNamePrefix="select"
    closeMenuOnSelect={false}
    styles={colourStyles}
  />
);
