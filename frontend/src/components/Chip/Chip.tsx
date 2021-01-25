import React from 'react';
interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`rounded-chip py-1 px-2
      bg-primary2 text-primary3
      text-Mobile-C2 desktop:text-P1
      ${className ?? ''}`}
    >
      <span>{children}</span>
    </div>
  );
};
