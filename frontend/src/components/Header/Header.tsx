import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { routes } from 'services/routes';
import { desktopOnly, sizes } from 'stylesheet';

import { Link } from 'components/Link';
import { Display, useHideOnScrollDown } from 'hooks/useHideOnScrollDown';

import InlineMenu from 'components/InlineMenu';
import BurgerMenu from '../BurgerMenu';

interface Props {
  logoPath: string;
}

export const Header: React.FC<Props> = ({ logoPath }) => {
  const sectionsMobile = ['En savoir plus', 'Favoris', 'Langue'];
  const sectionsDesktop = [
    'Le parc national',
    'Les maisons du parc',
    'Infos pratiques',
    ...sectionsMobile,
  ];
  const subSections = {
    'En savoir plus': [
      "Biodiv'Écrins",
      'Le Parc national des Écrins',
      'Transport',
      'Votre avis ?',
      'Les Maisons du parc',
      'Sorties accompagnées',
      'Boutique du Parc',
    ],
    Langue: ['FR'],
  };

  const headerState = useHideOnScrollDown(sizes.desktopHeader);

  return (
    <>
      <BurgerMenu
        subSections={subSections}
        sections={sectionsMobile}
        title="Menu"
        displayState={headerState}
      />
      <Container
        state={headerState}
        className="h-11 bg-primary1 flex flex-row items-center sticky z-header"
      >
        <Link href={routes.HOME}>
          <img className="h-9 mx-3 desktop:h-18" alt="logo" src={logoPath} />
        </Link>
        <p className="flex-1 text-white desktop:text-3xl font-semibold desktop:font-bold desktop:ml-8 leading-5">
          <FormattedMessage id={'home.title'} />
        </p>
        <InlineMenu
          className="hidden desktop:flex items-center"
          sections={sectionsDesktop}
          subSections={subSections}
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
