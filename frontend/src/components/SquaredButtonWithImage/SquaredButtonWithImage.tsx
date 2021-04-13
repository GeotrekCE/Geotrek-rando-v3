import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

interface SquaredButtonWithImageProps {
  titleKey: string;
  imageUrl: string;
}

export const SquaredButtonWithImage: FunctionComponent<SquaredButtonWithImageProps> = ({
  imageUrl,
  titleKey,
}) => {
  return (
    <div className="h-12 w-12 relative overflow-hidden shadow-md rounded-medium border-2 border-solid border-white cursor-pointer">
      <img src={imageUrl} className="object-cover h-full w-full rounded-medium" />
      <span
        className="font-bold text-white text-CTA text-center w-full
      absolute bottom-1 z-text"
      >
        <FormattedMessage id={titleKey} />
      </span>
    </div>
  );
};
