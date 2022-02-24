import { GenericIconProps } from 'components/Icons/types';
import React from 'react';

export const Layers: React.FC<GenericIconProps> = ({
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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="#534764"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="#534764"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="#534764"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
