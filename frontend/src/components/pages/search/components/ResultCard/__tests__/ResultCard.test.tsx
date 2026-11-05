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

  it('displays impracticable message for trek on today date without end date', () => {
    const component = render(
      <ResultCard
        id="10"
        hoverId="test-10"
        type="TREK"
        place="Gap"
        title="Trek Impraticable"
        images={[]}
        redirectionUrl="/details-10"
        isImpracticable
        isTodayDate
      />,
    );
    expect(component.getByText(/Cet itinéraire est impraticable jusqu'à nouvel ordre/i)).toBeInTheDocument();
  });

  it('displays impracticable message for trek with end date on today date', () => {
    const component = render(
      <ResultCard
        id="11"
        hoverId="test-11"
        type="TREK"
        place="Gap"
        title="Trek Impraticable Date Fin"
        images={[]}
        redirectionUrl="/details-11"
        isImpracticable
        isTodayDate
        endDate="2026-12-31"
      />,
    );
    expect(component.getByText(/Cet itinéraire est impraticable jusqu'au/i)).toBeInTheDocument();
  });

  it('displays impracticable message for trek on filtered period without end date', () => {
    const component = render(
      <ResultCard
        id="12"
        hoverId="test-12"
        type="TREK"
        place="Gap"
        title="Trek Période"
        images={[]}
        redirectionUrl="/details-12"
        isImpracticable
        isTodayDate={false}
      />,
    );
    expect(
      component.getByText(/Cet itinéraire est impraticable à la date ou période choisie, jusqu'à nouvel ordre/i),
    ).toBeInTheDocument();
  });

  it('displays impracticable message for touristic content on filtered period with end date', () => {
    const component = render(
      <ResultCard
        id="13"
        hoverId="test-13"
        type="TOURISTIC_CONTENT"
        place="Embrun"
        title="Camping Impraticable"
        images={[]}
        redirectionUrl="/details-13"
        isImpracticable
        isTodayDate={false}
        endDate="2026-12-31"
      />,
    );
    expect(
      component.getByText(/Cette zone est impraticable à la date ou période choisie, et jusqu'au/i),
    ).toBeInTheDocument();
  });
});
