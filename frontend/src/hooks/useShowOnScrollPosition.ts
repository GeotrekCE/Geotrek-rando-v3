import { useEffect, useState } from 'react';

export type Display = 'DISPLAYED' | 'HIDDEN';

/**
 * Returns "DISPLAYED" if the scroll position is above minScrollPosition, "HIDDEN" otherwise
 */
export const useShowOnScrollPosition = (minScrollPosition: number): Display => {
  let previousPosition = 0;
  // Necessary to avoid errors with Nextjs
  if (typeof window !== 'undefined') {
    previousPosition = window.scrollY;
  }
  const [displayState, setDisplayState] = useState<Display>(
    previousPosition > minScrollPosition ? 'DISPLAYED' : 'HIDDEN',
  );

  const handleScrolling = () => {
    const currentPosition = window.scrollY;
    if (currentPosition > minScrollPosition && previousPosition <= minScrollPosition) {
      setDisplayState('DISPLAYED');
    } else if (currentPosition <= minScrollPosition && previousPosition > minScrollPosition) {
      setDisplayState('HIDDEN');
    }
    previousPosition = currentPosition;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, []);

  return displayState;
};
