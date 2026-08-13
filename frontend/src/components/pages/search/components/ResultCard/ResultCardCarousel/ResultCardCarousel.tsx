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
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-white pointer-events-none gap-2">
          <svg
            width="64"
            height="64"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0 size-12 desktop:size-16"
          >
            <circle cx="18" cy="18" r="17" fill="var(--color-vigilance-closed)"></circle>
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="var(--color-vigilance-closed)"
              stroke="white"
              strokeWidth="1.5"
            ></circle>
            <rect x="7" y="15" width="22" height="6" rx="3" fill="white"></rect>
          </svg>
          <span className="font-bold text-white text-xs desktop:text-sm uppercase tracking-wider">
            <FormattedMessage id="resultCard.closed" defaultMessage="Fermé" />
          </span>
        </div>
      )}

      <CardIcon iconUri={iconUri} iconName={iconName} type={type} />
    </div>
  );
};
