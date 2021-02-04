import { useEffect, useRef, useState } from 'react';

const DETAILS_CARD_DEFAULT_HEIGHT = 200;

export const useDetailsCard = () => {
  const [truncateState, setTruncateState] = useState<'TRUNCATE' | 'FULL'>('TRUNCATE');
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const [heightState, setHeightState] = useState(DETAILS_CARD_DEFAULT_HEIGHT);
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
        setHeightState(newHeight);
      }
    }
  }, [truncateState]);
  return { truncateState, toggleTruncateState, heightState, detailsCardRef };
};
