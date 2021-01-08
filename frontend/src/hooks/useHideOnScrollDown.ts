import { useEffect, useState } from 'react';
import { useScrollDirection } from './useScrollDirection';

export type Display = 'DISPLAYED' | 'HIDDEN';

/**
 * Returns HIDDEN if the last user scroll was a scroll down
 * else returns DISPLAYED
 */
export const useHideOnScrollDown = (
  /** Scroll value below which the displayState will always be "DISPLAYED" */
  scrollDetectionThreshold = 0,
): Display => {
  const scrollDirection = useScrollDirection(scrollDetectionThreshold);
  const [displayState, setDisplayState] = useState<Display>('DISPLAYED');

  useEffect(() => {
    setDisplayState(scrollDirection === 'DOWN' ? 'HIDDEN' : 'DISPLAYED');
  }, [scrollDirection]);

  return displayState;
};
