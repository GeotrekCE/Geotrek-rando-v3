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
  const classNameTitle = 'pt-4 pb-4 outline-none';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';

  const hasSelectedValues = selectedFiltersLabels.length > 0;

  return (
    <div onClick={onClick} className={`${classNameTitle} ${classNameBorder}`}>
      <div
        className={`font-bold text-Mobile-C1 ${
          hasSelectedValues ? 'text-primary1' : 'text-greyDarkColored'
        }`}
      >
        {title}
      </div>
      <div className="mt-2 text-Mobile-C3">{selectedFiltersLabels?.[0]}</div>
    </div>
  );
};
