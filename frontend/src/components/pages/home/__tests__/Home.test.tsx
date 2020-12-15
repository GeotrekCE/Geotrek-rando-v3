import { render } from 'services/testing/reactTestingLibraryWrapper';

import { Home } from '../';

test('AAU, I can see the home page', () => {
  render(<Home />);
});
