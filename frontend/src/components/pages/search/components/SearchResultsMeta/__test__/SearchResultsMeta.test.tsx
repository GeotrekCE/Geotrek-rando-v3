import { render } from 'services/testing/reactTestingLibraryWrapper';

import { SearchResultsMeta } from '../SearchResultsMeta';

describe('AAU, I can see informations on my search', () => {
  it('with 0 results', () => {
    const component = render(<SearchResultsMeta resultsNumber={0} />);
    expect(component).toMatchSnapshot();
  });

  it('with 1 result', () => {
    const component = render(<SearchResultsMeta resultsNumber={1} />);
    expect(component).toMatchSnapshot();
  });

  it('with many results', () => {
    const component = render(<SearchResultsMeta resultsNumber={123} />);
    expect(component).toMatchSnapshot();
  });
});
