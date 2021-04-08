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

const BannerSectionWithoutAsset: React.FC<BannerSectionWithoutAssetProps> = ({
  shouldDisplayText,
  children,
}) => (
  <div className="relative">
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

export const BannerSection: React.FC<BannerSectionProps> = ({
  shouldDisplayText,
  videoUrl,
  carouselUrls,
  pictureUrl,
}) => {
  if (videoUrl !== undefined) {
    return (
      <BannerSectionWithoutAsset shouldDisplayText={shouldDisplayText}>
        <video
          autoPlay
          muted
          loop
          src={videoUrl}
          className="object-cover object-center overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
          data-testid="video"
        />
      </BannerSectionWithoutAsset>
    );
  } else if (carouselUrls !== undefined) {
    return (
      <BannerSectionWithoutAsset shouldDisplayText={shouldDisplayText}>
        <BannerCarousel picturesUrl={carouselUrls} />
      </BannerSectionWithoutAsset>
    );
  } else if (pictureUrl !== undefined) {
    return (
      <BannerSectionWithoutAsset shouldDisplayText={shouldDisplayText}>
        <img
          src={pictureUrl}
          className="object-cover object-top overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
          data-testid="image"
        />
      </BannerSectionWithoutAsset>
    );
  } else {
    return null;
  }
};
