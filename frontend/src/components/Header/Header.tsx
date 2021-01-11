import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { routes } from 'services/routes';
import { desktopOnly, sizes } from 'stylesheet';

import { Link } from 'components/Link';
import { Display, useHideOnScrollDown } from 'hooks/useHideOnScrollDown';

import BurgerMenu from '../BurgerMenu';

interface Props {
  logoPath: string;
}

export const Header: React.FC<Props> = ({ logoPath }) => {
  const sections = ['A propos', 'Langue', 'Favoris'];
  const subSections = {
    'A propos': [
      "Biodiv'Écrins",
      'Le Parc national des Écrins',
      'Transport',
      'Votre avis ?',
      'Les Maisons du parc',
      'Sorties accompagnées',
      'Boutique du Parc',
    ],
    Langue: ['Français', 'Anglais'],
  };

  const headerState = useHideOnScrollDown(sizes.desktopHeader);

  return (
    <>
      <BurgerMenu
        subSections={subSections}
        sections={sections}
        title="Menu"
        displayState={headerState}
      />
      <Container
        state={headerState}
        className="h-11 bg-primary1 flex flex-row items-center sticky z-header"
      >
        <Link href={routes.HOME}>
          <img className="h-9 mx-3" alt="logo" src={logoPath} />
        </Link>
        <h1 className="flex-1 text-white">
          <FormattedMessage id={'home.title'} />
        </h1>
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
