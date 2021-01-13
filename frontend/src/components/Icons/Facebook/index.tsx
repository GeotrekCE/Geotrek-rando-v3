import React from 'react';
import { GenericIconProps } from '../types';

export const Facebook: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        d="M15.116 0H.883A.883.883 0 000 .883v14.233c0 .489.396.884.883.884h7.663V9.804H6.46V7.389h2.085V5.608c0-2.066 1.262-3.192 3.105-3.192.884 0 1.642.066 1.863.095v2.16h-1.279c-1.002 0-1.195.477-1.195 1.176v1.541h2.391l-.313 2.415H11.04v6.196h4.077a.884.884 0 00.884-.883V.883A.883.883 0 0015.116 0z"
        fill={color}
      />
    </svg>
  );
};
