import { getMapConfig } from 'components/Map/config';
import { SquaredButtonWithImage } from 'components/SquaredButtonWithImage/SquaredButtonWithImage';
import L, { ControlPosition } from 'leaflet';
import React, { FunctionComponent, useState } from 'react';
import { useMap } from 'react-leaflet';
import Control from 'components/Map/components/CustomControl';

export type TileLayerType = 'classic' | 'satellite';

interface MapLayerTypeToggleButton {
  position?: ControlPosition;
}

const TILE_LAYERS: TileLayerType[] = ['classic', 'satellite'];

export const MapLayerTypeToggleButton: FunctionComponent<MapLayerTypeToggleButton> = ({
  position = 'bottomleft',
}) => {
  const [tileLayerType, setTileLayerType] = useState<TileLayerType>('classic');

  const otherLayer = TILE_LAYERS.find(buttonsType => buttonsType !== tileLayerType);

  const map = useMap();

  const mapConfig = getMapConfig();

  const isSatelliteLayerAvailable =
    mapConfig.mapSatelliteLayerUrl !== undefined && navigator.onLine;

  if (!otherLayer || !isSatelliteLayerAvailable) {
    return null;
  }

  const updateTileLayer = (newTileLayerType: TileLayerType) => {
    if (map !== undefined) {
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

  return (
    <Control position={position}>
      <div
        className="leaflet-toggleLayer"
        key={otherLayer}
        onClick={() => {
          setTileLayerType(otherLayer);
          updateTileLayer(otherLayer);
        }}
      >
        <SquaredButtonWithImage
          titleKey={`map.layerButton.${otherLayer}`}
          imageUrl={`/images/${otherLayer}-toggle-button-image.png`}
        />
      </div>
    </Control>
  );
};
