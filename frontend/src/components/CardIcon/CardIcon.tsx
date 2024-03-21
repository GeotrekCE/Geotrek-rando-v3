import { optimizeAndDefineColor } from 'stylesheet';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import Image from 'next/image';

interface IconProps {
  className?: string;
  iconUri?: string;
  color?: string;
}
interface Props extends IconProps {
  iconName?: string;
}

const Wrapper = styled.div<{ color?: string }>`
  z-index: 100;
  background: ${props => props.color};
  max-width: 32px;
  transition: max-width 0.6s;

  &:hover {
    max-width: 300%;
  }
`;

const NoImg = styled.span<{ color?: string }>`
  background: ${props => props.color};
`;

const Icon: React.FC<IconProps> = ({ iconUri = '', className = '', color }) => {
  if (!iconUri) {
    return <NoImg color={color} className={`block rounded-full ${className}`} />;
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

export const CardIcon: React.FC<Props> = ({ iconUri = '', iconName = '', color }) => {
  if (!iconName && !iconUri) {
    return null;
  }
  return (
    <Wrapper
      className="absolute top-4 left-4 h-8 flex items-center rounded-full shadow-sm text-white border-2 border-white border-solid overflow-hidden"
      color={color}
    >
      <Icon color={color} iconUri={iconUri} className="size-7 shrink-0" />
      {iconName && <div className="pr-3 whitespace-nowrap">{iconName}</div>}
    </Wrapper>
  );
};
