import Slider, { CustomArrowProps } from 'react-slick';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing } from 'stylesheet';

interface BannerCarouselProps {
  picturesUrl: string[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ picturesUrl }) => {
  return (
    <div data-testid="carousel">
      <Slider
        className="h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
        infinite
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        swipe={false}
        autoplay
        speed={1000}
        autoplaySpeed={2500}
      >
        {picturesUrl.map((pictureUrl, i) => (
          <img
            src={pictureUrl}
            key={i}
            className="object-cover object-top overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
          />
        ))}
      </Slider>
    </div>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return <StyledLeftArrow className={className} onClick={onClick} />;
};

const NextArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props;
  return <StyledRightArrow className={className} onClick={onClick} />;
};

const StyledArrow = styled.div`
  z-index: 10;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: ${getSpacing(40)} ${getSpacing(5)};
  &::before {
    text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
    font-size: 20px;
    opacity: 1;
    ${desktopOnly(
      css`
        font-size: 30px;
      `,
    )}
  }
  ${desktopOnly(
    css`
      padding: ${getSpacing(45)} ${getSpacing(12)};
    `,
  )}
`;
const StyledRightArrow = styled(StyledArrow)`
  right: 0;
`;

const StyledLeftArrow = styled(StyledArrow)`
  left: 0;
`;
