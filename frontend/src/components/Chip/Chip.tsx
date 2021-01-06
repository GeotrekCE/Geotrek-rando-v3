import React from 'react';
import styled, { css } from 'styled-components';

import { borderRadius, colorPalette, desktopOnly, getSpacing, typography } from 'stylesheet';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<Props> = ({ className, children }) => {
  return (
    <ChipContainer className={className}>
      <span>{children}</span>
    </ChipContainer>
  );
};

const ChipContainer = styled.div`
  border-radius: ${borderRadius.chip};
  padding: ${getSpacing(1)} ${getSpacing(2)};

  background-color: ${colorPalette.primary2};

  ${typography.small}
  color: ${colorPalette.primary3}

  ${desktopOnly(css`
    ${typography.main}
  `)}
`;
