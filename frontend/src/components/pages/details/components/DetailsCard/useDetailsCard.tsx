import { useState } from 'react';

export const useDetailsCard = () => {
  const [truncateState, setTruncateState] = useState<'TRUNCATE' | 'FULL'>('TRUNCATE');
  const toggleTruncateState = () =>
    setTruncateState(currentTruncateState =>
      currentTruncateState === 'TRUNCATE' ? 'FULL' : 'TRUNCATE',
    );
  return { truncateState, toggleTruncateState };
};
