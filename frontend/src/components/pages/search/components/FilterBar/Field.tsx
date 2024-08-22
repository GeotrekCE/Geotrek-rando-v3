import React from 'react';
import SVG from 'react-inlinesvg';
import { useIntl } from 'react-intl';
import { optimizeAndDefineColor } from 'stylesheet';
import { cn } from 'services/utils/cn';
import { FilterState, Option } from '../../../../../modules/filters/interface';

interface Props {
  filterState: FilterState;
  onSelect: (options: Option[], include?: boolean) => void;
  hideLabel?: boolean;
}

interface IconProps {
  option: Option;
  isSelected: boolean;
}

const Icon: React.FC<IconProps> = ({ option, isSelected }) => {
  if (option.pictogramUrl === undefined) {
    return null;
  }
  return (
    <SVG
      className={cn('size-6', isSelected ? 'text-primary1' : 'text-greyDarkColored')}
      src={option.pictogramUrl}
      preProcessor={optimizeAndDefineColor()}
      aria-hidden
    />
  );
};

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

  return (
    <div>
      {hideLabel !== true && (
        <div className="mb-1">{intl.formatMessage({ id: filterState?.label || 'Unknown' })}</div>
      )}
      <div className="-m-1 flex flex-wrap">
        {filterState.options.map(option => {
          const selectedOption = filterState.selectedOptions.find(_ => _.value === option.value);

          return (
            <button
              key={option.value}
              onClick={() => handleClick(option)}
              type="button"
              className={cn(
                'p-1 m-1 border border-solid rounded-lg bg-white leading-5',
                selectedOption !== undefined
                  ? 'text-primary1 font-bold bg-primary2 border-transparent'
                  : 'border-black',
                selectedOption?.include === false && 'line-through',
              )}
            >
              <span
                className={cn(
                  'flex items-center gap-2',
                  option.pictogramUrl !== undefined && 'mr-1',
                )}
              >
                <Icon option={option} isSelected={Boolean(selectedOption)} />
                {
                  option.translatedKey !== undefined
                    ? intl.formatMessage({ id: option.translatedKey })
                    : option.label // Deprecated: Backward compatibility
                }
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Field;
