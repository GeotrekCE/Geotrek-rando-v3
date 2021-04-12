import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsTrekParentButton } from '../DetailsTrekParentButton';
describe('DetailsTrekParentButton', () => {
  it('should display a DetailsTrekParentButton', () => {
    const component = render(
      <DetailsTrekParentButton parentId={'1'} parentName="Test rando mère" />,
    );

    expect(component).toMatchSnapshot();
  });
});
