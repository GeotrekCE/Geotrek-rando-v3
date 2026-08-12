import { FormattedMessage } from 'react-intl';
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
  isClosed?: boolean;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  type,
  images,
  iconUri,
  iconName,
  onClickImage,
  redirect,
  asColumn,
  isClosed,
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

      {isClosed && (
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-white pointer-events-none gap-1">
          <span className="text-3xl">⛔</span>
          <span className="font-bold text-white text-sm uppercase tracking-wider">
            <FormattedMessage id="resultCard.closed" defaultMessage="Fermé" />
          </span>
        </div>
      )}

      <CardIcon iconUri={iconUri} iconName={iconName} type={type} />
    </div>
  );
};
