import React from 'react';
import { GenericIconProps } from '../types';

export const Museum: React.FC<GenericIconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.001 2.4l10.08 4.23v.57H1.92v-.57L12 2.4zm-7.55 6.72H6.33l.289 8.64H4.2l.25-8.64zm-1.57 9.12h18.24v.96h1.44v1.44h.96v.96H.48v-.96h.96V19.2h1.44v-.96zm.96-10.56h16.32v.96H3.84v-.96zm15.671 1.44h-1.878l-.252 8.64h2.422l-.291-8.64zm-6.271 0h1.879l.288 8.64h-2.42l.253-8.64zm-2.515 0h-1.88l-.253 8.64h2.42l-.287-8.64z"
        fill={color}
      />
    </svg>
  );
};
