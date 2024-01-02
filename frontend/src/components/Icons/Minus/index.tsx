import React from 'react';
import { GenericIconProps } from '../types';

export const Minus: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
      {...props}
    >
      <path
        d="M5 12h14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
