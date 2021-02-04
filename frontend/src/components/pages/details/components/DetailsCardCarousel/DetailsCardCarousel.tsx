import Slider, { CustomArrowProps } from 'react-slick';
import styled from 'styled-components';
import { colorPalette, getSpacing } from 'stylesheet';

interface DetailsCardCarouselProps {
  thumbnailUris: string[];
  height: number;
}

export const DetailsCardCarousel: React.FC<DetailsCardCarouselProps> = ({
  thumbnailUris,
  height,
}) => {
  const thumbnailUrisShort = thumbnailUris.length > 8 ? thumbnailUris.slice(0, 8) : thumbnailUris;
  return (
    <Slider
      dots
      infinite
      speed={500}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      appendDots={styledDotsStyledComponent}
      swipe={false}
    >
      {thumbnailUrisShort.map((thumbnailUri, i) => (
        <img key={i} src={thumbnailUri} className={`object-cover object-center h-${height}`} />
      ))}
    </Slider>
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
  top: 85%;
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
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  bottom: ${getSpacing(5)};
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
