import { FormattedMessage } from 'react-intl';
import { routes } from 'services/routes';
import Image from 'next/image';

import { Link } from 'components/Link';
import { Display } from 'hooks/useHideOnScrollDown';

import InlineMenu from 'components/InlineMenu';
import { GoToSearchButton } from 'components/GoToSearchButton';
import { cn } from 'services/utils/cn';
import { HtmlParser } from 'components/HtmlParser';
import { BurgerMenu } from './BurgerMenu';
import { useHeader } from './useHeader';

export const Header: React.FC = () => {
  const { config, menuItems, intl } = useHeader();
  /**
   * Disabled for now to handle the map on the search page
   */
  // const headerState = useHideOnScrollDown(sizes.desktopHeader);
  const headerState: Display = 'DISPLAYED';

  const headerTop = config.headerTopHtml[intl.locale] ?? config.headerTopHtml.default;
  const headerBottom = config.headerBottomHtml[intl.locale] ?? config.headerBottomHtml.default;

  return (
    <>
      {headerTop !== undefined && (
        <div id="header_topHtml">
          <HtmlParser template={headerTop} />
        </div>
      )}
      <header
        className={cn(
          'sticky z-header bg-primary1 text-primary3',
          headerState === 'DISPLAYED' ? 'top-0' : '-top-desktopHeader',
        )}
        role="banner"
        id="header"
      >
        <BurgerMenu config={config.menu} displayState={headerState} menuItems={menuItems} />
        <div className="h-11 desktop:h-desktopHeader flex flex-row items-center sticky z-header px-3 shadow-sm shrink-0 transition-all duration-300 delay-100">
          <Link href={routes.HOME} className="flex items-center">
            <div className="shrink-0" id="header_logo">
              <Image
                id="header_logoImg"
                className="h-9 w-auto desktop:h-18 mr-3"
                alt=""
                src={config.logo}
                height={36}
                width={36}
                priority
              />
            </div>
            <p
              id="header_title"
              className="
              flex-auto text-white
              desktop:text-H2 desktop:leading-8
              font-semibold desktop:font-bold"
            >
              <FormattedMessage id={'home.title'} />
            </p>
          </Link>
          <div className="flex-1 w-0" />
          <InlineMenu
            className="hidden desktop:flex items-center justify-end flex-auto gap-4"
            menuItems={menuItems}
            config={config.menu}
          />
          <GoToSearchButton className="hidden desktop:block" />
        </div>
      </header>
      {headerBottom !== undefined && (
        <div id="header_bottomHtml">
          <HtmlParser template={headerBottom} />
        </div>
      )}
    </>
  );
};
