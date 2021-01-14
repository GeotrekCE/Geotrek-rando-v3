import React from 'react';
import SVG from 'react-inlinesvg';

import { Information } from '../BaseInformation';

export interface Props {
  iconUri: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps BaseInformation and gives it an icon coming from a remote source (url)
 */
export const RemoteIconInformation: React.FC<Props> = ({ iconUri, ...otherProps }) => {
  return <Information icon={<SVG src={iconUri} className="w-6" />} {...otherProps} />;
};
