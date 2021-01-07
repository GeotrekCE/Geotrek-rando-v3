import { useEffect, useState } from 'react';

export type ScrollDirections = 'UP' | 'DOWN' | null;

const computeScrollDirection = (
  currentPosition: number,
  previousPosition: number,
  scrollDetectionThreshold: number,
): ScrollDirections => {
  if (currentPosition <= scrollDetectionThreshold) return null;
  if (currentPosition > previousPosition) return 'DOWN';
  return 'UP';
};

/**
 * Returns the direction of the last scrolling action of the user
 */
export const useScrollDirection = (
  /** Scroll value below which the scroll direction will be null */
  scrollDetectionThreshold = 0,
): ScrollDirections => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirections>(null);
  let previousPosition: number;

  // Necessary to avoid errors with Nextjs
  if (typeof window !== 'undefined') {
    previousPosition = window.scrollY;
  }

  const handleScrolling = () => {
    const currentPosition = window.scrollY;
    setScrollDirection(
      computeScrollDirection(currentPosition, previousPosition, scrollDetectionThreshold),
    );
    previousPosition = currentPosition;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  }, []);

  return scrollDirection;
};
