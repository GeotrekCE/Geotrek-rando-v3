import { ReactNode, useMemo } from 'react';
import { DropdownMenu } from 'components/DropdownMenu';
import { ChevronDown } from 'components/Icons/ChevronDown';
import RemoteIcon from 'components/RemoteIcon';
import { MenuItem } from 'modules/menuItems/interface';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from 'services/utils/cn';

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
    if (menuItems.some(({ children }) => children)) {
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
    if (menuItems.some(({ children }) => children && children.length > 5)) {
      return {
        contentClassName:
          'custo-menu-sub-menu flex items-center justify-between px-4 desktop:px-10percent bg-white text-greyDarkColored absolute left-0 right-0 top-desktopHeader py-4 shadow-md',
        itemClassName:
          'custo-menu-item custo-menu-item--lvl2 hover:text-primary1 focus:text-primary-1',
        expandedClassName: 'custo-menu-item-expanded border-white',
        groupClassName: 'custo-menu-group empty:hidden flex gap-6',
      };
    }
    return {
      contentClassName:
        'flex-col bg-white text-greyDarkColored rounded-2xl min-w-max border border-solid border-greySoft border-t-0 absolute py-2 top-18',
      itemClassName: 'hover:bg-greySoft-light focus:bg-greySoft px-5 py-2',
      expandedClassName: 'custo-menu-item-expanded',
      groupClassName: 'custo-menu-group empty:hidden flex flex-col gap-2',
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
                  <ChevronDown size={16} className="shrink-0 ml-1" aria-hidden />
                </>
              }
              className={`custo-menu-item custo-menu-item--lvl1 custo-menu-item--is-dropdown custo-menu-item--index-${index} flex gap-2 pt-3 pb-2 mr-4 flex items-center border-b-4 border-solid border-transparent text-white duration-500 transition-color`}
              expandedClassName={expandedClassName}
              wrapperClassName="flex-row"
              contentClassName={contentClassName}
              {...(menuItem.url && {
                href: menuItem.url,
              })}
              {...(menuItem.openInAnotherTab && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              <div className={cn('custo-menu-group--without-imgs  flex-wrap', groupClassName)}>
                {menuItem.children
                  .filter(item => item.thumbnail === null)
                  .map(item => {
                    return (
                      <MenuItem
                        key={item.id}
                        item={item}
                        className={itemClassName}
                        setActiveID={setActiveID}
                      />
                    );
                  })}
              </div>
              <div className={cn('custo-menu-group--with-imgs', groupClassName)}>
                {menuItem.children
                  .filter(item => item.thumbnail !== null)
                  .map(item => {
                    return (
                      <MenuItem
                        key={item.id}
                        item={item}
                        className={
                          "custo-menu-item custo-menu-item--lvl2 relative rounded-xl overflow-hidden group after:absolute after:inset-0 after:content-[''] after:bg-black/25"
                        }
                        setActiveID={setActiveID}
                      >
                        <Image
                          className="custo-menu-item--media aspect-video object-cover object-center transition-transform group-hover:scale-105"
                          loading="lazy"
                          width={300}
                          height={170}
                          src={item.thumbnail as string}
                          alt=""
                        />
                      </MenuItem>
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
                onClick={() => setActiveID(null)}
              >
                <RemoteIcon iconUri={menuItem.pictogram} />
                {menuItem.title}
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

const MenuItem = ({
  item,
  className,
  children,
  setActiveID,
}: {
  item: MenuItem;
  className?: string;
  children?: ReactNode;
  setActiveID: (string: string | null) => void;
}) => {
  if (item.url === null) {
    return (
      <span key={item.id} className={className}>
        {children}
        <span className="inline-flex gap-2 font-bold">
          <RemoteIcon iconUri={item.pictogram} />
          {item.title}
        </span>
      </span>
    );
  }
  return (
    <Link
      href={item.url}
      className={className}
      key={item.id}
      {...(item.openInAnotherTab && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      onClick={() => !item.openInAnotherTab && setActiveID(null)}
    >
      {children}
      <span
        className={cn(
          'inline-flex gap-2 font-bold',
          children && 'text-white absolute z-10 bottom-2 right-2 left-2',
        )}
      >
        <RemoteIcon iconUri={item.pictogram} />
        {item.title}
      </span>
    </Link>
  );
};
