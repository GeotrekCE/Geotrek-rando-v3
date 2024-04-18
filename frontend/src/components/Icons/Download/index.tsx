import React from 'react';
import { GenericIconProps } from '../types';

export const Download: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.077 19.001v4.923a2.462 2.462 0 01-2.462 2.462H6.385a2.462 2.462 0 01-2.462-2.462v-4.923M8.846 12.847l6.153 6.154 6.154-6.154M15 19.001V4.231"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
