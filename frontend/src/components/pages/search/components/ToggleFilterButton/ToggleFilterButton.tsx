import React from 'react';
import styled from 'styled-components';

import { colorPalette, typography } from 'stylesheet';
import { buttonCssResets } from 'services/cssHelpers';

import { Filter } from 'components/Icons/Filter';

export const ToggleFilterButton: React.FC = () => {
  return (
    <Button className="flex items-center desktop:hidden">
      <Filter size={16} />
      <FilterText className="ml-1">Filtrer</FilterText>
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
