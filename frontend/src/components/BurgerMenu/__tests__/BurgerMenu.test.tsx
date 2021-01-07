import { render } from 'services/testing/reactTestingLibraryWrapper';

import BurgerMenu from '../';

test('AAU, I can see a BurgerMenu', () => {
  const component = render(<BurgerMenu title="Test" sections={['Section 1', 'Section 2']} />);
  expect(component).toMatchSnapshot();
});
