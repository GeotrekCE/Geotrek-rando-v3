import { render } from 'services/testing/reactTestingLibraryWrapper';

import { Walking } from 'components/Icons/Walking';

import { ResultCard } from '../ResultCard';

test('AAU, I can see a ResultCard', () => {
  const component = render(
    <ResultCard
      activityIcon={Walking}
      place="Saint-Etienne-du-Valdonnez"
      title="Balade au pays des menhirs"
      tags={['En famille', 'Ciel étoilé', 'Beau paysage']}
      informations={{ duration: '2h', distance: '5km', elevation: '+360m', difficulty: '' }}
    />,
  );

  expect(component).toMatchSnapshot();
});
