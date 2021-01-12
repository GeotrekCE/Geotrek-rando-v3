import React from 'react';
import { GenericIconProps } from '../types';

export const MoreHorizontal: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 26a2 2 0 100-4 2 2 0 000 4zM38 26a2 2 0 100-4 2 2 0 000 4zM10 26a2 2 0 100-4 2 2 0 000 4z"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
