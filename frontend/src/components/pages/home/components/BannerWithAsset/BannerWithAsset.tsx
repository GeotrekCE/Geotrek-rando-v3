import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { BannerCarousel } from '../BannerCarousel/BannerCarousel';

const WelcomeText = styled.span`
  text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
`;

interface BannerSectionProps {
  videoUrl?: string;
  carouselUrls?: string[];
  pictureUrl?: string;
  shouldDisplayText: boolean;
}

interface BannerSectionWithoutAssetProps {
  shouldDisplayText: boolean;
  children: React.ReactNode;
}

const Banner: React.FC<BannerSectionWithoutAssetProps> = ({ shouldDisplayText, children }) => (
  <div id="banner" className="relative">
    {children}
    {shouldDisplayText && (
      <WelcomeText
        data-testid="text"
        className="text-white font-bold text-Mobile-H1 desktop:text-H1 text-center desktop:leading-tight
        absolute flex items-center justify-center bottom-0 desktop:bottom-40 desktop:items-end top-0 left-10vw right-10vw"
      >
        <FormattedMessage id="home.welcome-text" />
      </WelcomeText>
    )}
  </div>
);

export const BannerWithAsset: React.FC<BannerSectionProps> = ({
  shouldDisplayText,
  videoUrl,
  carouselUrls,
  pictureUrl,
}) => {
  if (videoUrl !== undefined) {
    return (
      <Banner shouldDisplayText={shouldDisplayText}>
        <video
          id="banner-video"
          autoPlay
          muted
          loop
          src={videoUrl}
          className="object-cover object-center overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
          data-testid="video"
        />
      </Banner>
    );
  } else if (carouselUrls !== undefined) {
    return (
      <Banner shouldDisplayText={shouldDisplayText}>
        <BannerCarousel picturesUrl={carouselUrls} />
      </Banner>
    );
  } else if (pictureUrl !== undefined) {
    return (
      <Banner shouldDisplayText={shouldDisplayText}>
        <img
          id="banner-image"
          src={pictureUrl}
          className="object-cover object-top overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
          data-testid="image"
        />
      </Banner>
    );
  } else {
    return null;
  }
};
