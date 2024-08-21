import { LatLngBoundsExpression } from 'leaflet';
import { Map } from 'leaflet';
import { useState } from 'react';

import injectOfflineMode from 'services/offline/injectOfflineMode';

export const useTileLayer = (
  id?: number,
  center?: LatLngBoundsExpression | null,
): {
  map: Map | null;
  setMapInstance: (newMap: Map) => void;
} => {
  const [map, setMap] = useState<Map | null>(null);

  const setMapInstance = (newMap: Map) => {
    setMap(newMap);

    if (id !== undefined && center) {
      injectOfflineMode(newMap, id, center);
    }
  };

  return {
    map,
    setMapInstance,
  };
};
