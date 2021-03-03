import { Heart } from 'components/Icons/Heart';
import Dropdown from 'react-dropdown';
import DropdownContainer, * as SimpleDropdown from 'react-simple-dropdown';
import ReactCountryFlag from 'react-country-flag';
import { useIntl } from 'react-intl';
import { Link } from 'components/Link';
import { MenuItem } from 'modules/header/interface';
import { ChevronDown } from 'components/Icons/ChevronDown';
import { useRouter } from 'next/router';
import { isInternalFlatPageUrl } from 'services/routeUtils';
import React, { useRef } from 'react';

export interface InlineMenuProps {
  className?: string;
  shouldDisplayFavorites: boolean;
  sections?: MenuItem[];
  subSections?: MenuItem[];
  supportedLanguages: string[];
}

const openInCurrentTab = (url: string) => {
  window.open(url, '_self');
};

const openInNewTab = (url: string) => {
  window.open(url);
};

const LanguageDropDownButton = React.forwardRef<
  HTMLAnchorElement,
  { text: string; onClick: () => void; href?: string; className: string }
>(({ text, onClick, href, className }, ref) => {
  return (
    <a className={className} href={href} onClick={onClick} ref={ref}>
      {text}
    </a>
  );
});

LanguageDropDownButton.displayName = 'LanguageDropDownButton';

const InlineMenu: React.FC<InlineMenuProps> = ({
  className,
  sections,
  subSections,
  shouldDisplayFavorites,
  supportedLanguages,
}) => {
  const intl = useIntl();
  const dropdownRef = useRef<DropdownContainer>(null);
  const router = useRouter();
  return (
    <div className={className}>
      {sections &&
        sections.map((menuItem, i) => <Section name={menuItem.title} key={i} url={menuItem.url} />)}
      {subSections && subSections.length > 0 && (
        <Dropdown
          options={subSections.map(menuItem => ({
            value: menuItem.url,
            label: menuItem.title,
            className: optionClassName,
          }))}
          controlClassName={controlClassName}
          menuClassName={menuClassName}
          placeholderClassName="hidden"
          arrowClosed={
            <SectionWithArrow
              name={intl.formatMessage({
                id: 'header.seeMore',
              })}
            />
          }
          arrowOpen={
            <SectionWithArrow
              name={intl.formatMessage({
                id: 'header.seeMore',
              })}
            />
          }
          onChange={option =>
            isInternalFlatPageUrl(option.value)
              ? openInCurrentTab(option.value)
              : openInNewTab(option.value)
          }
        />
      )}

      {shouldDisplayFavorites && (
        <div className="flex items-center text-white">
          <Heart size={16} className="mr-2" />
          <Section name={intl.formatMessage({ id: 'header.favorites' })} />
        </div>
      )}
      <div className="flex items-center text-white" key="language">
        {router.locale !== undefined && (
          <ReactCountryFlag
            countryCode={router.locale === 'en' ? 'GB' : router.locale.toUpperCase()}
            className="mr-2"
            svg
          />
        )}
        <DropdownContainer ref={dropdownRef} className="flex-row">
          <SimpleDropdown.DropdownTrigger className={controlClassName}>
            {router.locale?.toUpperCase()}
            <ChevronDown size={16} className="flex-shrink-0 ml-1" />
          </SimpleDropdown.DropdownTrigger>
          <SimpleDropdown.DropdownContent className={menuClassName}>
            {/* <div className={menuClassName}> */}
            {supportedLanguages.map(language => (
              <Link
                href={router.asPath}
                passHref
                locale={language}
                replace
                scroll={false}
                key={language}
              >
                <LanguageDropDownButton
                  className={optionClassName}
                  text={language.toUpperCase()}
                  onClick={() => dropdownRef?.current?.hide()}
                ></LanguageDropDownButton>
              </Link>
            ))}
            {/* </div> */}
          </SimpleDropdown.DropdownContent>
        </DropdownContainer>
      </div>
    </div>
  );
};

const menuClassName =
  'flex-col bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft overflow-hidden absolute py-2 -ml-2 top-18';

const controlClassName = 'pt-4 pb-2 mb-2 mr-4 text-white cursor-pointer flex items-center';

const optionClassName = 'flex hover:bg-greySoft-light focus:bg-greySoft cursor-pointer px-5 py-2';

const sectionClassName = 'pt-3 pb-2 mr-5 text-white cursor-pointer';

const SectionWithArrow: React.FC<{ name: string }> = ({ name }) => (
  <div className={`${sectionClassName} flex items-center flex-shrink-0 mb-1 whitespace-nowrap`}>
    {name}
    <ChevronDown size={16} className="flex-shrink-0 ml-1" />
  </div>
);

const Section: React.FC<{ name: string; url?: string }> = ({ name, url }) => (
  <div
    className={`${sectionClassName} duration-500 transition-all border-b-4 hover:border-white border-transparent border-solid`}
  >
    {url !== undefined ? <a href={url}>{name}</a> : name}
  </div>
);

export default InlineMenu;
