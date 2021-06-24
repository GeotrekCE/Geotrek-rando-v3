import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import ReactFullscreen from 'react-easyfullscreen';

import { ArrowLeft } from 'components/Icons/ArrowLeft';
import { MapButton } from 'components/Map/components/MapButton';

type Props = {
  children: ({
    isFullscreen,
    toggleFullscreen,
  }: {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
  }) => any | ReactElement<any>;
};

export const Modal: React.FC<Props> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handler = useCallback(() => setIsFullscreen(!isFullscreen), [isFullscreen]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handler);

    return () => document.removeEventListener('fullscreenchange', handler);
  }, [handler]);

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
