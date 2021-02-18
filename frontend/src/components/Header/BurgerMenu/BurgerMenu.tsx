import { slide as Slide } from 'react-burger-menu';
import { MenuConfig, MenuItem } from 'modules/header/interface';
import { useIntl } from 'react-intl';
import { routes } from 'services/routes';
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

  return (
    <Slide
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
      <span className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none">
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
        items={config.supportedLanguages}
      />
      <BurgerMenuSection
        title={intl.formatMessage({ id: 'header.goToSearch' })}
        onClick={() => window.open(routes.SEARCH, '_self')}
      />
    </Slide>
  );
};
