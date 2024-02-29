import L, { LatLngBoundsExpression } from 'leaflet';
import { Map } from 'leaflet';
import { useState } from 'react';
import { useIntl } from 'react-intl';

require('leaflet.locatecontrol');
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import injectOfflineMode from 'services/offline/injectOfflineMode';
import { ViewPoint } from 'modules/viewPoint/interface';

export const useTileLayer = (
  id?: number,
  center?: LatLngBoundsExpression | null,
  mapToDisplay: ViewPoint | 'default' = 'default',
): {
  map: Map | null;
  setMapInstance: (newMap: Map) => void;
} => {
  const [map, setMap] = useState<Map | null>(null);

  const intl = useIntl();

  const setMapInstance = (newMap: Map) => {
    setMap(newMap);

    if (id !== undefined && center) {
      injectOfflineMode(newMap, id, center);
    }

    if (mapToDisplay === 'default') {
      L.control
        // @ts-expect-error no type available in this plugin
        .locate({
          locateOptions: {
            enableHighAccuracy: true,
          },
          icon: 'gg-track',
          strings: {
            title: intl.formatMessage({ id: 'search.map.seeMe' }),
          },
          position: 'bottomright',
        })
        .addTo(newMap);
    }
  };

  return {
    map,
    setMapInstance,
  };
};
