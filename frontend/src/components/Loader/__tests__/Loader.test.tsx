import { render } from 'services/testing/reactTestingLibraryWrapper';

import Loader from '../';

test('AAU, I can see a Loader', () => {
  render(<Loader />);
});
