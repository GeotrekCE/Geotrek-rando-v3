import React from 'react';
import { GenericIconProps } from '../types';

export const TrendingUp: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        d="M23 6l-9.5 9.5-5-5L1 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6h6v6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
