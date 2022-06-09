import React from 'react';
import SVG from 'react-inlinesvg';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { FilterState, Option } from '../../../../../modules/filters/interface';

interface Props {
  filterState: FilterState;
  onSelect: (options: Option[], include?: boolean) => void;
  hideLabel?: boolean;
}

const Field: React.FC<Props> = ({ filterState, onSelect, hideLabel }) => {
  const intl = useIntl();

  const handleClick = (option: Option): void => {
    const selectedOption = filterState.selectedOptions.find(({ value }) => value === option.value);

    if (selectedOption !== undefined) {
      onSelect(
        filterState.selectedOptions.filter(({ value }) => value !== option.value),
        Boolean(selectedOption.include),
      );
      if (selectedOption.include !== false) {
        onSelect([...filterState.selectedOptions, { ...option, include: false }], false);
      }
    } else {
      onSelect([...filterState.selectedOptions, { ...option, include: true }], true);
    }
  };

  const getIcon = (option: Option, isSelected: boolean): React.ReactElement | null => {
    if (option.pictogramUrl)
      return isSelected ? (
        <FilledSvgActive src={option.pictogramUrl} />
      ) : (
        <FilledSvg src={option.pictogramUrl} />
      );

    return null;
  };

  return (
    <div>
      {hideLabel !== true && (
        <div className={'mb-1'}>{intl.formatMessage({ id: filterState?.label || 'Unknown' })}</div>
      )}
      <div className="-m-1 flex flex-wrap">
        {filterState.options.map(option => {
          const selectedOption = filterState.selectedOptions.find(_ => _.value === option.value);

          return (
            <button
              key={option.value}
              onClick={() => handleClick(option)}
              type="button"
              className={`p-1 m-1 inline-block width-auto border border-solid rounded-lg bg-white cursor-pointer ${
                selectedOption !== undefined
                  ? 'text-primary1 font-bold bg-primary2 bg-opacity-5 border-transparent'
                  : 'border-black'
              } ${selectedOption?.include === false ? 'line-through' : ''}`}
            >
              <span className={`flex items-center ${option.pictogramUrl ? 'mr-1' : ''}`}>
                {getIcon(option, Boolean(selectedOption))}
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FilledSvg = styled(SVG)`
  height: 24px;
  width: 24px;
  margin-right: 10px;

  & * {
    fill: ${colorPalette.home.activity.color} !important;
  }
`;

const FilledSvgActive = styled(SVG)`
  height: 24px;
  width: 24px;
  margin-right: 10px;

  & * {
    fill: ${colorPalette.primary1} !important;
  }
`;

export default Field;
