import Slider, { CustomArrowProps } from 'react-slick';
import { TrekChild } from 'modules/details/interface';
import { Link } from 'components/Link';
import { cn } from 'services/utils/cn';
import { FormattedMessage } from 'react-intl';
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
      prevArrow={<Arrow isPrev />}
      nextArrow={<Arrow />}
      swipe={false}
      slidesToShow={3}
      slidesToScroll={2}
      initialSlide={initialSlideId}
      className="my-1.5 !flex items-center desktop:my-3"
    >
      {trekChildren.map((trekChild, index) => (
        <Link
          key={index}
          href={generateChildrenDetailsUrl(trekChild.id, trekChild.name, parentId)}
          className={cn(
            `my-1 block truncate px-2 desktop:px-4 py-2
              mx-2p desktop:mx-1.5
              text-P3 desktop:text-P1
              border border-solid rounded-full
              hover:shadow-sm focus:shadow-sm`,
            trekChild.id === trekId
              ? 'border-primary1 !text-white bg-primary1'
              : 'border-greySoft text-primary3 bg-white',
          )}
        >
          {trekChild.rank}. {trekChild.name}
        </Link>
      ))}
    </Slider>
  );
};

const Arrow = (props: CustomArrowProps & { isPrev?: boolean }) => {
  const { className, onClick, isPrev } = props;
  const disabledClass = className?.includes('slick-disabled');
  return (
    <button
      type="button"
      className="flex justify-center items-center transition size-7 disabled:opacity-50"
      onClick={onClick}
      disabled={disabledClass}
    >
      <span
        className={cn('text-primary3 text-2xl desktop:text-3xl', isPrev && '-scale-x-100')}
        aria-hidden
      >
        ➜
      </span>
      <span className="sr-only">
        {isPrev ? (
          <FormattedMessage id="map.drawer.prev" />
        ) : (
          <FormattedMessage id="map.drawer.next" />
        )}
      </span>
    </button>
  );
};
