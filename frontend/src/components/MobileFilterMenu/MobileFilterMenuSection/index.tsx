import React from 'react';

export interface Props {
  title: string;
  onClick?: () => void;
  selectedFiltersLabels: string[];
}

export const MobileFilterMenuSection: React.FC<Props> = ({
  title,
  onClick,
  selectedFiltersLabels,
}) => {
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';

  return (
    <div>
      <span onClick={onClick} className={`${classNameTitle} ${classNameBorder}`}>
        {title}
      </span>
      <span>{selectedFiltersLabels?.[0]}</span>
    </div>
  );
};
