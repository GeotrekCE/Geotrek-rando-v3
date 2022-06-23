import { useRouter } from 'next/router';
// @ts-ignore Not official but useful to reduce bundle size
import Slide from 'react-burger-menu/lib/menus/slide';
import { MenuConfig, MenuItem } from 'modules/header/interface';
import { useIntl } from 'react-intl';
import NextLink from 'next/link';
import { routes } from 'services/routes';
import { getDefaultLanguage } from '../../../modules/header/utills';
import { BurgerMenuSection } from '../BurgerMenuSection/BurgerMenuSection';
import { BurgerMenu as BmIcon } from '../../Icons/BurgerMenu';
import { Cross } from '../../Icons/Cross';

interface Props {
  config: MenuConfig;
  menuItems?: MenuItem[];
  displayState?: 'DISPLAYED' | 'HIDDEN';
}

export const BurgerMenu: React.FC<Props> = ({ config, menuItems, displayState = 'DISPLAYED' }) => {
  const burgerButtonClassName = `fixed w-6 h-6  right-2.5 desktop:hidden transition-all delay-100 duration-300 ${
    displayState === 'HIDDEN' ? '-top-21.5' : 'top-2.5'
  }`;

  const intl = useIntl();
  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();

  return (
    <Slide
      id="verticalMenu"
      right
      customBurgerIcon={<BmIcon className="text-white" />}
      customCrossIcon={<Cross size={24} />}
      burgerButtonClassName={burgerButtonClassName}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
      // We use mt-2 because we can't easily override the default element style with tailwind (default is top: 8 and we would like top: 16)
      crossButtonClassName="left-4 mt-2"
      crossClassName="bg-greyDarkColored"
    >
      <span
        id="verticalMenu_title"
        className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none"
      >
        {intl.formatMessage({ id: 'header.menu' })}
      </span>
      {menuItems && (
        <BurgerMenuSection title={intl.formatMessage({ id: 'header.seeMore' })} items={menuItems} />
      )}
      {config.shouldDisplayFavorite && (
        <BurgerMenuSection title={intl.formatMessage({ id: 'header.favorites' })} />
      )}
      <BurgerMenuSection
        title={intl.formatMessage({ id: 'header.language' })}
        languages={config.supportedLanguages}
      />
      <NextLink href={routes.SEARCH} passHref locale={currentLanguage} key={routes.SEARCH}>
        <a className="flex items-center pt-4 pb-4 font-bold outline-none cursor-pointer border-b pb-2 border-solid border-greySoft">
          {intl.formatMessage({ id: 'header.goToSearch' })}
        </a>
      </NextLink>
      <NextLink
        href={routes.OFFLINE}
        passHref
        prefetch={false}
        locale={currentLanguage}
        key={routes.OFFLINE}
      >
        <a
          className="flex items-center pt-4 pb-4 font-bold outline-none cursor-pointer border-b pb-2 border-solid border-greySoft"
          rel="nofollow"
        >
          {intl.formatMessage({ id: 'header.offline' })}
        </a>
      </NextLink>
    </Slide>
  );
};
