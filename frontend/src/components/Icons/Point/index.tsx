import React from 'react';
import { GenericIconProps } from '../types';

export const Point: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <circle cx={11} cy={11} r={7} stroke={color} strokeWidth={8} />
    </svg>
  );
};
