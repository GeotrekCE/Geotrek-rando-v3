import { RefObject, useState } from 'react';
import screenfull from 'screenfull';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export interface FullScreenOptions {
  video?: RefObject<
    HTMLVideoElement & {
      webkitEnterFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => Promise<void>;
    }
  >;
  onClose?: (error?: Error) => void;
}

const useFullscreen = (
  ref: RefObject<Element>,
  enabled: boolean,
  options: FullScreenOptions = {},
): boolean => {
  const { video, onClose = () => {} } = options;
  const [isFullscreen, setIsFullscreen] = useState(enabled);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (!ref.current) {
      return;
    }

    const onWebkitEndFullscreen = () => {
      if (video?.current && video.current.webkitEnterFullscreen) {
        video.current.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
      }
      onClose();
    };

    const onChange = () => {
      if (screenfull.isEnabled) {
        const isScreenfullFullscreen = screenfull.isFullscreen;
        setIsFullscreen(isScreenfullFullscreen);
        if (!isScreenfullFullscreen) {
          onClose();
        }
      }
    };

    if (screenfull.isEnabled) {
      try {
        void screenfull.request(ref.current);
        setIsFullscreen(true);
      } catch (error) {
        onClose(error as Error);
        setIsFullscreen(false);
      }
      screenfull.on('change', onChange);
    } else if (video?.current && video.current.webkitEnterFullscreen) {
      void video.current.webkitEnterFullscreen();
      video.current.addEventListener('webkitendfullscreen', onWebkitEndFullscreen);
      setIsFullscreen(true);
    } else {
      onClose();
      setIsFullscreen(false);
    }

    return () => {
      setIsFullscreen(false);
      if (screenfull.isEnabled) {
        try {
          screenfull.off('change', onChange);
          void screenfull.exit();
        } catch {
          /* empty */
        }
      } else if (video?.current && video.current.webkitExitFullscreen) {
        video.current.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
        void video.current.webkitExitFullscreen();
      }
    };
  }, [enabled, video, ref]);

  return isFullscreen;
};

export default useFullscreen;
