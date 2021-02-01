import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { routes } from 'services/routes';
import { desktopOnly, sizes } from 'stylesheet';

import { Link } from 'components/Link';
import { Display } from 'hooks/useHideOnScrollDown';

import InlineMenu from 'components/InlineMenu';
import { BurgerMenu } from './BurgerMenu';
import { useHeader } from './useHeader';

export const Header: React.FC = () => {
  const { config, intl } = useHeader();

  const sectionsDesktop = config.menu.items
    .slice(0, config.menu.primaryItemsNumber)
    .map(item => ({ name: intl.formatMessage({ id: item.translationId }), url: item.url }));
  const subSections = config.menu.items
    .slice(config.menu.primaryItemsNumber)
    .map(item => ({ name: intl.formatMessage({ id: item.translationId }), url: item.url }));
  /**
   * Disabled for now to handle the map on the search page
   */
  // const headerState = useHideOnScrollDown(sizes.desktopHeader);
  const headerState = 'DISPLAYED';

  return (
    <>
      <BurgerMenu config={config.menu} displayState={headerState} />
      <Container
        state={headerState}
        className="h-11 bg-primary1 flex flex-row items-center sticky z-header px-3"
      >
        <div className="flex-shrink-0">
          <Link href={routes.HOME}>
            <img className="h-9 desktop:h-18 mr-3" alt="logo" src={config.logo} />
          </Link>
        </div>
        <p
          className="
          flex-auto text-white
          desktop:text-H2 desktop:leading-8
          font-semibold desktop:font-bold"
        >
          <FormattedMessage id={'home.title'} />
        </p>
        <InlineMenu
          className="hidden desktop:flex items-center flex-auto justify-between"
          sections={sectionsDesktop}
          subSections={subSections}
          shouldDisplayFavorites={config.menu.shouldDisplayFavorite}
          supportedLanguages={config.menu.supportedLanguages}
        />
      </Container>
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
