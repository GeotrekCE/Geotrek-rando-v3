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
  const hasSelectedValues = selectedFiltersLabels.length > 0;

  const classNameContainer = 'pt-4 pb-4 outline-none border-b border-solid border-greySoft';
  const classNameSectionName = `font-bold text-Mobile-C1 ${
    hasSelectedValues ? 'text-primary1' : 'text-greyDarkColored'
  }`;
  const classNameSelectedFiltersLabels = `text-Mobile-C3 overflow-ellipsis whitespace-nowrap overflow-hidden ${
    hasSelectedValues ? 'mt-2' : ''
  }`;

  return (
    <div onClick={onClick} className={`${classNameContainer}`}>
      <div className={classNameSectionName}>{title}</div>
      <div className={classNameSelectedFiltersLabels}>{selectedFiltersLabels.join(', ')}</div>
    </div>
  );
};
