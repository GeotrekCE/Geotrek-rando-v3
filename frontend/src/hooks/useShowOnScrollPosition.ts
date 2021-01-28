import { useEffect, useState } from 'react';

export type Display = 'DISPLAYED' | 'HIDDEN';

/**
 * Returns "DISPLAYED" if the scroll position is above minScrollPosition, "HIDDEN" otherwise
 */
export const useShowOnScrollPosition = (minScrollPosition: number): Display => {
  let initialPosition = 0;
  // Necessary to avoid errors with Nextjs
  if (typeof window !== 'undefined') {
    initialPosition = window.scrollY;
  }
  const [displayState, setDisplayState] = useState<Display>(
    initialPosition > minScrollPosition ? 'DISPLAYED' : 'HIDDEN',
  );

  const handleScrolling = () => {
    setDisplayState(window.scrollY > minScrollPosition ? 'DISPLAYED' : 'HIDDEN');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, []);

  return displayState;
};
