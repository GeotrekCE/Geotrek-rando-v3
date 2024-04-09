import debounce from 'debounce';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useCallback, useMemo, useRef, useState } from 'react';

const DETAILS_CARD_DEFAULT_HEIGHT = 220;

export const useDetailsCard = (hasMedia = false) => {
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const [truncateState, setTruncateState] = useState<'NONE' | 'TRUNCATE' | 'FULL'>('TRUNCATE');

  const toggleTruncateState = () =>
    setTruncateState(currentTruncateState =>
      currentTruncateState === 'TRUNCATE' ? 'FULL' : 'TRUNCATE',
    );

  const debouncedResize = useMemo(
    () =>
      debounce(
        () => {
          setTruncateState(prevState => {
            if (detailsCardRef.current === null || hasMedia) {
              return prevState;
            }
            const descriptionNode =
              detailsCardRef.current.querySelector<HTMLElement>('.line-clamp-2');

            if (
              prevState === 'TRUNCATE' &&
              (!descriptionNode || descriptionNode.offsetHeight <= descriptionNode.scrollHeight)
            ) {
              return 'NONE';
            } else if (
              prevState === 'FULL' &&
              DETAILS_CARD_DEFAULT_HEIGHT >= detailsCardRef.current.getBoundingClientRect().height
            ) {
              return 'NONE';
            } else if (
              prevState !== 'TRUNCATE' &&
              DETAILS_CARD_DEFAULT_HEIGHT < detailsCardRef.current.getBoundingClientRect().height
            ) {
              return 'TRUNCATE';
            }
            return prevState;
          });
        },
        1000,
        false,
      ),
    [hasMedia],
  );

  const handleResize = useCallback(debouncedResize, [debouncedResize]);

  useIsomorphicLayoutEffect(() => {
    debouncedResize();
    global.addEventListener('resize', handleResize);
    return () => {
      global.removeEventListener('resize', handleResize);
    };
  }, [debouncedResize]);

  return { truncateState, toggleTruncateState, detailsCardRef };
};
