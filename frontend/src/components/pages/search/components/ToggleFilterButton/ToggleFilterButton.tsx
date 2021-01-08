import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { colorPalette, typography } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

import { Filter } from 'components/Icons/Filter';

export const ToggleFilterButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...nativeButtonProps
}) => {
  return (
    <Button className="flex items-center desktop:hidden" {...nativeButtonProps}>
      <Filter size={16} />
      <FilterText className="ml-1">
        <FormattedMessage id="search.filter" />
      </FilterText>
    </Button>
  );
};

const Button = styled.button`
  ${buttonCssResets}
  color: ${colorPalette.primary1};
`;

const FilterText = styled.span`
  ${typography.main};
  ${typography.bold};
  color: ${colorPalette.primary1};
`;
