import { CardIcon } from 'components/CardIcon';
import { SmallCarousel } from 'components/Carousel';
import { ImageWithLegend } from 'components/ImageWithLegend';
import { ImageFromAttachment } from 'modules/interface';
import getActivityColor from '../getActivityColor';

interface ResultCardCarouselProps {
  type: 'TREK' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_CONTENT' | 'TOURISTIC_EVENT';
  images: ImageFromAttachment[];
  iconUri?: string;
  iconName: string;
  onClickImage?: () => void;
  asColumn?: boolean;

  redirect?: string;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  type,
  images,
  iconUri,
  iconName,
  onClickImage,
  redirect,
  asColumn,
}) => {
  const files = typeof navigator !== 'undefined' && navigator?.onLine ? images : images.slice(0, 1);

  return (
    <div
      className={`size-full grow relative ${
        asColumn !== true ? 'desktop:w-resultCardDesktop' : ''
      }`}
    >
      <SmallCarousel>
        {files.map((image, index) => (
          <ImageWithLegend
            image={image}
            key={index}
            loading="lazy"
            onClick={onClickImage}
            redirect={redirect}
          />
        ))}
      </SmallCarousel>
      <CardIcon iconUri={iconUri} iconName={iconName} color={getActivityColor(type)} />
    </div>
  );
};
