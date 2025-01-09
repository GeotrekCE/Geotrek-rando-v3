import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { routes } from 'services/routes';

import { Link } from 'components/Link';

import InlineMenu from 'components/InlineMenu';
import { GoToSearchButton } from 'components/GoToSearchButton';
import { cn } from 'services/utils/cn';
import { HtmlParser } from 'components/HtmlParser';
import { BurgerMenu } from './BurgerMenu';
import { useHeader } from './useHeader';

export const Header: React.FC = () => {
  const menuNode = useRef<HTMLDivElement | null>(null);
  const { config, menuItems, isDesktopMenu, intl } = useHeader(menuNode);

  const headerTop = config.headerTopHtml[intl.locale] ?? config.headerTopHtml.default;
  const headerBottom = config.headerBottomHtml[intl.locale] ?? config.headerBottomHtml.default;

  return (
    <>
      {headerTop !== undefined && (
        <div id="header_topHtml">
          <HtmlParser template={headerTop} />
        </div>
      )}
      <header className="sticky z-header bg-primary1 top-0" role="banner" id="header">
        <div className="h-11 desktop:h-desktopHeader flex justify-between  items-center sticky z-header px-3 shadow-sm shrink-0 transition-all duration-300 delay-100">
          <Link href={routes.HOME} className="flex items-center">
            <div className="shrink-0" id="header_logo">
              <img
                id="header_logoImg"
                className="h-9 w-auto desktop:h-18 mr-3"
                alt=""
                crossOrigin="anonymous"
                src={config.logo}
              />
            </div>
            <p
              id="header_title"
              className="
              flex-auto text-white
              desktop:text-H2 desktop:leading-8
              font-semibold desktop:font-bold desktop:shrink-0"
            >
              <FormattedMessage id={'home.title'} />
            </p>
          </Link>
          <div
            ref={menuNode}
            className={cn('items-center hidden desktop:flex gap-2', !isDesktopMenu && 'invisible')}
            aria-hidden={!isDesktopMenu}
          >
            <InlineMenu
              className={cn('flex items-center justify-end flex-auto flex-wrap gap-4 mr-2')}
              menuItems={menuItems}
              config={config.menu}
            />
            <GoToSearchButton />
          </div>
        </div>
        <BurgerMenu
          className={cn(isDesktopMenu && 'hidden')}
          config={config.menu}
          displayState="DISPLAYED"
          menuItems={menuItems}
        />
      </header>
      {headerBottom !== undefined && (
        <div id="header_bottomHtml">
          <HtmlParser template={headerBottom} />
        </div>
      )}
    </>
  );
};
