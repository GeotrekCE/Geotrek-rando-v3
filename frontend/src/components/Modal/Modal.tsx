import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import ReactFullscreen from 'react-easyfullscreen';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapButton } from 'components/Map/components/MapButton';
import ConditionallyRender from 'components/ConditionallyRender';
import useHasMounted from 'hooks/useHasMounted';

type Props = {
  children: ({
    isFullscreen,
    toggleFullscreen,
  }: {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
  }) => any | ReactElement<any>;
};

const Inner: React.FC<Props> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handler = useCallback(() => setIsFullscreen(!isFullscreen), [isFullscreen]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handler);

    return () => document.removeEventListener('fullscreenchange', handler);
  }, [handler]);

  const iOSiPadOS = useHasMounted(
    typeof navigator !== 'undefined' &&
      (/^iP/.test(navigator.platform) ||
        (/^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4)),
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  // iOS doesn't support fullscreen API. We must disable the fullscreen mode in IOS to prevent javascript error in react-easyfullscreen
  if (iOSiPadOS)
    return typeof children === 'function'
      ? children({ isFullscreen: false, toggleFullscreen: noop })
      : children;

  return (
    <ReactFullscreen>
      {({ ref, onToggle }) => {
        return (
          <div
            // @ts-ignore Wrong type in the lib
            ref={ref}
            style={{
              backgroundColor: 'white',
              position: 'relative',
            }}
          >
            {isFullscreen && <MapButton icon={<ArrowLeft size={24} />} onClick={onToggle} />}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <div style={{ width: '100%', height: '100%' }}>
                {typeof children === 'function'
                  ? children({ isFullscreen, toggleFullscreen: onToggle })
                  : children}
              </div>
            </div>
          </div>
        );
      }}
    </ReactFullscreen>
  );
};

export const Modal: React.FC<Props> = props => {
  return (
    <ConditionallyRender client>
      <Inner {...props} />
    </ConditionallyRender>
  );
};
