import { ImageFromAttachment } from 'modules/interface';
import { FormattedMessage } from 'react-intl';
import { cn } from 'services/utils/cn';
import { ImgHTMLAttributes, useId } from 'react';
import Link from 'next/link';
import { getGlobalConfig } from 'modules/utils/api.config';

interface ImageWithLegendProps {
  image?: ImageFromAttachment;
  className?: string;
  classNameImage?: string;

  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  onClick?: () => void;
  redirect?: string;
}

export const ImageWithLegend: React.FC<ImageWithLegendProps> = ({
  image,
  className = '',
  classNameImage = '',
  loading,
  onClick,
  redirect,
}) => {
  const figureId = useId();
  const imageId = useId();
  const legend = [image?.legend, image?.author].filter(Boolean).join(' - ');
  return (
    <Figure
      id="details_cover_image"
      labelledby={figureId}
      legend={legend}
      className={`relative ${className}`}
    >
      <img
        alt={image?.legend ?? ''}
        className={cn(`object-cover object-center overflow-hidden size-full ${classNameImage}`)}
        id={imageId}
        loading={loading ?? 'eager'}
        src={image?.url ? image.url : getGlobalConfig().fallbackImageUri}
      />
      <Legend
        figureId={figureId}
        imageId={imageId}
        legend={legend}
        onClick={onClick}
        redirect={redirect}
      />
    </Figure>
  );
};

interface FigureProps {
  children: React.ReactNode;
  className: string;
  id: string;
  labelledby: string;
  legend: string;
}

const Figure: React.FC<FigureProps> = ({ labelledby, legend, ...props }) => {
  if (!legend) {
    return <div {...props} />;
  }
  return <figure role="figure" aria-labelledby={labelledby} {...props} />;
};

interface LegendProps {
  figureId: string;
  imageId: string;
  legend: string;
  onClick?: () => void;
  redirect?: string;
}

const Legend: React.FC<LegendProps> = ({ figureId, imageId, legend, onClick, redirect }) => {
  if (legend.length === 0) {
    if (redirect !== undefined) {
      return <Link className="absolute inset-0" href={redirect} />;
    }
    return onClick ? <Button imageId={imageId} onClick={onClick} /> : null;
  }

  const className = `w-full h-12 desktop:h-40
  absolute top-0 flex items-start justify-center
  pb-1 pt-3 px-2
  bg-gradient-to-b from-blackSemiTransparent to-transparent
  text-white text-opacity-90 text-Mobile-C3 desktop:text-P2`;

  return (
    <figcaption id={figureId}>
      {redirect !== undefined ? (
        <Link className="absolute inset-0" href={redirect}>
          <span className={className}>
            <span className="mx-10percent px-10percent truncate">{legend}</span>
          </span>
        </Link>
      ) : (
        <span className={className}>
          <span className="mx-10percent px-10percent truncate">{legend}</span>
        </span>
      )}
      {onClick && <Button imageId={imageId} onClick={onClick} />}
    </figcaption>
  );
};

interface ButtonProps {
  imageId: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ imageId, onClick }) => {
  return (
    <button
      aria-describedby={imageId}
      className="absolute inset-0 size-full"
      onClick={onClick}
      type="button"
    >
      <span className="sr-only">
        <FormattedMessage id="details.openPictureInFullScreen" />
      </span>
    </button>
  );
};

export default ImageWithLegend;
