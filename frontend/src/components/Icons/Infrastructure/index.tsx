import React from 'react';
import { GenericIconProps } from '../types';

export const Infrastructure: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  opacity,
  className,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        fill={color}
        d="M24.8,9.7V8.6c0-0.5-0.2-0.9-0.5-1.2C24,7,23.6,6.8,23.1,6.8h-1.7c0-0.2,0.1-0.3,0.1-0.5V5.3c0-0.5-0.2-0.9-0.5-1.2
        c-0.3-0.3-0.8-0.5-1.2-0.5h-6.1c-0.4,0-0.8,0.2-1.1,0.4c-0.3-0.3-0.7-0.4-1.1-0.4H5.3C4.8,3.5,4.3,3.7,4,4C3.7,4.3,3.5,4.8,3.5,5.3
        v1.1c0,0.2,0,0.3,0.1,0.5H1.9C1.4,6.8,1,7,0.7,7.4C0.3,7.7,0.2,8.1,0.2,8.6v1.1c0,0.5,0.2,0.9,0.5,1.2c0.3,0.3,0.8,0.5,1.2,0.5h1.7
        c0,0.2-0.1,0.3-0.1,0.5V13c0,0.2,0,0.3,0.1,0.5H1.9c-0.5,0-0.9,0.2-1.2,0.5c-0.3,0.3-0.5,0.8-0.5,1.2v1.1c0,0.5,0.2,0.9,0.5,1.2
        C1,18,1.4,18.2,1.9,18.2h1.7c0,0.2-0.1,0.3-0.1,0.5v1.1c0,0.5,0.2,0.9,0.5,1.2c0.3,0.3,0.8,0.5,1.2,0.5h6.1c0.4,0,0.8-0.2,1.1-0.4
        c0.3,0.3,0.7,0.4,1.1,0.4h6.1c0.5,0,0.9-0.2,1.2-0.5c0.3-0.3,0.5-0.8,0.5-1.2v-1.1c0-0.2,0-0.3-0.1-0.5h1.7c0.5,0,0.9-0.2,1.2-0.5
        c0.3-0.3,0.5-0.8,0.5-1.2v-1.1c0-0.5-0.2-0.9-0.5-1.2c-0.3-0.3-0.8-0.5-1.2-0.5h-1.7c0.1-0.2,0.1-0.3,0.1-0.5V12
        c0-0.2,0-0.3-0.1-0.5h1.7c0.5,0,0.9-0.2,1.2-0.5C24.7,10.6,24.8,10.2,24.8,9.7z M13.1,5.3c0-0.3,0.2-0.5,0.5-0.5h6.1
        c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.3-0.2,0.5-0.5,0.5h-1.9h-2.3h-1.9c-0.3,0-0.5-0.2-0.5-0.5V5.3z M16.1,15.3v1.1
        c0,0.3-0.2,0.5-0.5,0.5H9.5c-0.3,0-0.5-0.2-0.5-0.5v-1.1c0-0.3,0.2-0.5,0.5-0.5h1.9h0h2.3h1.9C15.8,14.8,16.1,15,16.1,15.3z
        M11.4,8.1h2.3h1.9c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.3-0.2,0.5-0.5,0.5H9.5C9.2,10.2,9,10,9,9.7V8.6c0-0.3,0.2-0.5,0.5-0.5H11.4
        L11.4,8.1z M4.8,6.3V5.3C4.8,5,5,4.8,5.3,4.8h6.1c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.3-0.2,0.5-0.5,0.5H9.4H7.2H5.3
        C5,6.8,4.8,6.6,4.8,6.3z M1.4,9.7V8.6c0-0.3,0.2-0.5,0.5-0.5h3.3h1.9c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.3-0.2,0.5-0.5,0.5H1.9
        C1.6,10.2,1.4,10,1.4,9.7z M7.2,11.5h2.3h1.9c0.3,0,0.5,0.2,0.5,0.5V13c0,0.3-0.2,0.5-0.5,0.5H5.3c-0.3,0-0.5-0.2-0.5-0.5V12
        c0-0.3,0.2-0.5,0.5-0.5H7.2z M1.4,16.4v-1.1c0-0.3,0.2-0.5,0.5-0.5h3.3h1.9c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.3-0.2,0.5-0.5,0.5H1.9
        C1.6,16.9,1.4,16.7,1.4,16.4z M11.4,20.2H5.3c-0.3,0-0.5-0.2-0.5-0.5v-1.1c0-0.3,0.2-0.5,0.5-0.5h1.9h2.3h1.9c0.3,0,0.5,0.2,0.5,0.5
        v1.1C11.9,20,11.7,20.2,11.4,20.2z M20.3,18.7v1.1c0,0.3-0.2,0.5-0.5,0.5h-6.1c-0.3,0-0.5-0.2-0.5-0.5v-1.1c0-0.3,0.2-0.5,0.5-0.5
        h1.9h0h2.3h1.9C20,18.2,20.3,18.4,20.3,18.7z M23.1,14.8c0.3,0,0.5,0.2,0.5,0.5v1.1c0,0.3-0.2,0.5-0.5,0.5h-5.3
        c-0.3,0-0.5-0.2-0.5-0.5v-1.1c0-0.3,0.2-0.5,0.5-0.5h1.9h0H23.1z M20.3,12V13c0,0.3-0.2,0.5-0.5,0.5h-6.1c-0.3,0-0.5-0.2-0.5-0.5V12
        c0-0.3,0.2-0.5,0.5-0.5h1.9h0h2.3h1.9C20,11.5,20.3,11.7,20.3,12z M23.6,9.7c0,0.3-0.2,0.5-0.5,0.5h-5.3c-0.3,0-0.5-0.2-0.5-0.5V8.6
        c0-0.3,0.2-0.5,0.5-0.5h1.9h0h3.3c0.3,0,0.5,0.2,0.5,0.5V9.7z"
      />
    </svg>
  );
};
