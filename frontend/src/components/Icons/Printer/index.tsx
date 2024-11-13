import React from 'react';
import { GenericIconProps } from '../types';

export const Printer: React.FC<GenericIconProps> = ({
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
        d="M7.5 11.25V2.5h15v8.75M7.5 22.5H5A2.5 2.5 0 012.5 20v-6.25a2.5 2.5 0 012.5-2.5h20a2.5 2.5 0 012.5 2.5V20a2.5 2.5 0 01-2.5 2.5h-2.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 17.5h15v10h-15z"
      />
    </svg>
  );
};
