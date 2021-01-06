import React from 'react';

import { GenericIconProps } from 'components/Icons/types';
import { colorPalette, getSpacing, typography } from 'stylesheet';
import styled from 'styled-components';

interface Props {
  icon: React.FC<GenericIconProps>;
  children: React.ReactNode;
}

export const Information: React.FC<Props> = ({ icon: Icon, children }) => {
  return (
    <Container>
      <Icon size={24} />
      <InformationText>{children}</InformationText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${colorPalette.primary1};
`;

const InformationText = styled.span`
  margin-left: ${getSpacing(2)};
  ${typography.small}
  color: ${colorPalette.darkPurple}
`;
