import React from 'react';
import { GenericIconProps } from '../types';

export const Square: React.FC<GenericIconProps> = ({
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
        d="M23.52 19.68a3.851 3.851 0 01-3.84 3.84H4.32a3.851 3.851 0 01-3.84-3.84V4.32A3.851 3.851 0 014.32.48h15.36a3.851 3.851 0 013.84 3.84v15.36z"
        fill={color}
      />
    </svg>
  );
};
