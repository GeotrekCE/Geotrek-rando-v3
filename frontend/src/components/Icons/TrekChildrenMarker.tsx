import React from 'react';
import { GenericIconProps } from './types';

const ORIGINAL_WIDTH = 36;
const ORIGINAL_HEIGHT = 44;

export const TrekChildrenMarker: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size ?? ORIGINAL_WIDTH}
      height={size !== undefined ? size * (ORIGINAL_HEIGHT / ORIGINAL_WIDTH) : ORIGINAL_HEIGHT}
      viewBox="0 0 36 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        d="M34.5 18C34.5 24.3971 30.3514 30.5314 25.9111 35.2184C23.7216 37.5295 21.527 39.4198 19.8781 40.7328C19.1135 41.3417 18.4689 41.8243 18 42.1651C17.5311 41.8243 16.8865 41.3417 16.1219 40.7328C14.473 39.4198 12.2784 37.5295 10.0889 35.2184C5.64861 30.5314 1.5 24.3971 1.5 18C1.5 8.8873 8.8873 1.5 18 1.5C27.1127 1.5 34.5 8.8873 34.5 18Z"
        fill="white"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
