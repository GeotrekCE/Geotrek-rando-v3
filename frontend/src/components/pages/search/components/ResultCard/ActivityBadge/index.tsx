import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import { colorPalette, getSpacing } from 'stylesheet';

interface Props {
  iconUri: string;
  className?: string;
}

export const ActivityBadge: React.FC<Props> = ({ iconUri, className }) => {
  return (
    <Container className={className}>
      <SVG src={iconUri} className="w-5" />
    </Container>
  );
};

const Container = styled.div`
  width: ${getSpacing(8)};
  height: ${getSpacing(8)};
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 2px solid ${colorPalette.white};
  background-color: ${colorPalette.primary1};
  color: ${colorPalette.white};
`;
