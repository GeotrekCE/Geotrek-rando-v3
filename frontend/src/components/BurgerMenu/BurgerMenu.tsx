import { slide as Slide } from 'react-burger-menu';
import { BurgerMenu as BmIcon } from '../Icons/BurgerMenu';
import { Cross } from '../Icons/Cross';

export const BurgerMenu = () => {
  return (
    <Slide
      right
      customBurgerIcon={<BmIcon color="white" />}
      customCrossIcon={<Cross size={14} className="mt-3" />}
      burgerButtonClassName="fixed w-6 h-6 top-2.5 right-2.5"
      burgerBarClassName="bg-white"
      menuClassName="bg-white"
      crossButtonClassName="left-5"
      crossClassName="bg-greyDarkColored"
    />
  );
};

export default BurgerMenu;
