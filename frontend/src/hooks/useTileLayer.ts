import { LatLngBoundsExpression, Map } from 'leaflet';
import { useState } from 'react';

import injectOfflineMode from 'services/offline/injectOfflineMode';

export const useTileLayer = (
  id?: number,
  bounds?: LatLngBoundsExpression | null,
): {
  map: Map | null;
  setMapInstance: (newMap: Map) => void;
} => {
  const [map, setMap] = useState<Map | null>(null);

  const setMapInstance = (newMap: Map) => {
    setMap(newMap);

    if (id !== undefined && bounds) {
      injectOfflineMode(newMap, id, bounds);
    }
  };

  return {
    map,
    setMapInstance,
  };
};
