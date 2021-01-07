import React from 'react';
import { GenericIconProps } from '../types';

export const Cross: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.707 1.707A1 1 0 0012.293.293L7 5.586 1.707.293A1 1 0 00.293 1.707L5.586 7 .293 12.293a1 1 0 101.414 1.414L7 8.414l5.293 5.293a1 1 0 001.414-1.414L8.414 7l5.293-5.293z"
        fill={color}
      />
    </svg>
  );
};
