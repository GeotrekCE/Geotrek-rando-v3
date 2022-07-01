import L, { LatLngBoundsExpression } from 'leaflet';
import { Map } from 'leaflet';
import { useState } from 'react';
import { useIntl } from 'react-intl';

require('leaflet.locatecontrol');
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import injectOfflineMode from 'services/offline/injectOfflineMode';

let controlSave: any;

export const useTileLayer = (
  id?: number,
  center?: LatLngBoundsExpression | null,
): {
  map: Map | null;
  setMapInstance: (newMap: Map) => void;
} => {
  const [map, setMap] = useState<Map | null>(null);

  const intl = useIntl();

  const setMapInstance = (newMap: Map) => {
    setMap(newMap);

    if (id !== undefined && center && !navigator.onLine) {
      injectOfflineMode(newMap, id, center);
    }

    L.control
      // @ts-ignore no type available in this plugin
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
  };

  return {
    map,
    setMapInstance,
  };
};
