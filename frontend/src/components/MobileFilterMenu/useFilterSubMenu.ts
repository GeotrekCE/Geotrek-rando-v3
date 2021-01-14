import { useState } from 'react';

export const useFilterSubMenu = () => {
  const [currentFilterId, setCurrentFilterId] = useState<string | null>(null);
  const hideSubMenu = () => setCurrentFilterId(null);
  const selectFilter = (filterid: string) => setCurrentFilterId(filterid);

  const subMenuState: 'DISPLAYED' | 'HIDDEN' = currentFilterId === null ? 'HIDDEN' : 'DISPLAYED';

  return { currentFilterId, subMenuState, hideSubMenu, selectFilter };
};
