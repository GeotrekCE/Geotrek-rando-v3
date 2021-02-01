import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { Plus } from '../../Icons/Plus';
import { Minus } from '../../Icons/Minus';
import { useBurgerMenuSection } from './useBurgerMenuSection';

export interface Props {
  title: string;
  subSections?: string[];
  onClick?: () => void;
}

export const BurgerMenuSection: React.FC<Props> = ({ title, subSections, onClick }) => {
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';
  const openIcon = <Plus size={24} />;
  const closeIcon = <Minus size={24} />;
  const { openState, setOpenState } = useBurgerMenuSection();
  const updatePanelState = (openPanelIds: string[]) => {
    openPanelIds.length > 0 ? setOpenState('OPENED') : setOpenState('CLOSED');
  };
  return subSections && subSections.length > 0 ? (
    <Accordion allowZeroExpanded onChange={updatePanelState}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton
            className={`${classNameTitle} ${openState === 'CLOSED' ? classNameBorder : ''}`}
          >
            <span className="flex-grow">{title}</span>
            {openState === 'OPENED' ? closeIcon : openIcon}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={openState === 'OPENED' ? classNameBorder : ''}>
          {subSections.map(s => (
            <p className="text-Mobile-C3 py-2" key={s}>
              {s}
            </p>
          ))}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <span onClick={onClick} className={`${classNameTitle} ${classNameBorder}`}>
      {title}
    </span>
  );
};
