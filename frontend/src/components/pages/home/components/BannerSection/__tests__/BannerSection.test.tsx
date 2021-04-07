import { render } from 'services/testing/reactTestingLibraryWrapper';
import { BannerSection } from '../BannerSection';
describe('BannerSection', () => {
  it('should render correctly', () => {
    const component = render(
      <BannerSection shouldDisplayText backgroundSourceUrl={'test.jpg'} type="image" />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should display an image if type is image', () => {
    const component = render(
      <BannerSection shouldDisplayText backgroundSourceUrl={'test.jpg'} type="image" />,
    );

    const image = component.queryByTestId('image');

    expect(image).toBeTruthy();
  });

  test.each`
    isTextDefined |
    ${true}
    ${false}
  `('should adapt text if shouldDisplayText is $isTextDefined', ({ isTextDefined }) => {
    const component = render(
      <BannerSection
        shouldDisplayText={isTextDefined}
        backgroundSourceUrl={'test.jpg'}
        type="image"
      />,
    );

    const foundText = component.queryByTestId('text');

    expect(!!foundText).toBe(isTextDefined);
  });
});
