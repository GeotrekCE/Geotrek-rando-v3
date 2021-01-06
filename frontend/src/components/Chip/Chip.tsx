import React from 'react';
import styled from 'styled-components';

import { borderRadius, colorPalette, getSpacing, typography } from 'stylesheet';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<Props> = ({ className, children }) => {
  return (
    <ChipContainer className={className}>
      <ChipText>{children}</ChipText>
    </ChipContainer>
  );
};

const ChipContainer = styled.div`
  border-radius: ${borderRadius.chip};
  padding: ${getSpacing(1)} ${getSpacing(2)};

  background-color: ${colorPalette.primary2};
`;

const ChipText = styled.span`
  ${typography.main}

  color: ${colorPalette.primary3}
`;
