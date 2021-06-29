import { LatLngBounds } from 'leaflet';
import { useState } from 'react';
import { getGlobalConfig } from '../../../../../../../../../../../home/sylchauf/projects/Geotrek-rando-v3/frontend/src/modules/utils/api.config';

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
