import L from 'leaflet';
import { getMapConfig } from 'components/Map/config';
import { Map } from 'leaflet';
import { TileLayerType } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { useState } from 'react';

export const useTileLayer = (): {
  setMapInstance: (newMap: Map) => void;
  updateTileLayer: (newTileLayerType: TileLayerType) => void;
  isSatelliteLayerAvailable: boolean;
} => {
  const mapConfig = getMapConfig();
  const isSatelliteLayerAvailable = mapConfig.mapSatelliteLayerUrl !== undefined;
  const [map, setMap] = useState<Map | null>(null);

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
  };

  return {
    setMapInstance,
    updateTileLayer: newTileLayerType => updateTileLayer(newTileLayerType),
    isSatelliteLayerAvailable,
  };
};
