import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { MenuItem } from 'modules/menuItems/interface';
import Link from 'next/link';
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
  handleCloseMenu: () => void;
}

export const BurgerMenuSection: React.FC<Props> = ({
  title,
  items,
  languages,
  handleCloseMenu,
}) => {
  const router = useRouter();
  const classNameTitle = 'flex items-center pt-4 pb-4 font-bold';
  const classNameBorder = 'border-b border-solid border-greySoft';
  const openIcon = <Plus size={24} aria-hidden />;
  const closeIcon = <Minus size={24} aria-hidden />;
  const { openState, setOpenState } = useBurgerMenuSection();
  const updatePanelState = (openPanelIds: string[]) => {
    setOpenState(openPanelIds.length > 0 ? 'OPENED' : 'CLOSED');
  };
  if (!items && !languages) {
    return <a className={cn(classNameTitle, classNameBorder)}>{title}</a>;
  }
  return (
    <Accordion allowZeroExpanded onChange={updatePanelState}>
      <AccordionItem className={cn('accordion__item', classNameBorder)}>
        <AccordionItemHeading>
          <AccordionItemButton className={cn(classNameTitle, 'hover:text-primary3 cursor-pointer')}>
            <span className="verticalMenu_section grow">{title}</span>
            {openState === 'OPENED' ? closeIcon : openIcon}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={cn(openState === 'OPENED' && 'pb-2')}>
          {items
            ?.sort((a, b) => (a.thumbnail ? 1 : -1) - (b.thumbnail ? 1 : -1))
            .map((item, index) => (
              <MobileMenuItem key={index} handleCloseMenu={handleCloseMenu} {...item} />
            ))}
          {languages?.map(language => (
            <Link
              className="block text-Mobile-C2 py-2 text-greyDarkColored hover:text-primary3 focus:text-primary3 transition"
              key={language}
              href={{
                pathname: router.pathname,
                query: router.query,
              }}
              locale={language}
              onClick={handleCloseMenu}
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
  handleCloseMenu,
}: MenuItem & { handleCloseMenu: () => void }) => {
  const intl = useIntl();
  const hasThumbnail = thumbnail !== null;
  const href = url || undefined;
  const Item = href ? Link : 'span';
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
          'flex hover:text-primary3 focus:text-primary3 transition',
          hasThumbnail &&
            "relative rounded-xl overflow-hidden group after:absolute after:content-[''] after:right-0 after:bottom-0 after:left-0 after:h-1/2 after:bg-gradient-to-t after:from-blackSemiTransparent after:via-blackSemiTransparent",
        )}
        onClick={handleCloseMenu}
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
        .map((child, childIndex) => (
          <MobileMenuItem key={childIndex} handleCloseMenu={handleCloseMenu} {...child} />
        ))}
    </div>
  );
};
