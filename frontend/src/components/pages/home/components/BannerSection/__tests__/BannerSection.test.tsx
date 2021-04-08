import { render } from 'services/testing/reactTestingLibraryWrapper';
import { BannerSection } from '../BannerSection';

describe('BannerSection', () => {
  it('should well render with a video', () => {
    const component = render(<BannerSection shouldDisplayText videoUrl="test.mp4" />);
    const asset = component.queryByTestId('video');

    expect(asset).toBeTruthy();

    expect(component).toMatchSnapshot();
  });

  it('should well render with a carousel', () => {
    const component = render(
      <BannerSection shouldDisplayText carouselUrls={['test1.jpg', 'test2.jpg']} />,
    );
    const asset = component.queryByTestId('carousel');

    expect(asset).toBeTruthy();

    expect(component).toMatchSnapshot();
  });

  it('should well render with a single picture', () => {
    const component = render(<BannerSection shouldDisplayText pictureUrl="test0.jpg" />);
    const asset = component.queryByTestId('image');

    expect(asset).toBeTruthy();

    expect(component).toMatchSnapshot();
  });

  test.each`
    isTextDefined |
    ${true}
    ${false}
  `('should adapt text if shouldDisplayText is $isTextDefined', ({ isTextDefined }) => {
    const component = render(
      <BannerSection shouldDisplayText={isTextDefined} pictureUrl="image.jpg" />,
    );

    const foundText = component.queryByTestId('text');

    expect(!!foundText).toBe(isTextDefined);
  });
});
