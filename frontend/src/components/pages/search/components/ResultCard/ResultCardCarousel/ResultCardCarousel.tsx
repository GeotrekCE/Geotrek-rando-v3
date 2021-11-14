import { SmallCarousel } from 'components/Carousel';
import { CardIcon } from 'components/CardIcon';

interface ResultCardCarouselProps {
  thumbnailUris: string[];
  iconUri?: string;
  onClickImage?: () => void;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  thumbnailUris,
  iconUri,
  onClickImage,
}) => {
  const files = navigator && navigator?.onLine ? thumbnailUris : thumbnailUris.slice(0, 1);

  return (
    <div className="h-full w-full flex-shrink-0 desktop:w-resultCardDesktop relative ">
      <SmallCarousel>
        {files.map((thumbnailUri, i) => (
          <div key={i} className="relative h-full" onClick={onClickImage}>
            <img
              src={thumbnailUri}
              className="object-cover object-top
              w-full
              h-full"
            />
          </div>
        ))}
      </SmallCarousel>
      {iconUri !== undefined && <CardIcon iconUri={iconUri} />}
    </div>
  );
};
