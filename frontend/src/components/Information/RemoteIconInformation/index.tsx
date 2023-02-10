import Image from 'next/image';
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
export const RemoteIconInformation: React.FC<Props> = ({ iconUri, ...props }) => {
  let icon = null;
  if (RegExp(/(.*).svg/).test(iconUri)) {
    icon = <SVG src={iconUri} className="w-6 h-full fill-current" />;
  } else if (iconUri.length) {
    icon = (
      <Image
        loading="lazy"
        src={iconUri}
        className="object-cover object-center w-6 h-6"
        alt=""
        width={24}
        height={24}
      />
    );
  }
  return <Information icon={icon} {...props} />;
};
