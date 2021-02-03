import { useState } from 'react';

export const useDetailsInformationDesk = () => {
  const [truncateState, setTruncateState] = useState<'TRUNCATE' | 'FULL'>('TRUNCATE');
  const toggleTruncateState = () =>
    setTruncateState(currentTruncateState =>
      currentTruncateState === 'TRUNCATE' ? 'FULL' : 'TRUNCATE',
    );
  return { truncateState, toggleTruncateState };
};
