import { render } from 'services/testing/reactTestingLibraryWrapper';

import Input from '../';

test('AAU, I can see an Input', () => {
  render(<Input hasError={false} />);
});
