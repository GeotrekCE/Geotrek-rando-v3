import React from 'react';
import { GenericIconProps } from '../types';

export const Heart: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={opacity}
      className={className}
    >
      <path
        clipRule="evenodd"
        d="M13.893 3.074a3.667 3.667 0 00-5.186 0L8 3.78l-.707-.706A3.668 3.668 0 002.107 8.26l.706.707L8 14.154l5.187-5.187.706-.707a3.667 3.667 0 000-5.186z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
