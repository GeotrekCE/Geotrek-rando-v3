import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import { MenuConfig } from 'modules/header/interface';
import { MenuItem } from 'modules/menuItems/interface';
import { routes } from 'services/routes';
import { cn } from 'services/utils/cn';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'components/Sheet';
import { BurgerMenuSection } from 'components/Header/BurgerMenuSection/BurgerMenuSection';
import { BurgerMenu as BurgerMenuIcon } from 'components/Icons/BurgerMenu';

interface Props {
  config: MenuConfig;
  menuItems?: MenuItem[];
  className?: string;
  displayState?: 'DISPLAYED' | 'HIDDEN';
}

export const BurgerMenu: React.FC<Props> = ({
  className,
  config,
  menuItems,
  displayState = 'DISPLAYED',
}) => {
  const burgerButtonClassName = cn(
    'fixed size-6 right-2.5 desktop:right-8 transition-all delay-100 duration-300 text-white z-sliderMenu',
    displayState === 'HIDDEN' ? '-top-21.5' : 'top-2.5 desktop:top-8',
    className,
  );

  const [isMenuOpen, handleMenu] = useState(false);

  const handleCloseMenu = () => {
    handleMenu(false);
  };

  const intl = useIntl();
  const menuItemLinkClassNames =
    'flex items-center pt-4 pb-4 font-bold outline-none border-b border-solid border-greySoft hover:text-primary3 focus:text-primary3';

  const menuSection = useMemo(() => {
    if (!menuItems) {
      return [];
    }
    if (menuItems.some(({ children }) => children)) {
      return menuItems;
    }
    // If there are no children, we wrap them in "See More" button
    return [
      {
        url: null,
        title: intl.formatMessage({
          id: 'header.seeMore',
        }),
        openInAnotherTab: false,
        children: menuItems,
        pictogram: null,
        thumbnail: null,
      },
    ];
  }, [intl, menuItems]);

  return (
    <Sheet open={isMenuOpen} onOpenChange={handleMenu}>
      <SheetTrigger className={burgerButtonClassName}>
        <BurgerMenuIcon aria-hidden />
        <span className="sr-only">{intl.formatMessage({ id: 'header.menu' })}</span>
      </SheetTrigger>
      <SheetContent className="z-sliderMenu">
        <SheetHeader>
          <SheetTitle
            id="verticalMenu_title"
            className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none"
          >
            {intl.formatMessage({ id: 'header.menu' })}
          </SheetTitle>
        </SheetHeader>
        <div className="h-full overflow-auto p-6 -mt-6 -mx-6">
          {menuSection.map((item, index) => {
            if (!item.children?.length) {
              if (item.url) {
                return (
                  <NextLink
                    key={index}
                    className={menuItemLinkClassNames}
                    href={item.url}
                    onClick={handleCloseMenu}
                  >
                    {item.title}
                  </NextLink>
                );
              }
              return null;
            }
            return (
              <BurgerMenuSection
                key={index}
                title={item.title}
                items={item.children}
                handleCloseMenu={handleCloseMenu}
              />
            );
          })}
          {config.shouldDisplayFavorite && (
            <BurgerMenuSection
              title={intl.formatMessage({ id: 'header.favorites' })}
              handleCloseMenu={handleCloseMenu}
            />
          )}
          {config.supportedLanguages.length > 1 && (
            <BurgerMenuSection
              title={intl.formatMessage({ id: 'header.language' })}
              languages={config.supportedLanguages}
              handleCloseMenu={handleCloseMenu}
            />
          )}
          <NextLink
            className={menuItemLinkClassNames}
            href={routes.SEARCH}
            onClick={handleCloseMenu}
          >
            {intl.formatMessage({ id: 'header.goToSearch' })}
          </NextLink>
          <NextLink
            className={menuItemLinkClassNames}
            href={routes.OFFLINE}
            prefetch={false}
            rel="nofollow"
            onClick={handleCloseMenu}
          >
            {intl.formatMessage({ id: 'header.offline' })}
          </NextLink>
        </div>
      </SheetContent>
    </Sheet>
  );
};
