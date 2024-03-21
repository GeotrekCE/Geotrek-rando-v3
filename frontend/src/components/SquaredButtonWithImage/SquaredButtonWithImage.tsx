import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

interface SquaredButtonWithImageProps {
  titleKey: string;
  imageUrl: string;
}

export const SquaredButtonWithImage: React.FC<SquaredButtonWithImageProps> = ({
  imageUrl,
  titleKey,
}) => {
  return (
    <div className="size-12 relative overflow-hidden shadow-md rounded-medium border-2 border-solid border-white">
      <Image
        loading="lazy"
        src={imageUrl}
        className="object-cover size-full rounded-medium"
        width={44}
        height={44}
        alt=""
      />
      <span
        className="font-bold text-white text-CTA text-center w-full
      absolute bottom-1 left-0 right-0 z-text"
      >
        <FormattedMessage id={titleKey} />
      </span>
    </div>
  );
};
