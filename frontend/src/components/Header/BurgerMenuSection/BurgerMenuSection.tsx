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
import { cn } from 'services/utils/cn';
import Image from 'next/image';
import { ExternalLink } from 'components/Icons/ExternalLink';
import RemoteIcon from 'components/RemoteIcon';
import { useIntl } from 'react-intl';
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
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold';
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
          <AccordionItemButton className={cn(classNameTitle, 'cursor-pointer')}>
            <span className="verticalMenu_section grow">{title}</span>
            {openState === 'OPENED' ? closeIcon : openIcon}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={cn(openState === 'OPENED' && 'pb-2')}>
          {items
            ?.sort((a, b) => (a.thumbnail ? 1 : -1) - (b.thumbnail ? 1 : -1))
            .map((item, index) => <MobileMenuItem key={index} {...item} />)}
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

const MobileMenuItem = ({
  url,
  title,
  openInAnotherTab,
  thumbnail,
  children,
  pictogram,
}: MenuItem) => {
  const intl = useIntl();
  const hasThumbnail = thumbnail !== null;
  const href = url || undefined;
  const Item = href ? NextLink : 'span';
  return (
    <div className="text-Mobile-C2 m-3">
      <Item
        href={href as string}
        {...(href &&
          openInAnotherTab && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
        className={cn(
          'flex',
          hasThumbnail &&
            "relative rounded-xl overflow-hidden group after:absolute after:inset-0 after:content-[''] after:bg-black/25",
        )}
      >
        {hasThumbnail && (
          <Image
            className="aspect-video object-cover object-center transition-transform group-hover:scale-105"
            loading="lazy"
            width={300}
            height={170}
            src={thumbnail}
            alt=""
          />
        )}
        <span
          className={cn(
            'inline-flex gap-2 font-bold',
            hasThumbnail && 'text-white absolute z-10 bottom-2 right-2 left-2',
          )}
        >
          <RemoteIcon iconUri={pictogram} className="size-5" size={20} />
          {title}
          {href && openInAnotherTab && (
            <ExternalLink
              className="shrink-0"
              size={16}
              role="img"
              aria-label={intl.formatMessage({ id: 'actions.openInANewWindow' })}
            />
          )}
        </span>
      </Item>
      {children
        ?.sort((a, b) => (a.thumbnail ? 1 : -1) - (b.thumbnail ? 1 : -1))
        .map((child, childIndex) => <MobileMenuItem key={childIndex} {...child} />)}
    </div>
  );
};
