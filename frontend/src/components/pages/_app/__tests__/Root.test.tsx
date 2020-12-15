import { render } from 'services/testing/reactTestingLibraryWrapper';

import { Root } from '../Root';

test('AAU, I can see a Root', () => {
  render(<Root hasError={false} />);
});
