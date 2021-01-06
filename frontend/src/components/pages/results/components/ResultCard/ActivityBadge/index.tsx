import React from 'react';
import styled from 'styled-components';

import { GenericIconProps } from 'components/Icons/types';
import { colorPalette, getSpacing } from 'stylesheet';

interface Props {
  icon: React.FC<GenericIconProps>;
  className?: string;
}

export const ActivityBadge: React.FC<Props> = ({ icon: Icon, className }) => {
  return (
    <Container className={className}>
      <Icon size={21} />
    </Container>
  );
};

const Container = styled.div`
  width: ${getSpacing(8)};
  height: ${getSpacing(8)};
  border-radius: 50%;

  display: grid;
  place-items: center;

  border: 2px solid ${colorPalette.white};
  background-color: ${colorPalette.primary1};
  color: ${colorPalette.white};
`;
