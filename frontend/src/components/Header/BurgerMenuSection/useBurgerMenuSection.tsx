import { useState } from 'react';

export const useBurgerMenuSection = () => {
  const [openState, setOpenState] = useState<'OPENED' | 'CLOSED'>('CLOSED');

  return {
    openState,
    setOpenState,
  };
};
