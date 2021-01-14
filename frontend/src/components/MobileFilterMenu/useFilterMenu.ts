import { useState } from 'react';

export const useFilterMenu = (): {
  menuState: 'DISPLAYED' | 'HIDDEN';
  displayMenu: () => void;
  hideMenu: () => void;
  subMenuState: 'DISPLAYED' | 'HIDDEN';
  displaySubMenu: () => void;
  hideSubMenu: () => void;
} => {
  const [menuState, setMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');

  const displayMenu = () => setMenuState('DISPLAYED');

  const hideMenu = () => setMenuState('HIDDEN');

  const [subMenuState, setSubMenuState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');

  const displaySubMenu = () => setSubMenuState('DISPLAYED');

  const hideSubMenu = () => setSubMenuState('HIDDEN');

  return { menuState, displayMenu, hideMenu, subMenuState, displaySubMenu, hideSubMenu };
};
