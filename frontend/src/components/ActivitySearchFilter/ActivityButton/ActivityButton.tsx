import React from 'react';

import SVG from 'react-inlinesvg';
import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { ActivityButtonContainer, Text } from './ActivityButton.style';

interface Props {
  iconUrl: string;
  children: React.ReactNode;
}

export const ActivityButton: React.FC<Props> = ({ iconUrl, children }) => {
  return (
    <ActivityButtonContainer>
      <SVG
        src={iconUrl}
        preProcessor={fillSvgWithColor(colorPalette.home.activity.color)}
        className="desktop:w-12"
      />
      <Text>{children}</Text>
    </ActivityButtonContainer>
  );
};
