import { useState } from 'react';

export const useSelectedMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const isSelectedMarker = (markerId: number): boolean => selectedMarkerId === markerId;
  const resetSelectedMarker = () => setSelectedMarkerId(null);

  return { isSelectedMarker, setSelectedMarkerId, resetSelectedMarker };
};
