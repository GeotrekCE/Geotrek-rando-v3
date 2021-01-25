import { FormattedMessage } from 'react-intl';
import { routes } from 'services/routes';

import { Link } from 'components/Link';

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
  /**
   * Disabled for now to handle the map on the search page
   */
  // const headerState = useHideOnScrollDown(sizes.desktopHeader);
  const headerState = 'DISPLAYED';

  return (
    <>
      <BurgerMenu
        subSections={subSections}
        sections={sectionsMobile}
        title="Menu"
        displayState={headerState}
      />
      <div
        className={`h-11 desktop:h-desktopHeader sticky z-header
        ${headerState === 'DISPLAYED' ? 'top-0' : '-top-desktopHeader'} transition-all duration-300
        bg-primary1
        flex items-center px-3`}
      >
        <Link href={routes.HOME} className="flex items-center flex-auto">
          <img className="h-9 desktop:h-18 mr-3" alt="logo" src={logoPath} />
          <p
            className="
              flex-auto text-white
              desktop:text-H2 desktop:leading-8
              font-semibold desktop:font-bold"
          >
            <FormattedMessage id={'home.title'} />
          </p>
        </Link>
        <InlineMenu
          className="hidden desktop:flex items-center flex-auto justify-between"
          sections={sectionsDesktop}
          subSections={subSections}
        />
      </div>
    </>
  );
};
