import React from 'react';

export interface Props {
  title: string;
  onClick?: () => void;
}

export const MobileFilterMenuSection: React.FC<Props> = ({ title, onClick }) => {
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';

  return (
    <span onClick={onClick} className={`${classNameTitle} ${classNameBorder}`}>
      {title}
    </span>
  );
};
