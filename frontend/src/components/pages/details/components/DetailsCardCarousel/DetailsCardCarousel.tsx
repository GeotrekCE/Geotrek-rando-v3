import { SmallCarousel } from 'components/Carousel';
import { Attachment } from '../../../../../modules/interface';
import { CardSingleImage } from '../DetailsCard';

interface DetailsCardCarouselProps {
  thumbnailUris: string[];
  height: number;
  onClickImage?: () => void;
}

const noop = (noop: any) => noop;

export const DetailsCardCarousel: React.FC<DetailsCardCarouselProps> = ({
  thumbnailUris,
  onClickImage = noop,
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
