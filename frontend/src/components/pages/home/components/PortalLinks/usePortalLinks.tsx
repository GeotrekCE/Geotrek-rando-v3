import { useState } from 'react';

export const usePortalLinks = () => {
  const [openState, setOpenState] = useState<'OPENED' | 'CLOSED'>('CLOSED');
  const updatePanelState = () => {
    setOpenState(currentState => (currentState === 'OPENED' ? 'CLOSED' : 'OPENED'));
  };
  return {
    openState,
    updatePanelState,
  };
};
