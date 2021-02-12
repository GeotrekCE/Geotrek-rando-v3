import { render } from 'services/testing/reactTestingLibraryWrapper';

import { ResultCard } from '../ResultCard';

describe('Results Card', () => {
  const id = '2';
  const title = 'Balade au pays des menhirs';
  const urlToTest = `/details-${id}-Balade-au-pays-des-menhirs`;
  const resultCard = (
    <ResultCard
      id={id}
      type="TREK"
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
      redirectionUrl={urlToTest}
    />
  );

  it('AAU, I can see a ResultCard', () => {
    const component = render(resultCard);
    expect(component).toMatchSnapshot();
  });

  it('AAU, I will be redirected to the right details page', () => {
    const component = render(resultCard);
    const link = component.getByRole('link');
    expect(link).toHaveAttribute('href', urlToTest);
  });
});
