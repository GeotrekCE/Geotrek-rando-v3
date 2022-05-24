import React from 'react';
import { GenericIconProps } from '../types';

export const Signage: React.FC<GenericIconProps> = ({
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
        d="M4.6,12.4L2,15.2l2.6,2.9h6.3v6.2H8.7V25h8.6v-0.7h-2.2v-6.2H23l0-5.7H15V9.7H23l0-5.7H15V0h-4.1v3.9H4.6L2,6.8l2.6,2.9
      l6.3,0v2.7L4.6,12.4z M14.3,24.3h-2.7v-6.2h2.7V24.3z M11.6,0.7h2.7v3.2h-2.7V0.7z M4.9,8.9L3,6.8l1.9-2.1h17.3v4.3H4.9z M14.3,9.7
      v2.7h-2.7V9.7H14.3z M22.2,13.1v4.3H4.9L3,15.2l1.9-2.1L22.2,13.1z"
        stroke={color}
      />
    </svg>
  );
};
