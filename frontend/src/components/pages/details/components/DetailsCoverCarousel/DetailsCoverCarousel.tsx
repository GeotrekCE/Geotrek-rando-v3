import { cn } from 'services/utils/cn';
import { ImageFromAttachment } from 'modules/interface';
import { LargeCarousel } from 'components/Carousel';
import { ImageWithLegend } from 'components/ImageWithLegend';

interface DetailsCoverCarouselProps {
  images: ImageFromAttachment[];

  classNameImage?: string;
  onClickImage?: () => void;

  redirect?: string;
}

export const DetailsCoverCarousel: React.FC<DetailsCoverCarouselProps> = ({
  images,
  redirect,
  classNameImage = '',
  onClickImage,
}) => {
  const files = typeof navigator !== 'undefined' && navigator?.onLine ? images : images.slice(0, 1);

  return (
    <LargeCarousel className="relative h-coverDetailsMobile desktop:h-coverDetailsDesktop">
      {files.map((image, index) => (
        <ImageWithLegend
          image={image}
          classNameImage={cn(`object-cover ${classNameImage}`)}
          key={index}
          loading="lazy"
          onClick={onClickImage}
          redirect={redirect}
        />
      ))}
    </LargeCarousel>
  );
};
