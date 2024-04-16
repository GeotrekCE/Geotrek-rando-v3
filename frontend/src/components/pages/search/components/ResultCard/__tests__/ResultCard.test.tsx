import { render } from 'services/testing/reactTestingLibraryWrapper';

import { ResultCard } from '../ResultCard';

describe('Results Card', () => {
  const id = '2';
  const title = 'Balade au pays des menhirs';
  const urlToTest = `/details-${id}-Balade-au-pays-des-menhirs`;
  const resultCard = (
    <ResultCard
      id={id}
      hoverId="test"
      type="TREK"
      place="Saint-Etienne-du-Valdonnez"
      title={title}
      tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
      images={[{ author: '', legend: '', url: '/test.jpg' }]}
      badgeIconUri=""
      informations={[
        {
          label: 'difficulty',
          value: 'Difficile',
          pictogramUri: '/difficulty.jpg',
        },
        { label: 'duration', value: '2h' },
        { label: 'distance', value: '5km' },
        { label: 'positiveElevation', value: '+360m' },
      ]}
      redirectionUrl={urlToTest}
    />
  );

  it('AAU, I can see a ResultCard', () => {
    const component = render(resultCard);
    expect(component).toMatchSnapshot();
  });

  it('AAU, I will be redirected to the right details page', () => {
    const component = render(resultCard);
    const link = component.queryByTestId(`Link-ResultCard-${id}`);
    expect(link).toHaveAttribute('href', urlToTest);
  });
});
