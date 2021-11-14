import React from 'react';
import { GenericIconProps } from '../types';

export const Participant: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      opacity={opacity}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.13C17.7699 3.58317 19.0078 5.178 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
