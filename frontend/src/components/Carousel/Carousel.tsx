import { FormattedMessage } from 'react-intl';
import Slider, { CustomArrowProps } from 'react-slick';
import { cn } from 'services/utils/cn';

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
  className = '',
  children,
  nextArrow,
  prevArrow,
  dots,
}) => {
  if (Array.isArray(children) && children.length <= 1) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Slider
      lazyLoad="ondemand"
      className={cn('!h-full w-auto', className)}
      dots
      infinite
      speed={500}
      nextArrow={nextArrow}
      prevArrow={prevArrow}
      appendDots={dots}
    >
      {children}
    </Slider>
  );
};

export const SmallCarousel: React.FC<LargeOrSmallCarouselProps> = ({ children, className }) => {
  return (
    <Carousel
      className={className}
      nextArrow={<Arrow />}
      prevArrow={<Arrow isPrev />}
      dots={appendDots}
    >
      {children}
    </Carousel>
  );
};

export const LargeCarousel: React.FC<LargeOrSmallCarouselProps> = ({ children, className }) => {
  return (
    <Carousel
      className={className}
      nextArrow={<Arrow isLarge />}
      prevArrow={<Arrow isLarge isPrev />}
      dots={appendDots}
    >
      {children}
    </Carousel>
  );
};

const Arrow = (props: CustomArrowProps & { isPrev?: boolean; isLarge?: boolean }) => {
  const { className, onClick, isPrev, isLarge } = props;
  const disabledClass = className?.includes('slick-disabled');
  return (
    <button
      type="button"
      className={cn(
        '!h-full !p-5 !flex justify-center items-end transition size-7 opacity-75 hover:opacity-100 focus:opacity-100 before:!opacity-100 z-[301] textShadowOnImage',
        className,
        isPrev ? '!left-0' : '!right-0',
        isLarge && '!p-6 desktop:!p-8 desktop:before:!text-2xl',
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

const appendDots = (dots: JSX.Element) => (
  <>
    <ul className="slick-dots !bottom-5 z-[300] px-8 max-h-6 text-white">{dots}</ul>
  </>
);
