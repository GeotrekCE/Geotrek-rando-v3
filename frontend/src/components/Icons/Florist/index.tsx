import React from 'react';
import { GenericIconProps } from '../types';

export const Florist: React.FC<GenericIconProps> = ({
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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      opacity={opacity}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.313 13.462c9.686 5.62-.067 12.226-1.795 4.157l-.576-.012c-1.729 8.085-11.46 1.472-1.768-4.146-10.677 6.191-10.665-8.605.009-2.408C-.491 4.857 12.263-2.538 12.26 9.85c.002-12.387 12.754-4.986 2.075 1.204 10.679-6.19 10.653 8.605-.022 2.409zm-2.054-2.494c-.709 0-1.284.577-1.284 1.29 0 .712.576 1.29 1.284 1.29.709 0 1.283-.578 1.283-1.29 0-.713-.574-1.29-1.283-1.29z"
        fill={color}
      />
    </svg>
  );
};
