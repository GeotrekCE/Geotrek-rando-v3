import { TileLayerType } from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { useState } from 'react';

export const useTileLayer = (): {
  tileLayerType: TileLayerType;
  onTileToggleButtonClick: (newTileLayerType: TileLayerType) => void;
  isTileLayerClassic: boolean;
  isTileLayerSatellite: boolean;
} => {
  const [tileLayerType, setTileLayerType] = useState<TileLayerType>('classic');

  const updateTileLayer = (newTileLayerType: TileLayerType) => {
    setTileLayerType(newTileLayerType);
  };

  return {
    tileLayerType,
    onTileToggleButtonClick: updateTileLayer,
    isTileLayerClassic: tileLayerType === 'classic',
    isTileLayerSatellite: tileLayerType === 'satellite',
  };
};
