import { ReactNode, useMemo } from 'react';
import { DropdownMenu } from 'components/DropdownMenu';
import { ChevronDown } from 'components/Icons/ChevronDown';
import RemoteIcon from 'components/RemoteIcon';
import { MenuItem } from 'modules/menuItems/interface';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from 'services/utils/cn';
import { ExternalLink } from 'components/Icons/ExternalLink';

export interface MenuProps {
  menuItems: MenuItem[];
  primaryItemsNumber: number;
  activeID: null | string;
  setActiveID: (string: string | null) => void;
}

export const Menu: React.FC<MenuProps> = ({
  menuItems,
  primaryItemsNumber,
  activeID,
  setActiveID,
}) => {
  const intl = useIntl();
  const items = useMemo(() => {
    if (menuItems.some(({ children }) => children?.length)) {
      return menuItems;
    }
    // If there are no children, we use "primaryItemsNumber" to split menu with "See More" button
    return [
      ...menuItems.slice(0, primaryItemsNumber),
      {
        url: null,
        title: intl.formatMessage({
          id: 'header.seeMore',
        }),
        openInAnotherTab: false,
        children: menuItems.slice(primaryItemsNumber),
        pictogram: null,
        thumbnail: null,
      },
    ];
  }, [intl, menuItems, primaryItemsNumber]);

  const { contentClassName, itemClassName, expandedClassName, groupClassName } = useMemo(() => {
    if (
      menuItems.some(
        ({ children = [] }) =>
          children.length > 5 || children.some(({ thumbnail }) => thumbnail !== null),
      )
    ) {
      return {
        contentClassName:
          'custo-menu-sub-menu flex items-center gap-6 justify-between p-4 bg-white text-greyDarkColored absolute shadow-md z-10 rounded-lg -translate-x-1/2 left-1/2 w-max min-w-[calc(100%+2rem)]',
        itemClassName:
          'custo-menu-item custo-menu-item--lvl2 hover:text-primary1 focus:text-primary-1',
        expandedClassName: 'custo-menu-item-expanded border-white',
        groupClassName: 'custo-menu-group empty:hidden flex flex-col gap-6',
      };
    }
    return {
      contentClassName:
        'flex-col bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft border-t-0 absolute py-2 -translate-x-1/2 left-1/2 w-max z-10',
      itemClassName: 'hover:bg-greySoft-light focus:bg-greySoft px-5 py-2',
      expandedClassName: 'custo-menu-item-expanded',
      groupClassName: 'custo-menu-group empty:hidden flex flex-col gap-2 max-w-100',
    };
  }, [menuItems]);

  return (
    <>
      {items.map((menuItem, index) => {
        if (menuItem.children?.length) {
          return (
            <DropdownMenu
              key={index}
              activeID={activeID}
              setActiveID={setActiveID}
              trigger={
                <>
                  <RemoteIcon iconUri={menuItem.pictogram} />
                  {menuItem.title}
                  {menuItem.openInAnotherTab && (
                    <ExternalLink
                      size={16}
                      role="img"
                      aria-label={intl.formatMessage({ id: 'actions.openInANewWindow' })}
                    />
                  )}
                  <ChevronDown size={16} className="shrink-0 ml-1" aria-hidden />
                </>
              }
              className={cn(
                `custo-menu-item custo-menu-item--lvl1 custo-menu-item--is-dropdown custo-menu-item--index-${index}
              relative flex gap-2 pt-3 pb-2 flex items-center border-b-4 border-solid border-transparent text-white duration-500 transition-color`,
                "after:content-[''] after:absolute after:top-10 after:-left-6 after:-right-6 after:h-15 hover:after:z-10",
              )}
              expandedClassName={expandedClassName}
              wrapperClassName="custo-menu-item-wrapper flex-row relative"
              contentClassName={contentClassName}
              {...(menuItem.url && {
                href: menuItem.url,
              })}
              {...(menuItem.openInAnotherTab && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              asHover
            >
              <div className={cn('custo-menu-group--without-imgs flex-wrap', groupClassName)}>
                {menuItem.children
                  .filter(item => item.thumbnail === null)
                  .map(item => {
                    return <DesktopMenuItem key={item.id} item={item} className={itemClassName} />;
                  })}
              </div>
              <div className={cn('custo-menu-group--with-imgs', groupClassName)}>
                {menuItem.children
                  .filter(item => item.thumbnail !== null)
                  .map(item => {
                    return (
                      <DesktopMenuItem
                        key={item.id}
                        item={item}
                        className={
                          "relative rounded-xl overflow-hidden group after:absolute after:inset-0 after:content-[''] after:bg-black/25"
                        }
                      >
                        <Image
                          className="custo-menu-item--media aspect-video object-cover object-center transition-transform group-hover:scale-105"
                          loading="lazy"
                          width={200}
                          height={113}
                          src={item.thumbnail as string}
                          alt=""
                        />
                      </DesktopMenuItem>
                    );
                  })}
              </div>
            </DropdownMenu>
          );
        }
        return (
          <div
            key={index}
            id="header_inlineMenuSection"
            className="pt-3 pb-2 mr-5 text-white duration-500 transition-color border-b-4 hover:border-white border-transparent border-solid"
          >
            {menuItem.url ? (
              <Link
                className={`flex gap-2 custo-menu-item custo-menu-item--lvl1 custo-menu-item--index-${index}`}
                href={menuItem.url}
                {...(menuItem.openInAnotherTab && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <RemoteIcon iconUri={menuItem.pictogram} />
                {menuItem.title}
                {menuItem.openInAnotherTab && (
                  <ExternalLink
                    size={16}
                    role="img"
                    aria-label={intl.formatMessage({ id: 'actions.openInANewWindow' })}
                  />
                )}
              </Link>
            ) : (
              menuItem.title
            )}
          </div>
        );
      })}
    </>
  );
};

const DesktopMenuItem = ({
  item,
  className,
  children,
}: {
  item: MenuItem;
  className?: string;
  children?: ReactNode;
}) => {
  const intl = useIntl();
  const href = item.url || undefined;
  const Item = href ? Link : 'span';

  return (
    <Item
      href={href as string}
      className={className}
      key={item.id}
      {...(href &&
        item.openInAnotherTab && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
    >
      {children}
      <span
        className={cn(
          'inline-flex gap-2 font-bold items-center',
          children && 'text-white absolute z-10 bottom-2 right-2 left-2',
        )}
      >
        <RemoteIcon iconUri={item.pictogram} />
        {item.title}
        {href && item.openInAnotherTab && (
          <ExternalLink
            className="shrink-0"
            size={16}
            role="img"
            aria-label={intl.formatMessage({ id: 'actions.openInANewWindow' })}
          />
        )}
      </span>
    </Item>
  );
};
