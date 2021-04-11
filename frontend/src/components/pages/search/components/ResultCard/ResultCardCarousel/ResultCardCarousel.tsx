import { SmallCarousel } from 'components/Carousel';
import { ActivityBadge } from '../ActivityBadge';

interface ResultCardCarouselProps {
  thumbnailUris: string[];
  iconUri: string;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  thumbnailUris,
  iconUri,
}) => {
  return (
    <div className="h-auto w-full flex-shrink-0 desktop:w-resultCardDesktop">
      <SmallCarousel>
        {thumbnailUris.map((thumbnailUri, i) => (
          <div key={i} className="relative h-full">
            <img
              src={thumbnailUri}
              className="object-cover object-top
              h-resultCardMobile w-full
              desktop:h-full"
            />
            <ActivityBadge iconUri={iconUri} className="absolute top-4 left-4" />
          </div>
        ))}
      </SmallCarousel>
    </div>
  );
};
