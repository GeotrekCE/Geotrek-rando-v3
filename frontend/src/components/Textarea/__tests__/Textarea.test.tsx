import { render } from 'services/testing/reactTestingLibraryWrapper';

import Textarea from '../';

test('AAU, I can see a Textarea', () => {
  render(<Textarea hasError={false} />);
});
