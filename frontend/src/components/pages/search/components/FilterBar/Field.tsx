import React from 'react';
import SVG from 'react-inlinesvg';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { FilterState, Option } from '../../../../../modules/filters/interface';

interface Props {
  filterState: FilterState;
  onSelect: (options: Option[]) => void;
  hideLabel?: boolean;
  id: string;
}

const Field: React.FC<Props> = ({ filterState, onSelect, hideLabel, id }) => {
  const intl = useIntl();

  const handleClick = (option: Option): void => {
    const alreadySelected = filterState.selectedOptions.some(_ => _.value === option.value);

    if (alreadySelected)
      onSelect(filterState.selectedOptions.filter(_ => _.value !== option.value));
    else onSelect([...filterState.selectedOptions, option]);
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
      {!hideLabel && (
        <div className={'mb-1'}>{intl.formatMessage({ id: filterState?.label || 'Unknown' })}</div>
      )}
      <div className="-m-1 flex flex-wrap">
        {filterState.options.map(option => {
          const isSelected = filterState.selectedOptions.some(_ => _.value === option.value);

          return (
            <div
              key={option.value}
              onClick={() => handleClick(option)}
              className={`p-1 m-1 inline-block width-auto border border-solid rounded-lg bg-white cursor-pointer ${
                isSelected
                  ? 'text-primary1 font-bold bg-primary2 bg-opacity-5 border-transparent'
                  : 'border-black'
              }`}
            >
              <div className={`flex items-center ${option.pictogramUrl ? 'mr-1' : ''}`}>
                {getIcon(option, isSelected)}
                {option.label}
              </div>
            </div>
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
