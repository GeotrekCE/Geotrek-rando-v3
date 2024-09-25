import { ReactElement, useRef, useState } from 'react';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapButton } from 'components/Map/components/MapButton';
import { useIntl } from 'react-intl';
import { cn } from 'services/utils/cn';
import useFullscreen from 'hooks/useFullscreen';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ({
    isFullscreen,
    toggleFullscreen,
  }: {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
  }) => ReactElement;
};

export const Modal: React.FC<Props> = ({ className, children, ...props }) => {
  const intl = useIntl();

  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const isFullscreen = useFullscreen(ref, show, { onClose: () => setShow(false) });

  return (
    <div ref={ref} className={cn('relative bg-dark', className)} {...props}>
      {isFullscreen && (
        <MapButton
          aria-label={intl.formatMessage({ id: 'details.closeFullScreen' })}
          icon={<ArrowLeft size={24} />}
          onClick={() => setShow(boolean => !boolean)}
        />
      )}
      <div className="flex items-center justify-center size-full">
        <div className="size-full">
          {typeof children === 'function'
            ? children({
                isFullscreen: show,
                toggleFullscreen: () => setShow(boolean => !boolean),
              })
            : children}
        </div>
      </div>
    </div>
  );
};
