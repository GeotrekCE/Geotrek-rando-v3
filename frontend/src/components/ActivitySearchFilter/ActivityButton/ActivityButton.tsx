import React from 'react';
import SVG from 'react-inlinesvg';

import { colorPalette, fillSvgWithColor } from 'stylesheet';
import { Link } from 'components/Link';
import { ActivityButtonContainer, Text } from './ActivityButton.style';

interface Props {
  iconUrl: string;
  href: string;
  children: React.ReactNode;
}

export const ActivityButton: React.FC<Props> = ({ iconUrl, href, children }) => {
  return (
    <Link href={href}>
      <ActivityButtonContainer>
        <SVG
          src={iconUrl}
          preProcessor={fillSvgWithColor(colorPalette.home.activity.color)}
          className="desktop:w-12"
        />
        <Text>{children}</Text>
      </ActivityButtonContainer>
    </Link>
  );
};
