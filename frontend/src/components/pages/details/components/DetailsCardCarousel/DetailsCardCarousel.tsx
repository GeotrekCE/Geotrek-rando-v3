import { SmallCarousel } from 'components/Carousel';
import { CardSingleImage } from '../DetailsCard';

interface DetailsCardCarouselProps {
  thumbnailUris: string[];
  height: number;
}

export const DetailsCardCarousel: React.FC<DetailsCardCarouselProps> = ({
  thumbnailUris,
  height,
}) => {
  return (
    <SmallCarousel>
      {thumbnailUris.map((thumbnailUri, i) => (
        <CardSingleImage key={i} src={thumbnailUri} height={height} />
      ))}
    </SmallCarousel>
  );
};
