import { getMapConfig } from 'components/Map/config';
import { TileLayer as TileLayerInterface } from 'components/Map/interface';
import {
  MapLayerTypeToggleButton,
  TileLayerType,
} from 'components/MapLayerTypeToggleButton/MapLayerTypeToggleButton';
import { useCallback, useState } from 'react';
import TileLayerGroup from '../TileLayerGroup';

const TileLayerManager: React.FC = () => {
  const { mapClassicLayers: classic, mapSatelliteLayers: satellite } = getMapConfig();

  const [currentLayer, setLayer] = useState<TileLayerInterface[] | null>(classic);

  const onChange = useCallback(
    (layer: TileLayerType) => {
      const nextLayer = layer === 'classic' ? classic : satellite;
      return setLayer(nextLayer);
    },
    [setLayer, satellite, classic],
  );

  return (
    <>
      {satellite !== null && navigator.onLine && <MapLayerTypeToggleButton onChange={onChange} />}
      {currentLayer !== null && <TileLayerGroup layers={currentLayer} />}
    </>
  );
};

export default TileLayerManager;
