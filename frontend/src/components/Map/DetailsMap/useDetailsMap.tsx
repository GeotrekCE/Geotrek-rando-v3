import { useState } from 'react';

export type Visibility = 'DISPLAYED' | 'HIDDEN';

export const useDetailsMap = () => {
  const [poiMobileVisibility, setPoiVisibility] = useState<Visibility>('HIDDEN');
  const tooglePoiVisibility = () =>
    setPoiVisibility(currentVisibility =>
      currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED',
    );
  return {
    poiMobileVisibility,
    tooglePoiVisibility,
  };
};
