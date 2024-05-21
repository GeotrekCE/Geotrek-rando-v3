import { optimizeAndDefineColor } from 'stylesheet';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
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

const Wrapper = styled.div<{ color?: string }>`
  z-index: 100;
  max-width: 32px;
  transition: max-width 0.6s;

  &:hover {
    max-width: 300%;
  }
`;

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
    <Wrapper
      className={cn(
        'absolute top-4 left-4 h-8 flex items-center rounded-full shadow-sm text-white border-2 border-white border-solid overflow-hidden',
        getActivityColorClassName(type, { withBackground: true }),
      )}
    >
      <Icon
        iconUri={iconUri}
        className={cn('size-7 shrink-0', getActivityColorClassName(type, { withBackground: true }))}
      />
      {iconName && <div className="pr-3 whitespace-nowrap">{iconName}</div>}
    </Wrapper>
  );
};
