import Slider, { CustomArrowProps } from 'react-slick';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing } from 'stylesheet';
import { Attachment } from 'modules/interface';

interface DetailsCoverCarouselProps {
  attachments: Attachment[];
}

export const DetailsCoverCarousel: React.FC<DetailsCoverCarouselProps> = ({ attachments }) => {
  return (
    <Slider
      className="relative h-coverDetailsMobile desktop:h-coverDetailsDesktop"
      dots
      infinite
      speed={500}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      appendDots={styledDotsStyledComponent}
      swipe={false}
    >
      {attachments.map((attachment, i) => (
        <ImageWithLegend attachment={attachment} key={i} />
      ))}
    </Slider>
  );
};

interface ImageWithLegendProps {
  attachment: Attachment;
}

export const ImageWithLegend: React.FC<ImageWithLegendProps> = ({ attachment }) => (
  <div className="relative">
    <Legend author={attachment.author} legend={attachment.legend} />
    <img
      src={attachment.url}
      className="object-cover object-top overflow-hidden h-coverDetailsMobile desktop:h-coverDetailsDesktop w-full"
    />
  </div>
);

interface LegendProps {
  author: string;
  legend: string;
}

const Legend: React.FC<LegendProps> = ({ author, legend }) => {
  const hasLegendOrAuthor =
    (legend !== null && legend.length > 0) || (author !== null && author.length > 0);
  const hasLegendAndAuthor =
    legend !== null && legend.length > 0 && author !== null && author.length > 0;
  const fullText = `${legend}${hasLegendAndAuthor ? ' - ' : ''}${author}`;
  if (hasLegendOrAuthor) {
    return (
      hasLegendOrAuthor && (
        <div
          className={`w-full text-center h-6 desktop:h-10 truncate
          absolute bottom-0 desktop:top-0
          bg-black bg-opacity-40
          text-white text-opacity-90 p-1 desktop:pt-3 text-Mobile-C3 desktop:text-P2`}
        >
          <span>{fullText}</span>
        </div>
      )
    );
  }
  return null;
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
  align-items: center;
  opacity: 0.75;
  padding: 0 ${getSpacing(5)};
  transition-property: opacity;
  transition-duration: 300ms;
  &:hover {
    opacity: 1;
  }
  &::before {
    text-shadow: 0 0 4px ${colorPalette.greyDarkColored};
    font-size: 20px;
    ${desktopOnly(
      css`
        font-size: 30px;
      `,
    )}
  }
  ${desktopOnly(
    css`
      padding: 0 ${getSpacing(8)};
    `,
  )}
`;
const StyledRightArrow = styled(StyledArrow)`
  right: 0;
`;

const StyledLeftArrow = styled(StyledArrow)`
  left: 0;
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
  bottom: ${getSpacing(6)};
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
  ${desktopOnly(
    css`
      bottom: ${getSpacing(8)};
      padding: 0 ${getSpacing(50)};
    `,
  )}
`;
