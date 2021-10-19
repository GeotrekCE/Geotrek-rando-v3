import L, { LatLngBoundsExpression } from 'leaflet';
import { getMapConfig } from 'components/Map/config';
import { Map } from 'leaflet';
import { TileLayerType } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { useState } from 'react';
import { useIntl } from 'react-intl';

require('leaflet.locatecontrol');
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import injectOfflineMode from 'services/offline/injectOfflineMode';

let controlSave: any;

export const useTileLayer = (
  id?: number,
  center?: LatLngBoundsExpression,
): {
  setMapInstance: (newMap: Map) => void;
  updateTileLayer: (newTileLayerType: TileLayerType) => void;
  isSatelliteLayerAvailable: boolean;
} => {
  const mapConfig = getMapConfig();
  const isSatelliteLayerAvailable = mapConfig.mapSatelliteLayerUrl !== undefined;
  const [map, setMap] = useState<Map | null>(null);

  const intl = useIntl();

  const updateTileLayer = (newTileLayerType: TileLayerType) => {
    if (map) {
      map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          if (newTileLayerType === 'classic') {
            layer.setUrl(mapConfig.mapClassicLayerUrl);
          }
          if (mapConfig.mapSatelliteLayerUrl !== undefined && newTileLayerType === 'satellite') {
            layer.setUrl(mapConfig.mapSatelliteLayerUrl);
          }
        }
      });
    }
  };

  const setMapInstance = (newMap: Map) => {
    setMap(newMap);

    if (id && center) controlSave = injectOfflineMode(newMap, id, center);

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
    setMapInstance,
    updateTileLayer(newTileLayerType) {
      return updateTileLayer(newTileLayerType);
    },
    isSatelliteLayerAvailable,
  };
};
