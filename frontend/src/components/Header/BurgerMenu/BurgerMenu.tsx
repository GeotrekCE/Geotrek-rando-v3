import { useMemo } from 'react';
// @ts-expect-error Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';
import { MenuConfig } from 'modules/header/interface';
import { MenuItem } from 'modules/menuItems/interface';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import { routes } from 'services/routes';
import { cn } from 'services/utils/cn';
import { BurgerMenuSection } from '../BurgerMenuSection/BurgerMenuSection';
import { BurgerMenu as BmIcon } from '../../Icons/BurgerMenu';
import { Cross } from '../../Icons/Cross';

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
    'fixed size-6 right-2.5 desktop:right-8 transition-all delay-100 duration-300',
    displayState === 'HIDDEN' ? '-top-21.5' : 'top-2.5 desktop:top-8',
    className,
  );

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
    <Slide
      id="verticalMenu"
      right
      customBurgerIcon={<BmIcon className="text-white" />}
      customCrossIcon={<Cross size={24} />}
      burgerButtonClassName={burgerButtonClassName}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
      crossButtonClassName="left-4 mt-2"
      crossClassName="bg-greyDarkColored"
      overlayClassName="top-0"
      className="top-0"
    >
      <span
        id="verticalMenu_title"
        className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none"
      >
        {intl.formatMessage({ id: 'header.menu' })}
      </span>
      {menuSection.map((item, index) => {
        if (!item.children?.length) {
          if (item.url) {
            return (
              <NextLink key={index} className={menuItemLinkClassNames} href={item.url}>
                {item.title}
              </NextLink>
            );
          }
          return null;
        }
        return <BurgerMenuSection key={index} title={item.title} items={item.children} />;
      })}
      {config.shouldDisplayFavorite && (
        <BurgerMenuSection title={intl.formatMessage({ id: 'header.favorites' })} />
      )}
      {config.supportedLanguages.length > 1 && (
        <BurgerMenuSection
          title={intl.formatMessage({ id: 'header.language' })}
          languages={config.supportedLanguages}
        />
      )}
      <NextLink className={menuItemLinkClassNames} href={routes.SEARCH}>
        {intl.formatMessage({ id: 'header.goToSearch' })}
      </NextLink>
      <NextLink
        className={menuItemLinkClassNames}
        href={routes.OFFLINE}
        prefetch={false}
        rel="nofollow"
      >
        {intl.formatMessage({ id: 'header.offline' })}
      </NextLink>
    </Slide>
  );
};
