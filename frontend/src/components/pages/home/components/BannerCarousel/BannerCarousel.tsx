import { LargeStyledArrow } from 'components/Carousel';
import Slider, { CustomArrowProps } from 'react-slick';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing } from 'stylesheet';

interface BannerCarouselProps {
  picturesUrl: string[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ picturesUrl }) => {
  return (
    <div data-testid="carousel" id="banner_carousel">
      <Slider
        className="h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
        infinite
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        swipe={false}
        autoplay
        speed={1000}
        autoplaySpeed={5000}
        pauseOnHover
      >
        {picturesUrl.map((pictureUrl, i) => (
          <img
            loading={i === 0 ? 'eager' : 'lazy'}
            src={pictureUrl}
            key={i}
            className="object-cover object-top overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
            alt=""
          />
        ))}
      </Slider>
    </div>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { className = '', onClick } = props;
  return <StyledLeftArrow className={className} onClick={onClick} type="button" />;
};

const NextArrow = (props: CustomArrowProps) => {
  const { className = '', onClick } = props;
  return <StyledRightArrow className={className} onClick={onClick} type="button" />;
};

const BannerStyledArrow = styled(LargeStyledArrow)`
  padding: ${getSpacing(20)} ${getSpacing(5)};
  opacity: 1;
  &::before {
    text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
    ${desktopOnly(
      css`
        font-size: 30px;
      `,
    )}
  }
  ${desktopOnly(
    css`
      padding: ${getSpacing(40)} ${getSpacing(12)};
    `,
  )}
`;

const StyledRightArrow = styled(BannerStyledArrow)`
  right: 0;
`;

const StyledLeftArrow = styled(BannerStyledArrow)`
  left: 0;
`;
