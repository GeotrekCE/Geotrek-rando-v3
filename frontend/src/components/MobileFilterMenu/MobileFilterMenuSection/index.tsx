import { ChevronDown } from 'components/Icons/ChevronDown';
import React from 'react';

export interface Props {
  title: string | React.ReactElement;
  onClick?: () => void;
  numberSelected: number;
  color: string;
}

export const MobileFilterMenuSection: React.FC<Props> = ({
  title,
  onClick,
  numberSelected,
  color,
}) => {
  const classNameSectionName = `font-bold text-Mobile-C1 w-full ${
    numberSelected > 0 ? 'text-primary1' : 'text-greyDarkColored'
  }`;

  return (
    <div
      onClick={onClick}
      className="pt-4 pb-4 outline-none border-b border-solid border-greySoft flex items-center"
    >
      {numberSelected > 0 && (
        <div
          className="bg-primary1 text-white rounded-full h-6 w-6 flex items-center justify-center font-bold mr-2"
          style={{ backgroundColor: color }}
        >
          {numberSelected}
        </div>
      )}
      <div className={classNameSectionName} style={{ color }}>
        {title}
      </div>
      <ChevronDown className={`-rotate-90 text-primary1`} size={24} color={color} />
    </div>
  );
};
