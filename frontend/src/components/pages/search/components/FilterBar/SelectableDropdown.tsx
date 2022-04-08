/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * We disable unsafe return because the lib react-select types it styles with any
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
  filterType: 'SINGLE' | 'MULTIPLE';
  closeMenuOnSelect?: boolean;
}

const colourStyles = {
  control: (styles: any) => ({
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
  option: (styles: any, { data }: { data: Option }) => {
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
  multiValue: (styles: any, { data }: { data: Option }) => {
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
  input: (styles: any) => ({ ...styles, backgroundColor: 'black' }),
  placeholder: (styles: any) => ({ ...styles, color: colorPalette.filter.placeholder.color }),
};

const computeAction = (action: ValueType<Option, true>): Option[] => {
  if (action === undefined || action === null) return [];
  if (action.length >= 0) return [...action];
  //@ts-ignore We ignore because the issue is between a readonly array and an array
  return [action];
};

export const SelectableDropdown = (props: Props): ReactElement => {
  const intl = useIntl();
  return (
    <Select
      closeMenuOnSelect={false}
      {...props}
      isClearable={props.filterType === 'SINGLE'}
      isSearchable={false}
      placeholder={intl.formatMessage({ id: props.placeholder })}
      classNamePrefix="select"
      isMulti={props.filterType === 'MULTIPLE' ? true : undefined}
      styles={colourStyles}
      value={props.selectedFilters}
      onChange={(action: ValueType<Option, true>) => {
        const options = computeAction(action);
        props.setFilterSelectedOptions(options);
      }}
    />
  );
};
