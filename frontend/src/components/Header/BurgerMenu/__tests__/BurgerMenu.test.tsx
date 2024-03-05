import { render } from 'services/testing/reactTestingLibraryWrapper';

import { BurgerMenu } from '../';

describe('AAU, I can see a BurgerMenu', () => {
  const props = {
    config: {
      primaryItemsNumber: 3,
      shouldDisplayFavorite: true,
      supportedLanguages: ['fr', 'en'],
      defaultLanguage: 'fr',
    },
    menuItems: [
      {
        title: 'NationalPark',
        url: 'https://www.ecrins-parcnational.fr/',
        openInAnotherTab: true,
        order: 1,
        id: 2,
      },
      {
        title: 'Maisons du Parc',
        url: 'https://www.ecrins-parcnational.fr/',
        openInAnotherTab: true,
        order: 2,
        id: 1,
      },
      {
        title: 'Informations utiles',
        url: 'https://www.ecrins-parcnational.fr/',
        openInAnotherTab: true,
        order: 3,
        id: 3,
      },
    ],
  };
  it('with several languages', () => {
    const component = render(<BurgerMenu displayState="DISPLAYED" {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('with only one language', () => {
    const component = render(
      <BurgerMenu
        displayState="DISPLAYED"
        {...props}
        config={{ ...props.config, supportedLanguages: ['fr'] }}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
