import React from 'react';
import { GenericIconProps } from '../types';

export const Orientation: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      opacity={opacity}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.61 23.091L12.2154 12.9596H1.18359L22.3986 1.05371L15.61 23.091Z" fill={color} />
    </svg>
  );
};
