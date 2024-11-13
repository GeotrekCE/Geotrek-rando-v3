import React from 'react';
import { GenericIconProps } from '../types';

export const AlertTriangle: React.FC<GenericIconProps> = ({
  color = 'currentColor',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.247 36.178L21.542 7.85a4.1 4.1 0 013.491-1.928 4.1 4.1 0 013.492 1.928L45.82 36.178c.725 1.233.73 2.751.011 3.988a4.097 4.097 0 01-3.503 2.022H7.739a4.097 4.097 0 01-3.503-2.022 3.941 3.941 0 01.011-3.988zm20.787-23.856c1.767 0 3.2 1.591 3.2 3.555v8.889c0 1.964-1.433 3.556-3.2 3.556-1.768 0-3.2-1.592-3.2-3.556v-8.889c0-1.964 1.432-3.555 3.2-3.555zm3.2 23.466a3.2 3.2 0 11-6.4 0 3.2 3.2 0 016.4 0z"
        fill={color}
      />
    </svg>
  );
};
