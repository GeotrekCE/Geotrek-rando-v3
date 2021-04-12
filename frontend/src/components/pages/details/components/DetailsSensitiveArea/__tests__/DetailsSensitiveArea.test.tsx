import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsSensitiveArea } from '../DetailsSensitiveArea';
describe('DetailsSensitiveArea', () => {
  it('should display a DetailsSensitiveArea', () => {
    const component = render(<DetailsSensitiveArea name="Zone sensible de test" />);

    expect(component).toMatchSnapshot();
  });
});
