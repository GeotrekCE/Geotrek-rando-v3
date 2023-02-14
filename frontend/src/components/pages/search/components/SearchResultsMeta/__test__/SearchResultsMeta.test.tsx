import { render } from 'services/testing/reactTestingLibraryWrapper';

import { SearchResultsMeta } from '../SearchResultsMeta';

it('AAU, I can see informations on my search', () => {
  const component = render(<SearchResultsMeta textContent="XX results" />);
  expect(component).toMatchSnapshot();
});
