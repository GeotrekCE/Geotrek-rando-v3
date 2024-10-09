import { LatLngBounds } from 'leaflet';
import { getGlobalConfig } from 'modules/utils/api.config';
import { useState } from 'react';

interface ReturnType {
  bounds: LatLngBounds | null;
  handleMoveMap: (bounds: LatLngBounds) => void;
}

const useBbox = (): ReturnType => {
  const [bounds, setBboxState] = useState<LatLngBounds | null>(null);

  const handleMoveMap = (nextBounds: LatLngBounds) => {
    if (getGlobalConfig().enableSearchByMap) setBboxState(nextBounds);
  };

  return {
    bounds,
    handleMoveMap,
  };
};

export default useBbox;
