import React from 'react';

import SVG from 'react-inlinesvg';
import { colorPalette } from 'stylesheet';
import { ActivityButtonContainer, Text } from './ActivityButton.style';

interface Props {
  iconUrl: string;
  children: React.ReactNode;
}

const fillSvgWithThemeColor = (svg: string) =>
  svg.replace(/fill:.*?;/g, `fill: ${colorPalette.home.activity.color};`);

export const ActivityButton: React.FC<Props> = ({ iconUrl, children }) => {
  return (
    <ActivityButtonContainer>
      <SVG src={iconUrl} preProcessor={fillSvgWithThemeColor} className="desktop:w-12" />
      <Text>{children}</Text>
    </ActivityButtonContainer>
  );
};
