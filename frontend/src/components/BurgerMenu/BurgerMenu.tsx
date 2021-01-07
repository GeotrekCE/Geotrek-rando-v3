import { slide as Slide } from 'react-burger-menu';

export const BurgerMenu = () => {
  return (
    <Slide
      right
      burgerButtonClassName="fixed w-5 h-3 top-4 right-3"
      burgerBarClassName="bg-white"
      menuClassName="bg-white"
      crossButtonClassName="left-3"
      crossClassName="bg-greyDarkColored"
    />
  );
};

export default BurgerMenu;
