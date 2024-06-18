import Image from 'next/image';
import SVG from 'react-inlinesvg';
import { cn } from 'services/utils/cn';

import { optimizeSVG } from 'stylesheet';

export interface Props {
  iconUri: string | null;
  className?: string;
  size?: number;
}

const RemoteIcon: React.FC<Props> = ({ iconUri, className, size = 24 }) => {
  if (!iconUri) {
    return null;
  }
  if (RegExp(/(.*).svg/).test(iconUri)) {
    return (
      <SVG
        src={iconUri}
        className={cn('size-6', className)}
        preProcessor={optimizeSVG}
        aria-hidden
        width={size}
        height={size}
      />
    );
  }
  if (iconUri.length > 4) {
    return (
      <Image
        loading="lazy"
        src={iconUri}
        className={cn('object-cover object-center size-6', className)}
        alt=""
        width={size}
        height={size}
      />
    );
  }
  return null;
};

export default RemoteIcon;
