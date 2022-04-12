import { Heart } from 'components/Icons/Heart';
import DropdownContainer, * as SimpleDropdown from 'react-simple-dropdown';
//@ts-ignore
import ReactCountryFlag from 'react-country-flag';
import { useIntl } from 'react-intl';
import { Link } from 'components/Link';
import NextLink from 'next/link';
import { MenuItem } from 'modules/header/interface';
import { ChevronDown } from 'components/Icons/ChevronDown';
import { useRouter } from 'next/router';
import { isInternalFlatPageUrl } from 'services/routeUtils';
import React, { useRef } from 'react';
import { getDefaultLanguage } from 'modules/header/utills';

export interface InlineMenuProps {
  className?: string;
  shouldDisplayFavorites: boolean;
  sections?: MenuItem[];
  subSections?: MenuItem[];
  supportedLanguages: string[];
}

const InlineMenu: React.FC<InlineMenuProps> = ({
  className,
  sections,
  subSections,
  shouldDisplayFavorites,
  supportedLanguages,
}) => {
  const intl = useIntl();
  const languageDropdownRef = useRef<DropdownContainer>(null);
  const flatpageDropdownRef = useRef<DropdownContainer>(null);
  const router = useRouter();
  const language = router.locale ?? getDefaultLanguage();

  return (
    <div className={className} id="header_inlineMenu">
      {sections &&
        sections.map((menuItem, i) => (
          <Section name={menuItem.title} key={i} url={menuItem.url} language={language} />
        ))}
      {subSections && subSections.length > 0 && (
        <DropdownContainer ref={flatpageDropdownRef} className="flex-row">
          <SimpleDropdown.DropdownTrigger className={controlClassName}>
            {intl.formatMessage({
              id: 'header.seeMore',
            })}
            <ChevronDown size={16} className="flex-shrink-0 ml-1" />
          </SimpleDropdown.DropdownTrigger>
          <SimpleDropdown.DropdownContent className={menuClassName}>
            {subSections.map(menuItem => {
              return (
                <NextLink href={menuItem.url} passHref locale={language} key={menuItem.title}>
                  <a
                    className={optionClassName}
                    onClick={() => flatpageDropdownRef?.current?.hide()}
                    target={isInternalFlatPageUrl(menuItem.url) ? undefined : '_blank'}
                  >
                    {menuItem.title}
                  </a>
                </NextLink>
              );
            })}
          </SimpleDropdown.DropdownContent>
        </DropdownContainer>
      )}

      {shouldDisplayFavorites && (
        <div className="flex items-center text-white">
          <Heart size={16} className="mr-2" />
          <Section name={intl.formatMessage({ id: 'header.favorites' })} />
        </div>
      )}

      {supportedLanguages.length > 1 && (
        <div className="flex items-center text-white" key="language">
          {language !== undefined && (
            <ReactCountryFlag
              countryCode={language === 'en' ? 'GB' : language.toUpperCase()}
              className="mr-2"
              svg
            />
          )}
          <DropdownContainer ref={languageDropdownRef} className="flex-row">
            <SimpleDropdown.DropdownTrigger className={controlClassName}>
              {language?.toUpperCase()}
              <ChevronDown size={16} className="flex-shrink-0 ml-1" />
            </SimpleDropdown.DropdownTrigger>
            <SimpleDropdown.DropdownContent className={menuClassName}>
              {supportedLanguages.map(locale => (
                <Link
                  href={router.asPath}
                  passHref
                  locale={locale}
                  replace
                  scroll={false}
                  key={locale}
                  className={optionClassName}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </SimpleDropdown.DropdownContent>
          </DropdownContainer>
        </div>
      )}
    </div>
  );
};

const menuClassName =
  'flex-col bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft overflow-hidden absolute py-2 -ml-2 top-18';

const controlClassName = 'pt-4 pb-2 mb-2 mr-4 text-white cursor-pointer flex items-center';

const optionClassName = 'flex hover:bg-greySoft-light focus:bg-greySoft cursor-pointer px-5 py-2';

const sectionClassName = 'pt-3 pb-2 mr-5 text-white cursor-pointer';

const Section: React.FC<{ name: string; url?: string; language?: string }> = ({
  name,
  url,
  language,
}) => (
  <div
    id="header_inlineMenuSection"
    className={`${sectionClassName} duration-500 transition-all border-b-4 hover:border-white border-transparent border-solid`}
  >
    {url !== undefined ? (
      <NextLink href={url} locale={language}>
        {name}
      </NextLink>
    ) : (
      name
    )}
  </div>
);

export default InlineMenu;
