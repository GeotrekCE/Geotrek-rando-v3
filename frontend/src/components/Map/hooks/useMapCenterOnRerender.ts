import { Map } from 'leaflet';
import { useState } from 'react';

export const useMapCenterOnRerender = (): {
  setMapInstance: (newMap: Map) => void;
  reCenterMapAfterRerender: () => void;
} => {
  const [map, setMap] = useState<Map | null>(null);

  const reCenterMapAfterRerender = () => {
    if (map) {
      const currentCenter = map.getCenter();

      /* 
      Changing the tile layer makes the map rerender, and move its center to its original position (because of the immutable bounds props), even if the user moved to another point before the map rerendered.
      This code makes sure the map is still centered where the user was before he changed the tile layer.
      The setTimeout make sure the recenter is ran after the rerender has completed: it makes the code asynchronous, so that it is executed after the synchronous code has finished running
      */
      setTimeout(() => {
        map.setView([currentCenter.lat, currentCenter.lng], map.getZoom());
      }, 0);
    }
  };

  const setMapInstance = (newMap: Map) => {
    setMap(newMap);
  };

  return {
    setMapInstance,
    reCenterMapAfterRerender,
  };
};
