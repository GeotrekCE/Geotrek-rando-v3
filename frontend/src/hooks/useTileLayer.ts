import { getMapConfig } from 'components/Map/config';
import { TileLayerType } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { useState } from 'react';

export const useTileLayer = (): {
  tileLayerType: TileLayerType;
  updateTileLayer: (newTileLayerType: TileLayerType) => void;
  isTileLayerClassic: boolean;
  isTileLayerSatellite: boolean;
  isSatelliteLayerAvailable: boolean;
} => {
  const [tileLayerType, setTileLayerType] = useState<TileLayerType>('classic');

  const updateTileLayer = (newTileLayerType: TileLayerType) => {
    setTileLayerType(newTileLayerType);
  };

  const mapConfig = getMapConfig();

  const isSatelliteLayerAvailable = mapConfig.mapSatelliteLayerUrl !== undefined;

  return {
    tileLayerType,
    updateTileLayer,
    isTileLayerClassic: tileLayerType === 'classic',
    isTileLayerSatellite: tileLayerType === 'satellite',
    isSatelliteLayerAvailable,
  };
};
