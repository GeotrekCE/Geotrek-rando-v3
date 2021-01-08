import React from 'react';

import { GenericIconProps } from 'components/Icons/types';
import { colorPalette, getSpacing, typography } from 'stylesheet';
import styled from 'styled-components';

interface Props {
  icon: React.FC<GenericIconProps>;
  children: React.ReactNode;
  className?: string;
}

export const Information: React.FC<Props> = ({ icon: Icon, children, className = '' }) => {
  return (
    <div className={`flex items-center text-primary1 ${className} `}>
      <Icon size={24} />
      <InformationText>{children}</InformationText>
    </div>
  );
};

const InformationText = styled.span`
  margin-left: ${getSpacing(2)};
  ${typography.small}
  color: ${colorPalette.darkPurple}
`;
