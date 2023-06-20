import debounce from 'debounce';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useCallback, useEffect, useRef, useState } from 'react';

const DETAILS_CARD_DEFAULT_HEIGHT = 200;

export const useDetailsCard = () => {
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const [heightState, setHeightState] = useState(DETAILS_CARD_DEFAULT_HEIGHT);
  const [truncateState, setTruncateState] = useState<'NONE' | 'TRUNCATE' | 'FULL'>(
    () => 'TRUNCATE',
  );

  const toggleTruncateState = () =>
    setTruncateState(currentTruncateState =>
      currentTruncateState === 'TRUNCATE' ? 'FULL' : 'TRUNCATE',
    );
  useEffect(() => {
    if (truncateState === 'TRUNCATE') {
      setHeightState(DETAILS_CARD_DEFAULT_HEIGHT);
    } else {
      const newHeight = detailsCardRef.current?.getBoundingClientRect().height;
      if (newHeight !== undefined) {
        setHeightState(Math.max(DETAILS_CARD_DEFAULT_HEIGHT, newHeight));
      }
    }
  }, [truncateState, setHeightState]);

  useEffect(() => {
    if (
      detailsCardRef.current &&
      detailsCardRef.current.querySelector<HTMLElement>('.line-clamp-2')?.offsetHeight ===
        detailsCardRef.current.querySelector<HTMLElement>('.line-clamp-2')?.scrollHeight
    ) {
      setTruncateState('NONE');
    }
  }, []);

  const handleResize = useCallback(
    debounce(
      () => {
        setTruncateState(prevState => {
          if (detailsCardRef.current === null) {
            return prevState;
          }
          if (
            prevState === 'TRUNCATE' &&
            detailsCardRef.current.querySelector<HTMLElement>('.line-clamp-2')?.offsetHeight ===
              detailsCardRef.current.querySelector<HTMLElement>('.line-clamp-2')?.scrollHeight
          ) {
            return 'NONE';
          } else if (
            prevState === 'FULL' &&
            heightState >= detailsCardRef.current?.getBoundingClientRect().height
          ) {
            return 'NONE';
          } else if (
            (prevState === 'NONE' || prevState === 'FULL') &&
            heightState < detailsCardRef.current?.getBoundingClientRect().height
          ) {
            setHeightState(DETAILS_CARD_DEFAULT_HEIGHT);
            return 'TRUNCATE';
          }
          return prevState;
        });
      },
      1000,
      false,
    ),
    [setTruncateState, setHeightState, detailsCardRef],
  );

  useIsomorphicLayoutEffect(() => {
    global.addEventListener('resize', handleResize);
    return () => {
      global.removeEventListener('resize', handleResize);
    };
  }, []);

  return { truncateState, toggleTruncateState, heightState, detailsCardRef };
};
