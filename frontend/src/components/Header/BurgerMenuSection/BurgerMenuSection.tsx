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
  items?: ({ translationId: string; url: string } | string)[];
}

const isItemString = (item: { translationId: string; url: string } | string): item is string =>
  typeof item === 'string';

export const BurgerMenuSection: React.FC<Props> = ({ title, items }) => {
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';
  const openIcon = <Plus size={24} />;
  const closeIcon = <Minus size={24} />;
  const { openState, setOpenState, intl } = useBurgerMenuSection();
  const updatePanelState = (openPanelIds: string[]) => {
    openPanelIds.length > 0 ? setOpenState('OPENED') : setOpenState('CLOSED');
  };
  return items ? (
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
          {items.map(item =>
            isItemString(item) ? (
              <p className="text-Mobile-C3 py-2" key={item}>
                {item.toUpperCase()}
              </p>
            ) : (
              <p className="text-Mobile-C3 py-2" key={item.translationId}>
                <a href={item.url}>{intl.formatMessage({ id: item.translationId })}</a>
              </p>
            ),
          )}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <span className={`${classNameTitle} ${classNameBorder}`}>{title}</span>
  );
};
