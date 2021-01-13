import React from 'react';
import { GenericIconProps } from '../types';

export const Twitter: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        d="M16 1.872a6.839 6.839 0 01-1.89.518A3.262 3.262 0 0015.553.577a6.555 6.555 0 01-2.08.794 3.28 3.28 0 00-5.674 2.243c0 .26.022.51.076.748A9.284 9.284 0 011.114.931a3.285 3.285 0 001.008 4.384A3.24 3.24 0 01.64 4.911v.036A3.295 3.295 0 003.268 8.17a3.274 3.274 0 01-.86.108 2.9 2.9 0 01-.621-.056 3.311 3.311 0 003.065 2.285 6.59 6.59 0 01-4.067 1.399c-.269 0-.527-.012-.785-.045a9.234 9.234 0 005.032 1.472c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0016 1.872z"
        fill={color}
      />
    </svg>
  );
};
