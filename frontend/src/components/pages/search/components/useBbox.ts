import { LatLngBounds } from 'leaflet';
import { getGlobalConfig } from 'modules/utils/api.config';
import { useState } from 'react';

interface ReturnType {
  bboxState: string | null;
  handleMoveMap: (bounds: LatLngBounds) => void;
}

const useBbox = (): ReturnType => {
  const [bboxState, setBboxState] = useState<string | null>(null);

  const handleMoveMap = (bounds: LatLngBounds) => {
    if (getGlobalConfig().enableSearchOnMap) setBboxState(bounds.toBBoxString());
  };

  return {
    bboxState,
    handleMoveMap,
  };
};

export default useBbox;
