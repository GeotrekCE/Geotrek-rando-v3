import Slider, { CustomArrowProps } from 'react-slick';
import styled, { css } from 'styled-components';
import { colorPalette, desktopOnly, getSpacing } from 'stylesheet';
import { TrekChild } from 'modules/details/interface';
import { Link } from 'components/Link';
import { generateChildrenDetailsUrl } from '../../utils';

interface DetailsTrekFamilyCarouselProps {
  trekId: string;
  parentId: string;
  trekChildren: TrekChild[];
}

export const DetailsTrekFamilyCarousel: React.FC<DetailsTrekFamilyCarouselProps> = ({
  trekChildren,
  trekId,
  parentId,
}) => {
  const currentTrekChild = trekChildren.find(trek => trek.id === trekId);
  const initialSlideId = currentTrekChild ? Math.max(currentTrekChild.rank - 2, 0) : 0;
  return (
    <Slider
      speed={500}
      infinite={false}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      swipe={false}
      slidesToShow={3}
      slidesToScroll={2}
      initialSlide={initialSlideId}
      className="my-1.5 desktop:my-3 mx-7 desktop:mr-10 desktop:ml-8"
    >
      {trekChildren.map((trekChild, i) => (
        <div key={i} className="outline-none align-middle py-1">
          <Link href={generateChildrenDetailsUrl(trekChild.id, trekChild.name, parentId)}>
            <div
              className={`truncate px-2 desktop:px-4 py-2
              mx-2p desktop:mx-1.5
              text-P3 desktop:text-P1
              outline-none border border-solid rounded-full
              cursor-pointer hover:shadow-sm transition-all ${
                trekChild.id === trekId ? currentChildClassName : otherChildClassName
              }`}
            >
              <span>{`${trekChild.rank}. ${trekChild.name}`}</span>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

const otherChildClassName = 'border-greySoft text-primary3 bg-white';
const currentChildClassName = 'border-primary1 text-white bg-primary1';

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
  transition-property: opacity;
  transition-duration: 300ms;
  &:hover {
    opacity: 1;
  }
  &::before {
    content: '➜';
    opacity: 0.85;
    display: flex;
    justify-content: center;
    align-items: baseline;
    color: ${colorPalette.primary3};
    background-color: white;
    height: ${getSpacing(8)};
    width: ${getSpacing(8)};
    flex: none;
    border-radius: ${getSpacing(4)};
    border: 1px solid ${colorPalette.greySoft};
    font-size: ${getSpacing(6.5)};
    ${desktopOnly(css`
      font-size: 31px;
      height: 39px;
      width: 39px;
      border-radius: ${getSpacing(5)};
    `)}
  }
`;
const StyledRightArrow = styled(StyledArrow)`
  right: -${getSpacing(7)};
  ${desktopOnly(css`
    right: -${getSpacing(8)};
  `)}
`;

const StyledLeftArrow = styled(StyledArrow)`
  left: -${getSpacing(7)};
  &::before {
    left: -${getSpacing(11)};
    transform: rotate(180deg);
  }
`;
