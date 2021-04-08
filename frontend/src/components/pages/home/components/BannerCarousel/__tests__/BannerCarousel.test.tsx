import { render } from 'services/testing/reactTestingLibraryWrapper';
import { BannerCarousel } from '../BannerCarousel';
describe('BannerCarousel', () => {
  it('should render correctly', () => {
    const component = render(<BannerCarousel picturesUrl={['photoA.jpg', 'photoB.jpg']} />);

    expect(component).toMatchSnapshot();
  });
});
