import React from 'react';

import { colorPalette, getSpacing, typography } from 'stylesheet';
import styled from 'styled-components';

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Base Information component with an unopiniated icon props, please use LocalIconInformation or RemoteIconInformation
 * @deprecated
 */
export const Information: React.FC<Props> = ({ icon, children, className = '' }) => {
  return (
    <div className={`flex items-center text-primary1 ${className} `}>
      {icon}
      <InformationText>{children}</InformationText>
    </div>
  );
};

const InformationText = styled.span`
  margin-left: ${getSpacing(2)};
  ${typography.small}
  color: ${colorPalette.darkPurple}
`;
