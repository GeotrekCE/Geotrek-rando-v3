import React from 'react';
import { GenericIconProps } from '../types';

export const Search: React.FC<GenericIconProps> = ({ color = 'currentColor', size, ...props }) => {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16 8.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" stroke={color} strokeWidth={2} />
      <path
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.164 14.25l5.586 5.586"
      />
    </svg>
  );
};
