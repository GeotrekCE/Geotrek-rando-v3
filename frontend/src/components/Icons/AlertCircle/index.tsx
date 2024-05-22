import React from 'react';
import { GenericIconProps } from '../types';

export const AlertCircle: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
        stroke={color}
        width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12.5" cy="15" r="1" fill={color} />
    </svg>
  );
};
