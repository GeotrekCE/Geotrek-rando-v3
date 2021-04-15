import { SmallCarousel } from 'components/Carousel';
import { CardIcon } from 'components/CardIcon';

interface ResultCardCarouselProps {
  thumbnailUris: string[];
  iconUri?: string;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  thumbnailUris,
  iconUri,
}) => {
  return (
    <div className="h-auto w-full flex-shrink-0 desktop:w-resultCardDesktop relative">
      <SmallCarousel>
        {thumbnailUris.map((thumbnailUri, i) => (
          <div key={i} className="relative h-full">
            <img
              src={thumbnailUri}
              className="object-cover object-top
              h-resultCardMobile w-full
              desktop:h-full"
            />
          </div>
        ))}
      </SmallCarousel>
      {iconUri !== undefined && <CardIcon iconUri={iconUri} />}
    </div>
  );
};
