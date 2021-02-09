import Slider, { CustomArrowProps } from 'react-slick';
import styled from 'styled-components';
import { colorPalette, getSpacing } from 'stylesheet';
import { CardSingleImage } from '../DetailsCard';

interface DetailsCardCarouselProps {
  thumbnailUris: string[];
  height: number;
}

export const DetailsCardCarousel: React.FC<DetailsCardCarouselProps> = ({
  thumbnailUris,
  height,
}) => {
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
      {thumbnailUris.map((thumbnailUri, i) => (
        <CardSingleImage key={i} src={thumbnailUri} height={height} />
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
  top: calc(100% - 30px);
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
