import React from 'react';
import { GenericIconProps } from '../types';

export const VigilanceAreaIcon: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  size = 24,
  className = '',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      <circle cx="18" cy="18" r="18" fill="white" />
      <circle cx="18" cy="18" r="17" fill={color === 'currentColor' ? '#000000' : color} />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill={color === 'currentColor' ? '#000000' : color}
        stroke="white"
        strokeWidth="1.5"
      />
      <path d="M18 10v10" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="18" cy="25" r="1.75" fill="white" />
    </svg>
  );
};
