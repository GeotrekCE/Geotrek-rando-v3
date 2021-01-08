import BurgerMenuSection from 'components/BurgerMenuSection/BurgerMenuSection';
import { slide as Slide } from 'react-burger-menu';
import { BurgerMenu as BmIcon } from '../Icons/BurgerMenu';
import { Cross } from '../Icons/Cross';

interface Props {
  title: string;
  sections: string[];
  subSections?: { [key: string]: string[] };
  displayState?: 'DISPLAYED' | 'HIDDEN';
}

export const BurgerMenu: React.FC<Props> = ({
  title,
  sections,
  subSections = {},
  displayState = 'DISPLAYED',
}) => {
  const burgerButtonClassName = `fixed w-6 h-6  right-2.5 desktop:hidden transition-all delay-100 duration-300 ${
    displayState === 'HIDDEN' ? '-top-21.5' : 'top-2.5'
  }`;

  return (
    <Slide
      right
      customBurgerIcon={<BmIcon className="text-white" />}
      customCrossIcon={<Cross size={14} className="mt-3" />}
      burgerButtonClassName={burgerButtonClassName}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
      crossButtonClassName="left-5"
      crossClassName="bg-greyDarkColored"
    >
      <span className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none">
        {title}
      </span>
      {sections.map(section => (
        <BurgerMenuSection title={section} subSections={subSections[section]} key={section} />
      ))}
    </Slide>
  );
};

export default BurgerMenu;
