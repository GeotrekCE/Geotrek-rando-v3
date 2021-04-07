import { render } from 'services/testing/reactTestingLibraryWrapper';
import { BannerSection } from '../BannerSection';
describe('BannerSection', () => {
  it('should render correctly', () => {
    const component = render(<BannerSection shouldDisplayText backgroundSourceUrl={'test.jpg'} />);

    expect(component).toMatchSnapshot();
  });

  test.each`
    isTextDefined |
    ${true}
    ${false}
  `('should adapt text if shouldDisplayText is $isTextDefined', ({ isTextDefined }) => {
    const component = render(
      <BannerSection shouldDisplayText={isTextDefined} backgroundSourceUrl={'test.jpg'} />,
    );

    const foundText = component.queryByTestId('text');

    expect(!!foundText).toBe(isTextDefined);
  });
});
