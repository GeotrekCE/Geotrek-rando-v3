import { useState } from 'react';

export const useOpenFilterMenu = (): {
  menuState: 'DISPLAYED' | 'HIDDEN';
  displayMenu: () => void;
  hideMenu: () => void;
} => {
  const [menuState, setMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');

  const displayMenu = () => setMenuState('DISPLAYED');

  const hideMenu = () => setMenuState('HIDDEN');

  return { menuState, displayMenu, hideMenu };
};
