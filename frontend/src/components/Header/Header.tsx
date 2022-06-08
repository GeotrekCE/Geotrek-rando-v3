import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { routes } from 'services/routes';
import { desktopOnly, sizes } from 'stylesheet';

import { Link } from 'components/Link';
import { Display } from 'hooks/useHideOnScrollDown';

import parse from 'html-react-parser';
import InlineMenu from 'components/InlineMenu';
import { GoToSearchButton } from 'components/GoToSearchButton';
import { BurgerMenu } from './BurgerMenu';
import { useHeader } from './useHeader';

export const Header: React.FC = () => {
  const { config, menuItems, intl } = useHeader();

  const sectionsDesktop = menuItems?.slice(0, config.menu.primaryItemsNumber);
  const subSections = menuItems?.slice(config.menu.primaryItemsNumber);
  /**
   * Disabled for now to handle the map on the search page
   */
  // const headerState = useHideOnScrollDown(sizes.desktopHeader);
  const headerState = 'DISPLAYED';

  const headerTop = config.headerTopHtml[intl.locale] ?? config.headerTopHtml.default;
  const headerBottom = config.headerBottomHtml[intl.locale] ?? config.headerBottomHtml.default;

  return (
    <>
      {headerTop !== undefined && <div id="header_topHtml">{parse(headerTop)}</div>}
      <BurgerMenu config={config.menu} displayState={headerState} menuItems={menuItems} />
      <Container
        state={headerState}
        className="h-11 bg-primary1 flex flex-row items-center sticky z-header px-3 shadow-sm text-primary3 flex-shrink-0"
        id="header"
      >
        <Link href={routes.HOME} className="flex items-center">
          <div className="flex-shrink-0" id="header_logo">
            <img
              id="header_logoImg"
              className="h-9 desktop:h-18 mr-3 rounded-md"
              alt="logo"
              src={config.logo}
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
        {(sectionsDesktop || subSections) && (
          <InlineMenu
            className="hidden desktop:flex items-center justify-end flex-auto"
            sections={sectionsDesktop}
            subSections={subSections}
            shouldDisplayFavorites={config.menu.shouldDisplayFavorite}
            supportedLanguages={config.menu.supportedLanguages}
          />
        )}
        <GoToSearchButton className="hidden desktop:block" />
      </Container>
      {headerBottom !== undefined && <div id="header_bottomHtml">{parse(headerBottom)}</div>}
    </>
  );
};

const Container = styled.div<{ state: Display }>`
  ${desktopOnly(css`
    height: ${sizes.desktopHeader}px;
  `)}

  transition: top 0.3s ease-in-out 0.1s;
  top: ${({ state }) => (state === 'DISPLAYED' ? 0 : -sizes.desktopHeader)}px;
`;
