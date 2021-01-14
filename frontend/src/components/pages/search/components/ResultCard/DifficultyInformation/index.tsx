import React from 'react';
import SVG from 'react-inlinesvg';

import { colorPalette, getSpacing, typography } from 'stylesheet';
import styled from 'styled-components';

interface Props {
  iconUri: string;
  children: React.ReactNode;
  className?: string;
}

export const DifficultyInformation: React.FC<Props> = ({ iconUri, children, className = '' }) => {
  return (
    <div className={`flex items-center text-primary1 ${className} `}>
      <SVG src={iconUri} className="desktop:w-6" />
      <InformationText>{children}</InformationText>
    </div>
  );
};

const InformationText = styled.span`
  margin-left: ${getSpacing(2)};
  ${typography.small}
  color: ${colorPalette.darkPurple}
`;
