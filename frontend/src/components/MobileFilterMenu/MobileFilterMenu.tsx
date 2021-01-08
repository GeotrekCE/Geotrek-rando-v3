import React from 'react';

import { slide as Slide } from 'react-burger-menu';
import { Cross } from '../Icons/Cross';

interface Props {
  menuState: 'DISPLAYED' | 'HIDDEN';
}

export const MobileFilterMenu: React.FC<Props> = ({ menuState }) => {
  return (
    <Slide
      isOpen={menuState === 'DISPLAYED'}
      right
      customBurgerIcon={false}
      customCrossIcon={<Cross size={14} className="mt-3" />}
      burgerButtonClassName="fixed w-6 h-6 top-2.5 right-2.5"
      burgerBarClassName="bg-white"
      menuClassName="bg-white"
      crossButtonClassName="left-5"
      crossClassName="bg-greyDarkColored"
    />
  );
};
