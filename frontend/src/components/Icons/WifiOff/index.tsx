import React from 'react';
import { GenericIconProps } from '../types';

export const WifiOff: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      fill="none"
      width={size}
      className={className}
      opacity={opacity}
      viewBox="0 0 24 24"
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="m2 7.92647c1.24008-.79618 2.58126-1.44861 4-1.93376m16 1.93376c-2.8849-1.85224-6.317-2.92647-10-2.92647-.3355 0-.6689.00891-1 .02652" />
        <path d="m5.17159 11.7046c1.4601-.8446 3.09108-1.4267 4.82839-1.6817m8.82842 1.6817c-.8585-.4967-1.7762-.9025-2.7398-1.2045" />
        <path d="m9.07355 15.2544c.91533-.3235 1.90035-.4995 2.92645-.4995s2.0111.176 2.9265.4995" />
        <path d="m11.9181 19.1465-.0161-.0161" />
        <path d="m2 2 20 20" />
      </g>
    </svg>
  );
};
