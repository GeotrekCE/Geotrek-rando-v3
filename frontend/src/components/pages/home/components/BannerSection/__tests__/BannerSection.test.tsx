import { render } from 'services/testing/reactTestingLibraryWrapper';
import { BannerSection } from '../BannerSection';
describe('BannerSection', () => {
  test.each`
    type       | backgroundSourceUrl
    ${'image'} | ${'test.jpg'}
    ${'video'} | ${'test.mp4'}
  `('should render correctly with a type $type', ({ type, backgroundSourceUrl }) => {
    const component = render(
      <BannerSection shouldDisplayText backgroundSourceUrl={backgroundSourceUrl} type={type} />,
    );

    expect(component).toMatchSnapshot();
  });

  test.each`
    type       |
    ${'image'}
    ${'video'}
  `('should display an $type if type is $type', ({ type }) => {
    const component = render(
      <BannerSection shouldDisplayText backgroundSourceUrl={'test.jpg'} type={type} />,
    );

    const image = component.queryByTestId(type);

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
