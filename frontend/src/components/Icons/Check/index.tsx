import React from 'react';
import { GenericIconProps } from '../types';

export const Check: React.FC<GenericIconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 4.5L6.75 11.8333L3 8.5"
        stroke="#AA397D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M15 4.5L6.75 11.8333L3 8.5"
    stroke="#AA397D"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>;
