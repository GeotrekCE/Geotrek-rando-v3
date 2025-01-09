import { useState } from 'react';
import { Heart } from 'components/Icons/Heart';
import ReactCountryFlag from 'react-country-flag';
import { FormattedMessage } from 'react-intl';
import { Link } from 'components/Link';
import { MenuConfig } from 'modules/header/interface';
import { MenuItem } from 'modules/menuItems/interface';
import { ChevronDown } from 'components/Icons/ChevronDown';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getCountryCodeFromLanguage } from 'services/i18n/intl';
import { DropdownMenu } from 'components/DropdownMenu';
import { cn } from 'services/utils/cn';
import { Menu } from './Menu';

export interface InlineMenuProps {
  className?: string;
  menuItems?: MenuItem[];
  config: MenuConfig;
}

const InlineMenu: React.FC<InlineMenuProps> = ({
  className,
  menuItems,
  config: { primaryItemsNumber, shouldDisplayFavorite, supportedLanguages },
}) => {
  const [activeDropdownID, setActiveDropdownID] = useState<null | string>(null);
  const router = useRouter();
  const language = router.locale ?? getDefaultLanguage();

  return (
    <div className={className} id="header_inlineMenu">
      {menuItems?.length ? (
        <Menu
          menuItems={menuItems}
          primaryItemsNumber={primaryItemsNumber}
          activeID={activeDropdownID}
          setActiveID={setActiveDropdownID}
        />
      ) : null}

      {shouldDisplayFavorite && (
        <div className="flex items-center text-white">
          <Heart size={16} className="mr-2" />
          <div className="pt-3 pb-2 mr-5 text-white duration-500 transition-all border-b-4 hover:border-white border-transparent border-solid">
            <FormattedMessage id="header.favorites" />
          </div>
        </div>
      )}

      {supportedLanguages.length > 1 && (
        <div className="flex items-center text-white">
          <DropdownMenu
            activeID={activeDropdownID}
            setActiveID={setActiveDropdownID}
            trigger={
              <>
                <ReactCountryFlag
                  alt=""
                  countryCode={getCountryCodeFromLanguage(language)}
                  className="mr-2"
                  loading="lazy"
                  height={16}
                  width={16}
                  svg
                  crossOrigin="anonymous"
                />
                {language.toUpperCase()}
                <ChevronDown size={16} className="shrink-0 ml-1" aria-hidden />
              </>
            }
            asHover
            className={cn(
              'relative pt-3 pb-2 text-white flex items-center border-b-4 border-solid border-transparent duration-500 transition-color',
              "after:content-[''] after:absolute after:top-10 after:-left-5 after:-right-5 after:h-8",
            )}
            wrapperClassName="flex-row"
            contentClassName="flex-col bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft overflow-hidden absolute py-2 top-18"
          >
            {supportedLanguages.map(locale => (
              <Link
                href={router.asPath}
                locale={locale}
                replace
                scroll={false}
                key={locale}
                className="flex hover:bg-greySoft-light focus:bg-greySoft px-5 py-2"
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default InlineMenu;
