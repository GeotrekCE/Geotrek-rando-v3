import React from 'react';
import { GenericIconProps } from './types';

const ORIGINAL_WIDTH = 38;
const ORIGINAL_HEIGHT = 46;

export const MapMarker: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size ?? ORIGINAL_WIDTH}
      height={size !== undefined ? size * (ORIGINAL_HEIGHT / ORIGINAL_WIDTH) : ORIGINAL_HEIGHT}
      viewBox="0 0 38 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 19C37 33 19 45 19 45C19 45 1 33 1 19C1 9.05887 9.05887 1 19 1C28.9411 1 37 9.05887 37 19V19Z"
        fill={color}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
