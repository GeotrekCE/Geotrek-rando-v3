import React from 'react';
import { GenericIconProps } from '../types';

export const MapPin: React.FC<GenericIconProps> = ({
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
        d="M12.008 1.152c-3.744 0-6.779 2.978-6.779 6.65 0 3.673 6.779 15.718 6.779 15.718s6.778-12.045 6.778-15.718c0-3.672-3.036-6.65-6.778-6.65z"
        fill={color}
      />
    </svg>
  );
};
