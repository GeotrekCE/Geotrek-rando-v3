import React from 'react';
import { GenericIconProps } from '../types';

export const Filter: React.FC<GenericIconProps> = ({ color = 'currentColor', size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M14.667 2.5H1.333l5.334 6.307v4.36L9.333 14.5V8.807L14.667 2.5v0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
