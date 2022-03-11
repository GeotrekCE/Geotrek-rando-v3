import { CardIcon } from 'components/CardIcon';
import { SmallCarousel } from 'components/Carousel';
import getConfig from 'next/config';
import getActivityColor from '../getActivityColor';

interface ResultCardCarouselProps {
  type: 'TREK' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_CONTENT' | 'TOURISTIC_EVENT';
  thumbnailUris: string[];
  iconUri?: string;
  iconName: string;
  onClickImage?: () => void;
  asColumn?: boolean;
}

export const ResultCardCarousel: React.FC<ResultCardCarouselProps> = ({
  type,
  thumbnailUris,
  iconUri,
  iconName,
  onClickImage,
  asColumn,
}) => {
  const {
    publicRuntimeConfig: { colors },
  } = getConfig();

  const files = navigator && navigator?.onLine ? thumbnailUris : thumbnailUris.slice(0, 1);

  return (
    <div
      className={`h-full w-full flex-shrink-0 relative desktop:w-resultCardDesktop`}
      style={asColumn ? { width: '100%' } : {}}
    >
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
      {iconUri !== undefined && (
        <CardIcon iconUri={iconUri} iconName={iconName} color={getActivityColor(type)} />
      )}
    </div>
  );
};
