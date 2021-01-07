import { render } from 'services/testing/reactTestingLibraryWrapper';

import BurgerMenu from '../';

test('AAU, I can see a BurgerMenu', () => {
  const component = render(<BurgerMenu />);
  expect(component).toMatchSnapshot();
});
