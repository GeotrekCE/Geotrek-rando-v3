import React from 'react';
import { GenericIconProps } from '../types';

export const Altitude: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      opacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
    >
      <path
        fill={color}
        d="M97,77.9l-12.7-20v6.2c0,4.3-3.5,7.7-7.7,7.7s-7.7-3.5-7.7-7.7V50.3c-1.5,0.7-3.2,0.7-4.6,0l-6.1-3     c-0.9-0.5-2-0.4-2.9,0.1l-4.4,2.5c-1.8,1-4,0.9-5.7-0.3l-1.9-1.4c-1-0.7-2.3-0.8-3.4-0.2l-4.2,2.4C35,50.8,34.1,51,33.2,51     c-1,0-2-0.3-2.8-0.8l-3-1.9l9.4-15.8l5.8,7.2c0.6,0.7,1.4,1.1,2.3,1.1c0.9,0,1.8-0.5,2.3-1.2L57,25.7l5.9,9.2l4.2-4.2L59.6,19     c-0.5-0.8-1.4-1.3-2.4-1.3c-1.1,0-1.9,0.4-2.4,1.2L44.7,33.1l-6-7.5c-0.6-0.7-1.5-1.1-2.5-1.1c-0.9,0.1-1.8,0.6-2.3,1.4L2.9,78     c-0.5,0.9-0.5,2,0,2.9c0.5,0.9,1.5,1.5,2.5,1.5h89.2c1.1,0,2-0.6,2.5-1.5C97.7,80,97.6,78.8,97,77.9z"
      />
      <path
        fill={color}
        d="M64.9,43.9c1.1,1.1,3,1.1,4.1,0l4.8-4.8v24.9c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9V39.1l4.8,4.8c0.6,0.6,1.3,0.8,2,0.8     c0.7,0,1.5-0.3,2-0.8c1.1-1.1,1.1-3,0-4.1l-9.7-9.7c-0.5-0.5-1.3-0.8-2-0.8s-1.5,0.3-2,0.8l-9.7,9.7     C63.8,40.9,63.8,42.8,64.9,43.9z"
      />
    </svg>
  );
};
