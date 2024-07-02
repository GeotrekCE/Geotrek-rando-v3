import { CardIcon } from 'components/CardIcon';
import { SmallCarousel } from 'components/Carousel';
import { ImageWithLegend } from 'components/ImageWithLegend';
import useHasMounted from 'hooks/useHasMounted';
import { ContentType, ImageFromAttachment } from 'modules/interface';
import { cn } from 'services/utils/cn';

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
  const hasNavigator = useHasMounted(typeof navigator !== 'undefined' && navigator.onLine);
  const files = hasNavigator ? images : images.slice(0, 1);

  return (
    <div
      className={cn('size-full grow relative', asColumn !== true && 'desktop:w-resultCardDesktop')}
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
