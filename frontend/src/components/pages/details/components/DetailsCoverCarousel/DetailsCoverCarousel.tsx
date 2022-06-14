import { Attachment } from 'modules/interface';
import { LargeCarousel } from 'components/Carousel';

interface DetailsCoverCarouselProps {
  attachments: Attachment[];
  onClickImage?: () => void;
}

export const DetailsCoverCarousel: React.FC<DetailsCoverCarouselProps> = ({
  attachments,
  onClickImage,
}) => {
  const files =
    typeof navigator !== 'undefined' && navigator?.onLine ? attachments : attachments.slice(0, 1);

  return (
    <LargeCarousel className="relative h-coverDetailsMobile desktop:h-coverDetailsDesktop">
      {files.map((attachment, i) => (
        <ImageWithLegend attachment={attachment} key={i} onClick={onClickImage} />
      ))}
    </LargeCarousel>
  );
};

interface ImageWithLegendProps {
  attachment: Attachment;
  onClick?: () => void;
}

export const ImageWithLegend: React.FC<ImageWithLegendProps> = ({ attachment, onClick }) => (
  <div
    id="details_cover_image"
    style={{ cursor: onClick ? 'pointer' : 'initial' }}
    className="relative"
    onClick={onClick}
  >
    <Legend author={attachment.author} legend={attachment.legend} />
    <img src={attachment.url} className="object-cover object-top overflow-hidden w-full h-full" />
  </div>
);

interface LegendProps {
  author: string;
  legend: string;
}

const Legend: React.FC<LegendProps> = ({ author, legend }) => {
  const hasLegendOrAuthor =
    (legend !== null && legend.length > 0) || (author !== null && author.length > 0);
  const hasLegendAndAuthor =
    legend !== null && legend.length > 0 && author !== null && author.length > 0;
  const fullText = `${legend}${hasLegendAndAuthor ? ' - ' : ''}${author}`;
  if (hasLegendOrAuthor) {
    return (
      hasLegendOrAuthor && (
        <div
          className={`w-full h-12 desktop:h-40
          absolute top-0 flex items-start justify-center
          py-1 px-2 pt-3 px-10
          bg-gradient-to-b from-blackSemiTransparent to-transparent
          text-white text-opacity-90 text-Mobile-C3 desktop:text-P2`}
        >
          <span className="mx-15 truncate">{fullText}</span>
        </div>
      )
    );
  }
  return null;
};
