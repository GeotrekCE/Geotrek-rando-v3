import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { MenuItem } from 'modules/menuItems/interface';
import NextLink from 'next/link';
import { Link } from 'components/Link';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { cn } from 'services/utils/cn';
import { Plus } from '../../Icons/Plus';
import { Minus } from '../../Icons/Minus';
import { useBurgerMenuSection } from './useBurgerMenuSection';

export interface Props {
  title: string;
  items?: Array<MenuItem>;
  languages?: string[];
}

export const BurgerMenuSection: React.FC<Props> = ({ title, items, languages }) => {
  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold outline-none cursor-pointer';
  const classNameBorder = 'border-b border-solid border-greySoft';
  const openIcon = <Plus size={24} aria-hidden />;
  const closeIcon = <Minus size={24} aria-hidden />;
  const { openState, setOpenState } = useBurgerMenuSection();
  const updatePanelState = (openPanelIds: string[]) => {
    openPanelIds.length > 0 ? setOpenState('OPENED') : setOpenState('CLOSED');
  };
  if (!items && !languages) {
    return <a className={cn(classNameTitle, classNameBorder)}>{title}</a>;
  }
  return (
    <Accordion allowZeroExpanded onChange={updatePanelState}>
      <AccordionItem className={cn('accordion__item', classNameBorder)}>
        <AccordionItemHeading>
          <AccordionItemButton className={cn(classNameTitle)}>
            <span className="verticalMenu_section grow">{title}</span>
            {openState === 'OPENED' ? closeIcon : openIcon}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={cn(openState === 'OPENED' && 'pb-2')}>
          {items?.map((item, i) => (
            <p key={i} className="text-Mobile-C2 m-3">
              {item.url === null ? (
                <span>{item.title}</span>
              ) : (
                <NextLink
                  href={item.url}
                  passHref
                  locale={currentLanguage}
                  key={item.url}
                  {...(item.openInAnotherTab && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  {item.title}
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
                query: router.query,
              }}
              locale={language}
            >
              {language.toUpperCase()}
            </Link>
          ))}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};
