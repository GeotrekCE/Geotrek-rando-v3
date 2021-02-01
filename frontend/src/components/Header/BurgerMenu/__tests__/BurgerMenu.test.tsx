import { render } from 'services/testing/reactTestingLibraryWrapper';

import { BurgerMenu } from '../';

test('AAU, I can see a BurgerMenu', () => {
  const component = render(
    <BurgerMenu
      displayState="DISPLAYED"
      config={{
        primaryItemsNumber: 3,
        items: [
          {
            translationId: 'header.nationalPark',
            url: 'https://www.ecrins-parcnational.fr/',
          },
          {
            translationId: 'header.parcHouses',
            url: 'https://www.ecrins-parcnational.fr/',
          },
          {
            translationId: 'header.usefulInformations',
            url: 'https://www.ecrins-parcnational.fr/',
          },
          {
            translationId: 'header.biodiv',
            url: 'https://www.ecrins-parcnational.fr/',
          },
          {
            translationId: 'header.transportation',
            url: 'https://www.ecrins-parcnational.fr/',
          },
          {
            translationId: 'header.yourOpinion',
            url: 'https://www.ecrins-parcnational.fr/',
          },
        ],
        shouldDisplayFavorite: true,
        supportedLanguages: ['fr'],
      }}
    />,
  );
  expect(component).toMatchSnapshot();
});
