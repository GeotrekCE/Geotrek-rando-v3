import { render } from '../../../services/testing/reactTestingLibraryWrapper';
import { Header } from '..';

describe('Header', () => {
  it('EEU I see header in mobile version', () => {
    const component = render(<Header logoPath="./logo.png" />);
    expect(component).toMatchSnapshot();
  });
});
