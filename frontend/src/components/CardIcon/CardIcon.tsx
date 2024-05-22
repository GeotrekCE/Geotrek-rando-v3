import { optimizeAndDefineColor } from 'stylesheet';
import SVG from 'react-inlinesvg';
import Image from 'next/image';
import { cn } from 'services/utils/cn';
import { getActivityColorClassName } from 'components/pages/search/components/ResultCard/getActivityColor';

interface IconProps {
  className?: string;
  iconUri?: string;
  type?: string;
}
interface Props extends IconProps {
  iconName?: string;
}

const Icon: React.FC<IconProps> = ({ iconUri = '', className = '' }) => {
  if (!iconUri) {
    return <span className={cn('block rounded-full', className)} />;
  }
  if (RegExp(/(.*).svg/).test(iconUri)) {
    return (
      <SVG
        src={iconUri}
        className={`p-1 text-white ${className}`}
        preProcessor={optimizeAndDefineColor()}
        aria-hidden
      />
    );
  }
  return <Image loading="lazy" className={className} src={iconUri} alt="" width={28} height={28} />;
};

export const CardIcon: React.FC<Props> = ({ iconUri = '', iconName = '', type = null }) => {
  if (!iconName && !iconUri) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute max-w-8 hover:max-w-[300%] top-4 left-4 h-8 flex items-center rounded-full shadow-sm text-white border-2 border-white border-solid overflow-hidden z-[100] transition-all duration-500',
        getActivityColorClassName(type, { withBackground: true }),
      )}
    >
      <Icon
        iconUri={iconUri}
        className={cn('size-7 shrink-0', getActivityColorClassName(type, { withBackground: true }))}
      />
      {iconName && <div className="pr-3 whitespace-nowrap">{iconName}</div>}
    </div>
  );
};
