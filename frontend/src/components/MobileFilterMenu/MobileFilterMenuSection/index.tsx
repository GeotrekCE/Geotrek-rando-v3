import { ChevronDown } from 'components/Icons/ChevronDown';
import React from 'react';

export interface Props {
  title: string | React.ReactElement;
  onClick?: () => void;
  numberSelected: number;
}

export const MobileFilterMenuSection: React.FC<Props> = ({ title, onClick, numberSelected }) => {
  const classNameSectionName = `font-bold text-Mobile-C1 w-full ${
    numberSelected > 0 ? 'text-primary1' : 'text-greyDarkColored'
  }`;

  return (
    <div
      onClick={onClick}
      className="pt-4 pb-4 outline-none border-b border-solid border-greySoft flex items-center"
    >
      {numberSelected > 0 && (
        <div className="bg-primary1 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold mr-2">
          {numberSelected}
        </div>
      )}
      <div className={classNameSectionName}>{title}</div>
      <ChevronDown className={`transform -rotate-90 text-primary1`} size={24} />
    </div>
  );
};
