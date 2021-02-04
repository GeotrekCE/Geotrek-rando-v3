import { useEffect, useRef, useState } from 'react';

export const useDetailsCard = () => {
  const [truncateState, setTruncateState] = useState<'TRUNCATE' | 'FULL'>('TRUNCATE');
  const detailsCardRef = useRef<HTMLDivElement>(null);
  const [heightState, setHeightState] = useState(200);
  const toggleTruncateState = () =>
    setTruncateState(currentTruncateState =>
      currentTruncateState === 'TRUNCATE' ? 'FULL' : 'TRUNCATE',
    );
  useEffect(() => {
    if (truncateState === 'TRUNCATE') {
      setHeightState(200);
    } else {
      const newHeight = detailsCardRef.current?.getBoundingClientRect().height;
      if (newHeight !== undefined) {
        setHeightState(newHeight);
      }
    }
  }, [truncateState]);
  return { truncateState, toggleTruncateState, heightState, detailsCardRef };
};
