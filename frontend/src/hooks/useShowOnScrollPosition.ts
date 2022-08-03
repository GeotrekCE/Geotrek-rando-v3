import { useCallback, useEffect, useRef, useState } from 'react';

export type Display = 'DISPLAYED' | 'HIDDEN';

/**
 * Returns "DISPLAYED" if the scroll position is above minScrollPosition, "HIDDEN" otherwise
 */
export const useShowOnScrollPosition = (minScrollPosition: number): Display => {
  const previousPosition = useRef(0);
  // Necessary to avoid errors with Nextjs
  if (typeof window !== 'undefined') {
    previousPosition.current = window.scrollY;
  }
  const [displayState, setDisplayState] = useState<Display>(
    previousPosition.current > minScrollPosition ? 'DISPLAYED' : 'HIDDEN',
  );

  const handleScrolling = useCallback(() => {
    const currentPosition = window.scrollY;
    if (currentPosition > minScrollPosition && previousPosition.current <= minScrollPosition) {
      setDisplayState('DISPLAYED');
    } else if (
      currentPosition <= minScrollPosition &&
      previousPosition.current > minScrollPosition
    ) {
      setDisplayState('HIDDEN');
    }
    previousPosition.current = currentPosition;
  }, [minScrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, [handleScrolling]);

  return displayState;
};
