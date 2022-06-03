import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  resetNextUuid,
} from 'react-accessible-accordion';
import { MenuItem } from 'modules/header/interface';
import NextLink from 'next/link';
import { Link } from 'components/Link';
import { isInternalFlatPageUrl } from 'services/routeUtils';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { Plus } from '../../Icons/Plus';
import { Minus } from '../../Icons/Minus';
import { useBurgerMenuSection } from './useBurgerMenuSection';

export interface Props {
  title: string;
  items?: Array<string | MenuItem>;
  languages?: string[];
}

const isItemString = (item: MenuItem | string): item is string => typeof item === 'string';

export const BurgerMenuSection: React.FC<Props> = ({ title, items, languages }) => {
  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none cursor-pointer';
  const classNameBorder = 'border-b pb-2 border-solid border-greySoft';
  const openIcon = <Plus size={24} />;
  const closeIcon = <Minus size={24} />;
  const { openState, setOpenState } = useBurgerMenuSection();
  const updatePanelState = (openPanelIds: string[]) => {
    openPanelIds.length > 0 ? setOpenState('OPENED') : setOpenState('CLOSED');
  };
  resetNextUuid();
  return items || languages ? (
    <Accordion allowZeroExpanded onChange={updatePanelState}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton
            className={`${classNameTitle} ${openState === 'CLOSED' ? classNameBorder : ''}`}
          >
            <span id="verticalMenu_section" className="flex-grow">
              {title}
            </span>
            {openState === 'OPENED' ? closeIcon : openIcon}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={openState === 'OPENED' ? classNameBorder : ''}>
          {items?.map((item, i) => (
            <p key={i} className="text-Mobile-C2 m-3">
              {isItemString(item) ? (
                <span>{item}</span>
              ) : (
                <NextLink href={item.url} passHref locale={currentLanguage} key={item.url}>
                  <a target={isInternalFlatPageUrl(item.url) ? undefined : '_blank'}>
                    {item.title}
                  </a>
                </NextLink>
              )}
            </p>
          ))}
          {languages?.map(language => (
            <Link
              className="block text-Mobile-C2 py-2 text-greyDarkColored"
              key={language}
              href={{
                pathname: router.pathname,
                query: { ...router.query },
              }}
              locale={language}
            >
              {language.toUpperCase()}
            </Link>
          ))}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <a className={`${classNameTitle} ${classNameBorder}`}>{title}</a>
  );
};
