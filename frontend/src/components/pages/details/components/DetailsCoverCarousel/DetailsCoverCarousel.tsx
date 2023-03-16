import { twMerge } from 'tailwind-merge';
import { Attachment } from 'modules/interface';
import { LargeCarousel } from 'components/Carousel';
import { ImageWithLegend } from 'components/ImageWithLegend';

interface DetailsCoverCarouselProps {
  attachments: Attachment[];

  classNameImage?: string;
  onClickImage?: () => void;

  redirect?: string;
}

export const DetailsCoverCarousel: React.FC<DetailsCoverCarouselProps> = ({
  attachments,
  redirect,
  classNameImage = '',
  onClickImage,
}) => {
  const files =
    typeof navigator !== 'undefined' && navigator?.onLine ? attachments : attachments.slice(0, 1);

  return (
    <LargeCarousel className="relative h-coverDetailsMobile desktop:h-coverDetailsDesktop">
      {files.map((attachment, index) => (
        <ImageWithLegend
          attachment={attachment}
          classNameImage={twMerge('object-cover', classNameImage)}
          key={index}
          loading="lazy"
          onClick={onClickImage}
          redirect={redirect}
        />
      ))}
    </LargeCarousel>
  );
};
