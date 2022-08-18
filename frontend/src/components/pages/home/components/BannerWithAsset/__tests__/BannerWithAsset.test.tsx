import { render } from 'services/testing/reactTestingLibraryWrapper';
import { BannerWithAsset } from '../BannerWithAsset';

// CF https://github.com/testing-library/react-testing-library/issues/470
Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
  set: () => true,
});

describe('BannerWithAsset', () => {
  it('should well render with a video', () => {
    const component = render(<BannerWithAsset shouldDisplayText videoUrl="test.mp4" />);
    const asset = component.queryByTestId('video');

    expect(asset).toBeInTheDocument();

    expect(component).toMatchSnapshot();
  });

  it('should well render with a carousel', () => {
    const component = render(
      <BannerWithAsset shouldDisplayText carouselUrls={['test1.jpg', 'test2.jpg']} />,
    );
    const asset = component.queryByTestId('carousel');

    expect(asset).toBeInTheDocument();

    expect(component).toMatchSnapshot();
  });

  it('should well render with a single picture', () => {
    const component = render(<BannerWithAsset shouldDisplayText pictureUrl="test0.jpg" />);
    const asset = component.queryByTestId('image');

    expect(asset).toBeInTheDocument();

    expect(component).toMatchSnapshot();
  });

  test.each([true, false])('should adapt text if shouldDisplayText is %p', actual => {
    const component = render(<BannerWithAsset shouldDisplayText={actual} pictureUrl="image.jpg" />);

    const foundText = component.queryByTestId('text');

    expect(!!foundText).toBe(actual);
  });
});
