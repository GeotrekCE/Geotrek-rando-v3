import React from 'react';
import SVG from 'react-inlinesvg';
import { fillSvgWithColor } from 'stylesheet';

import { Information } from '../BaseInformation';

export interface Props {
  iconUri: string;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

/**
 * Wraps BaseInformation and gives it an icon coming from a remote source (url)
 */
export const RemoteIconInformation: React.FC<Props> = ({ iconUri, color, ...otherProps }) => {
  return (
    <Information
      icon={
        <SVG
          src={iconUri}
          className="w-6 h-full text-primary1"
          preProcessor={color !== undefined ? fillSvgWithColor(color) : undefined}
        />
      }
      {...otherProps}
    />
  );
};
