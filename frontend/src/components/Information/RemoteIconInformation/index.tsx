import Image from 'next/image';
import SVG from 'react-inlinesvg';

import { optimizeSVG } from 'stylesheet';
import { Information } from '../BaseInformation';

export interface Props {
  iconUri: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps BaseInformation and gives it an icon coming from a remote source (url)
 */
export const RemoteIconInformation: React.FC<Props> = ({ iconUri, ...props }) => {
  let icon = null;
  if (RegExp(/(.*).svg/).test(iconUri)) {
    icon = <SVG src={iconUri} className="w-6 h-full" preProcessor={optimizeSVG} />;
  } else if (typeof iconUri === 'string' && iconUri.length) {
    icon = (
      <Image
        loading="lazy"
        src={iconUri}
        className="object-cover object-center size-6"
        alt=""
        width={24}
        height={24}
      />
    );
  }
  return <Information icon={icon} {...props} />;
};
