import debounce from 'debounce';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { useCallback, useMemo, useRef, useState } from 'react';

const DETAILS_CARD_DEFAULT_HEIGHT = 220;

export const useDetailsCard = (hasMedia = false) => {
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const [truncateState, setTruncateState] = useState<'NONE' | 'TRUNCATE' | 'FULL'>(
    hasMedia ? 'TRUNCATE' : 'NONE',
  );

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
            const descriptionNode = detailsCardRef.current.querySelector<HTMLElement>(
              '.custo-result-card-description',
            );

            if (!descriptionNode) {
              return prevState;
            }

            if (prevState === 'TRUNCATE') {
              if (descriptionNode.offsetHeight <= descriptionNode.scrollHeight) {
                return 'NONE';
              }
            } else if (prevState === 'FULL') {
              if (
                DETAILS_CARD_DEFAULT_HEIGHT >= detailsCardRef.current.getBoundingClientRect().height
              ) {
                return 'NONE';
              } else {
                return 'TRUNCATE';
              }
            } else if (prevState === 'NONE') {
              if (
                DETAILS_CARD_DEFAULT_HEIGHT < detailsCardRef.current.getBoundingClientRect().height
              ) {
                return 'TRUNCATE';
              }
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
