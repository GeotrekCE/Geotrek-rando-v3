import { CardIcon } from 'components/CardIcon';
import { SmallCarousel } from 'components/Carousel';
import { ImageWithLegend } from 'components/ImageWithLegend';
import { ContentType, ImageFromAttachment } from 'modules/interface';

interface ResultCardCarouselProps {
  type: ContentType;
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
      <CardIcon iconUri={iconUri} iconName={iconName} type={type} />
    </div>
  );
};
