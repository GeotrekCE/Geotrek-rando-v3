import { SmallCarousel } from 'components/Carousel';
import { CardSingleImage } from '../DetailsCard';

interface DetailsCardCarouselProps {
  thumbnailUris: string[];
  height: number;
  onClickImage?: () => void;
}

export const DetailsCardCarousel: React.FC<DetailsCardCarouselProps> = ({
  thumbnailUris,
  onClickImage,
  height,
}) => {
  return (
    <SmallCarousel>
      {thumbnailUris.map((thumbnailUri, i) => (
        <CardSingleImage key={i} src={thumbnailUri} height={height} onClick={onClickImage} />
      ))}
    </SmallCarousel>
  );
};
