import { Heart } from 'components/Icons/Heart';
import ReactCountryFlag from 'react-country-flag';
import { useIntl } from 'react-intl';
import { Link } from 'components/Link';
import NextLink from 'next/link';
import { MenuItem } from 'modules/header/interface';
import { ChevronDown } from 'components/Icons/ChevronDown';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getCountryCodeFromLanguage } from 'services/i18n/intl';

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
  const router = useRouter();
  const language = router.locale ?? getDefaultLanguage();

  return (
    <div className={className} id="header_inlineMenu">
      {sections &&
        sections.map((menuItem, i) => (
          <Section
            name={menuItem.title}
            key={i}
            url={menuItem.url}
            language={language}
            openInAnotherTab={menuItem.openInAnotherTab}
          />
        ))}
      {subSections && subSections.length > 0 && (
        <details className="flex-row">
          <summary className={controlClassName}>
            {intl.formatMessage({
              id: 'header.seeMore',
            })}
            <ChevronDown size={16} className="shrink-0 ml-1" aria-hidden />
          </summary>
          <div className={menuClassName}>
            {subSections.map(menuItem => {
              if (menuItem.url === null) {
                <span className={optionClassName}>{menuItem.title}</span>;
              }
              return (
                <NextLink
                  href={menuItem.url as string}
                  className={optionClassName}
                  locale={language}
                  key={menuItem.title}
                  {...(menuItem.openInAnotherTab && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  {menuItem.title}
                </NextLink>
              );
            })}
          </div>
        </details>
      )}

      {shouldDisplayFavorites && (
        <div className="flex items-center text-white">
          <Heart size={16} className="mr-2" />
          <Section name={intl.formatMessage({ id: 'header.favorites' })} />
        </div>
      )}

      {supportedLanguages.length > 1 && (
        <div className="flex items-center text-white">
          <ReactCountryFlag
            alt=""
            countryCode={getCountryCodeFromLanguage(language)}
            className="mr-2"
            loading="lazy"
            height={16}
            width={16}
            svg
          />
          <details className="flex-row">
            <summary className={controlClassName}>
              {language.toUpperCase()}
              <ChevronDown size={16} className="shrink-0 ml-1" aria-hidden />
            </summary>
            <div className={menuClassName}>
              {supportedLanguages.map(locale => (
                <Link
                  href={router.asPath}
                  locale={locale}
                  replace
                  scroll={false}
                  key={locale}
                  className={optionClassName}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

const menuClassName =
  'flex-col bg-white text-greyDarkColored rounded-2xl border border-solid border-greySoft overflow-hidden absolute py-2 -ml-2 top-18';

const controlClassName =
  'pt-4 pb-2 mb-2 mr-4 text-white cursor-pointer flex items-center list-none';

const optionClassName = 'flex hover:bg-greySoft-light focus:bg-greySoft cursor-pointer px-5 py-2';

const Section: React.FC<{
  name: string;
  url?: string | null;
  language?: string;
  openInAnotherTab?: boolean;
}> = ({ name, url, language, openInAnotherTab }) => (
  <div
    id="header_inlineMenuSection"
    className="pt-3 pb-2 mr-5 text-white cursor-pointer duration-500 transition-all border-b-4 hover:border-white border-transparent border-solid"
  >
    {url ? (
      <NextLink
        href={url}
        locale={language}
        {...(openInAnotherTab && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {name}
      </NextLink>
    ) : (
      name
    )}
  </div>
);

export default InlineMenu;
