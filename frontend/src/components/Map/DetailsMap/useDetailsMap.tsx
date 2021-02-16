import { useState } from 'react';

export type Visibility = 'DISPLAYED' | 'HIDDEN' | null;

export const useDetailsMap = () => {
  const [trekChildrenMobileVisibility, setTrekChildrenVisibility] = useState<Visibility>('HIDDEN');
  const [poiMobileVisibility, setPoiVisibility] = useState<Visibility>('HIDDEN');
  const [referencePointsMobileVisibility, setReferencePointsVisibility] = useState<Visibility>(
    'HIDDEN',
  );
  const [touristicContentMobileVisibility, setTouristicContentVisibility] = useState<Visibility>(
    'HIDDEN',
  );
  const toggleTrekChildrenVisibility = () =>
    setTrekChildrenVisibility(currentVisibility =>
      currentVisibility === 'DISPLAYED' ? 'HIDDEN' : 'DISPLAYED',
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
    trekChildrenMobileVisibility,
    toggleTrekChildrenVisibility,
    poiMobileVisibility,
    togglePoiVisibility,
    referencePointsMobileVisibility,
    toggleReferencePointsVisibility,
    touristicContentMobileVisibility,
    toggleTouristicContentVisibility,
  };
};
