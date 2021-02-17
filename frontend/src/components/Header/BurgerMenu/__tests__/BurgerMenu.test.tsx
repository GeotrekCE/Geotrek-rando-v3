import { render } from 'services/testing/reactTestingLibraryWrapper';

import { BurgerMenu } from '../';

test('AAU, I can see a BurgerMenu', () => {
  const component = render(
    <BurgerMenu
      displayState="DISPLAYED"
      config={{
        primaryItemsNumber: 3,
        shouldDisplayFavorite: true,
        supportedLanguages: ['fr'],
        defaultLanguage: 'fr',
      }}
      menuItems={[
        {
          title: 'NationalPark',
          url: 'https://www.ecrins-parcnational.fr/',
          order: 1,
        },
        {
          title: 'Maisons du Parc',
          url: 'https://www.ecrins-parcnational.fr/',
          order: 2,
        },
        {
          title: 'Informations utiles',
          url: 'https://www.ecrins-parcnational.fr/',
          order: 3,
        },
      ]}
    />,
  );
  expect(component).toMatchSnapshot();
});
