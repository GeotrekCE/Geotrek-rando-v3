import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { colorPalette, typography } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

import { Filter } from 'components/Icons/Filter';
import { NumberBadge } from '../NumberBadge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  activeFiltersNumber: number;
}

export const ToggleFilterButton: React.FC<Props> = ({
  activeFiltersNumber,
  ...nativeButtonProps
}) => {
  return (
    <button
      className="flex items-center desktop:hidden text-primary1
      hover:text-primary1-light transition-all duration-300
      focus:outline-none"
      {...nativeButtonProps}
    >
      {activeFiltersNumber === 0 ? (
        <Filter size={16} className="mr-2" />
      ) : (
        <NumberBadge className="mr-1">{activeFiltersNumber}</NumberBadge>
      )}
      <span className="ml-1 font-bold">
        <FormattedMessage id="search.filter" />
      </span>
    </button>
  );
};
