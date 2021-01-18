import { render } from 'services/testing/reactTestingLibraryWrapper';

import { ResultCard } from '../ResultCard';

describe('Results Card', () => {
  const id = 2;
  const title = 'Balade au pays des menhirs';

  it('AAU, I can see a ResultCard', () => {
    const component = render(
      <ResultCard
        id={id}
        place="Saint-Etienne-du-Valdonnez"
        title={title}
        tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
        thumbnailUri=""
        badgeIconUri=""
        informations={{
          duration: '2h',
          distance: '5km',
          elevation: '+360m',
          difficulty: { label: '', pictogramUri: '' },
          reservationSystem: 1,
        }}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('AAU, I will be redirected to the right details page', async () => {
    const component = render(
      <ResultCard
        id={id}
        place="Saint-Etienne-du-Valdonnez"
        title={title}
        tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
        thumbnailUri=""
        badgeIconUri=""
        informations={{
          duration: '2h',
          distance: '5km',
          elevation: '+360m',
          difficulty: { label: '', pictogramUri: '' },
          reservationSystem: 1,
        }}
      />,
    );
    const links = await component.findAllByTestId(`Link-ResultCard-${id}`);
    links.forEach(link =>
      expect(link).toHaveAttribute('href', `/details-${id}-${encodeURI(title)}`),
    );
  });
});
