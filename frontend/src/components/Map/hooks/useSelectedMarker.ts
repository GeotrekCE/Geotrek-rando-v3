import { useState } from 'react';

const INITIAL_TYPE = 'TREK';

export const useSelectedMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [selectedMarkerType, setSelectedMarkerType] = useState<'TREK' | 'TOURISTIC_CONTENT'>(
    INITIAL_TYPE,
  );

  const isSelectedMarker = (markerId: number): boolean => selectedMarkerId === markerId;
  const resetSelectedMarker = () => {
    setSelectedMarkerId(null);
    setSelectedMarkerType(INITIAL_TYPE);
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
