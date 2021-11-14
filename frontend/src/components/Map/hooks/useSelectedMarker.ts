import { useState } from 'react';

export const useSelectedMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [selectedMarkerType, setSelectedMarkerType] = useState<
    'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT' | null
  >(null);

  const isSelectedMarker = (markerId: number): boolean => selectedMarkerId === markerId;
  const resetSelectedMarker = () => {
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
  };

  return {
    isSelectedMarker,
    setSelectedMarkerId,
    resetSelectedMarker,
    selectedMarkerId,
    selectedMarkerType,
    setSelectedMarkerType,
  };
};
