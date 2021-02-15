import Slider, { CustomArrowProps } from 'react-slick';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing, sizes } from 'stylesheet';
import { ActivityBadge } from '../ActivityBadge';

interface ResultCardCarouselProps {
  thumbnailUris: string[];
  iconUri: string;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  thumbnailUris,
  iconUri,
}) => {
  return (
    <div className="overflow-hidden h-auto w-full flex-shrink-0 desktop:w-resultCardDesktop">
      <StyledSlider
        dots
        infinite
        speed={500}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        appendDots={styledDotsStyledComponent}
        swipe={false}
      >
        {thumbnailUris.map((thumbnailUri, i) => (
          <div key={i} className="relative h-full">
            <img
              src={thumbnailUri}
              className="object-cover object-top overflow-hidden
              h-resultCardMobile w-full
              desktop:h-full"
            />
            <ActivityBadge iconUri={iconUri} className="absolute top-4 left-4" />
          </div>
        ))}
      </StyledSlider>
    </div>
  );
};

const StyledSlider = styled(Slider)`
  height: 100%;
  width: auto;
  .slick-container,
  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide {
    height: 100%;
  }
  .slick-slide > div {
    height: 100%;
  }
  ${desktopOnly(
    css`
      width: ${sizes.resultCardDesktop}px;
    `,
  )}
`;

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
  top: calc(100% - 24px);
  opacity: 0.75;
  transition-property: opacity;
  transition-duration: 300ms;
  &:hover {
    opacity: 1;
  }
  &::before {
    opacity: 1;
    text-shadow: 0 0 4px ${colorPalette.greyDarkColored};
  }
`;
const StyledRightArrow = styled(StyledArrow)`
  right: ${getSpacing(3)};
`;

const StyledLeftArrow = styled(StyledArrow)`
  left: ${getSpacing(3)};
`;

const styledDotsStyledComponent = (dots: JSX.Element) => (
  <StyledDots>
    <ul>{dots}</ul>
  </StyledDots>
);

const StyledDots = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  bottom: ${getSpacing(4)};
  padding: 0 ${getSpacing(8)};
  max-height: ${getSpacing(6)};
  color: white;
  & > ul > li {
    margin: 0;
  }
  & > ul > li.slick-active > button::before {
    color: white;
    opacity: 1;
    text-shadow: 0 0 4px ${colorPalette.greyDarkColored};
  }
  & > ul > li > button {
    padding: 2px;
  }
  & > ul > li > button::before {
    color: ${colorPalette.greySoft};
    opacity: 1;
    text-shadow: 0 0 4px ${colorPalette.greyDarkColored};
  }
`;
