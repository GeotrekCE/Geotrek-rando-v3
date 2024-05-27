import { FormattedMessage } from 'react-intl';
import Slider, { CustomArrowProps } from 'react-slick';
import { cn } from 'services/utils/cn';

interface BannerCarouselProps {
  picturesUrl: string[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ picturesUrl }) => {
  return (
    <div data-testid="carousel" id="banner_carousel">
      <Slider
        className="h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
        infinite
        nextArrow={<Arrow />}
        prevArrow={<Arrow isPrev />}
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

const Arrow = (props: CustomArrowProps & { isPrev?: boolean }) => {
  const { className, onClick, isPrev } = props;
  const disabledClass = className?.includes('slick-disabled');
  return (
    <button
      type="button"
      className={cn(
        '!py-20 !px-5 !h-full desktop:!py-40 desktop:!px-12 !flex justify-center items-end transition size-7 !opacity-100 z-10 desktop:before:!text-3xl textShadowOnImage',
        className,
        isPrev ? '!left-0' : '!right-0',
      )}
      onClick={onClick}
      disabled={disabledClass}
    >
      <span className="sr-only">
        {isPrev ? (
          <FormattedMessage id="carousel.prevImage" />
        ) : (
          <FormattedMessage id="carousel.nextImage" />
        )}
      </span>
    </button>
  );
};
