import { useState } from 'react';

export type Visibility = 'DISPLAYED' | 'HIDDEN' | null;

export const useDetailsMap = () => {
  const [poiMobileVisibility, setPoiVisibility] = useState<Visibility>('HIDDEN');
  const [referencePointsMobileVisibility, setReferencePointsVisibility] = useState<Visibility>(
    'HIDDEN',
  );
  const [touristicContentMobileVisibility, setTouristicContentVisibility] = useState<Visibility>(
    'HIDDEN',
  );
  const togglePoiVisibility = () =>
    setPoiVisibility(currentVisibility =>
      currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED',
    );

  const toggleReferencePointsVisibility = () =>
    setReferencePointsVisibility(currentVisibility =>
      currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED',
    );

  const toggleTouristicContentVisibility = () =>
    setTouristicContentVisibility(currentVisibility =>
      currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED',
    );

  return {
    poiMobileVisibility,
    togglePoiVisibility,
    referencePointsMobileVisibility,
    toggleReferencePointsVisibility,
    touristicContentMobileVisibility,
    toggleTouristicContentVisibility,
  };
};
