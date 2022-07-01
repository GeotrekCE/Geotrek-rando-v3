import Slider, { CustomArrowProps } from 'react-slick';
import styled, { css } from 'styled-components';
import { desktopOnly, getSpacing } from 'stylesheet';

interface CarouselProps {
  className?: string;
  children: React.ReactNode;
  nextArrow: JSX.Element;
  prevArrow: JSX.Element;
  dots(dots: React.ReactNode): JSX.Element;
}

interface LargeOrSmallCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  className,
  children,
  nextArrow,
  prevArrow,
  dots,
}) => {
  if (Array.isArray(children) && children.length <= 1) {
    return <>{children}</>;
  }
  return (
    <StyledSlider
      lazyLoad="ondemand"
      className={className ?? ''}
      dots
      infinite
      speed={500}
      nextArrow={nextArrow}
      prevArrow={prevArrow}
      appendDots={dots}
    >
      {children}
    </StyledSlider>
  );
};

export const SmallCarousel: React.FC<LargeOrSmallCarouselProps> = ({ children, className }) => {
  return (
    <Carousel
      className={className}
      nextArrow={<SmallNextArrow />}
      prevArrow={<SmallPrevArrow />}
      dots={smallAppendDots}
    >
      {children}
    </Carousel>
  );
};

export const LargeCarousel: React.FC<LargeOrSmallCarouselProps> = ({ children, className }) => {
  return (
    <Carousel
      className={className}
      nextArrow={<LargeNextArrow />}
      prevArrow={<LargePrevArrow />}
      dots={largeAppendDots}
    >
      {children}
    </Carousel>
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
`;

const LargePrevArrow: React.FC<CustomArrowProps> = props => {
  const { className, onClick } = props;
  return <LargeStyledLeftArrow className={className} onClick={onClick} />;
};

const LargeNextArrow: React.FC<CustomArrowProps> = props => {
  const { className, onClick } = props;
  return <LargeStyledRightArrow className={className} onClick={onClick} />;
};

const SmallPrevArrow: React.FC<CustomArrowProps> = props => {
  const { className, onClick } = props;
  return <SmallStyledLeftArrow className={className} onClick={onClick} />;
};

const SmallNextArrow: React.FC<CustomArrowProps> = props => {
  const { className, onClick } = props;
  return <SmallStyledRightArrow className={className} onClick={onClick} />;
};

const StyledArrow = styled.div`
  z-index: 10;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: 0.75;
  transition-property: opacity;
  transition-duration: 500ms;
  &:hover {
    opacity: 1;
  }
  &::before {
    opacity: 1;
    text-shadow: 0 0 4px black;
  }
`;

const SmallStyledArrow = styled(StyledArrow)`
  padding: 20px;
`;

export const LargeStyledArrow = styled(StyledArrow)`
  padding: 30px;
  ${desktopOnly(
    css`
      opacity: 0.3;
      padding: 40px;
    `,
  )}
  &::before {
    font-size: 20px;
    ${desktopOnly(
      css`
        font-size: 24px;
      `,
    )}
  }
`;

const SmallStyledRightArrow = styled(SmallStyledArrow)`
  right: 0;
`;

const SmallStyledLeftArrow = styled(SmallStyledArrow)`
  left: 0;
`;

const LargeStyledRightArrow = styled(LargeStyledArrow)`
  right: 0;
`;

const LargeStyledLeftArrow = styled(LargeStyledArrow)`
  left: 0;
`;

const smallAppendDots = (dots: JSX.Element) => (
  <SmallStyledDots>
    <ul>{dots}</ul>
  </SmallStyledDots>
);

const largeAppendDots = (dots: JSX.Element) => (
  <LargeStyledDots>
    <ul>{dots}</ul>
  </LargeStyledDots>
);

const StyledDots = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  bottom: 22px;
  padding: 0 ${getSpacing(8)};
  max-height: ${getSpacing(6)};
  color: white;
  & > ul > li {
    margin: 0;
  }
  & > ul > li.slick-active > button::before {
    color: white;
    opacity: 1;
    text-shadow: 0 0 4px black;
  }
  & > ul > li > button {
    padding: 2px;
  }
  & > ul > li > button::before {
    color: white;
    opacity: 0.5;
    text-shadow: 0 0 4px black;
  }
`;

const SmallStyledDots = styled(StyledDots)``;

const LargeStyledDots = styled(StyledDots)``;
