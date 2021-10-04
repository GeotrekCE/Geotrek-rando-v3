import { useState } from 'react';

export const useFilterSubMenu = () => {
  const [currentFilterId, setCurrentFilterId] = useState<string>('');
  const hideSubMenu = () => setCurrentFilterId('');
  const selectFilter = (filterId: string) => setCurrentFilterId(filterId);

  const subMenuState: 'DISPLAYED' | 'HIDDEN' = currentFilterId === '' ? 'HIDDEN' : 'DISPLAYED';

  return {
    currentFilterId,
    subMenuState,
    hideSubMenu,
    selectFilter,
  };
};
