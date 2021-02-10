import React from 'react';
import SVG from 'react-inlinesvg';

import { Information } from '../BaseInformation';

export interface Props {
  iconUri: string;
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
}

/**
 * Wraps BaseInformation and gives it an icon coming from a remote source (url)
 * backgroundColor must be a tailwind color : primary1, primary2, etc. No hexa code.
 */
export const RemoteIconInformation: React.FC<Props> = ({
  iconUri,
  backgroundColor,
  ...otherProps
}) => {
  let icon;
  if (RegExp(/(.*).svg/).test(iconUri)) {
    if (backgroundColor !== undefined) {
      icon = (
        <div className={`w-7 h-7 bg-${backgroundColor} rounded-full grid place-items-center`}>
          <SVG src={iconUri} className="w-6 h-6" />
        </div>
      );
    } else {
      icon = <SVG src={iconUri} className="w-6 h-full fill-current" />;
    }
  } else {
    icon = <img src={iconUri} className="object-cover object-center w-6 h-6" />;
  }
  return <Information icon={icon} {...otherProps} />;
};
