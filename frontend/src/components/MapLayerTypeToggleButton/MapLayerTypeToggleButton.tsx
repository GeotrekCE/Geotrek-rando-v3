import { SquaredButtonWithImage } from 'components/SquaredButtonWithImage/SquaredButtonWithImage';
import { ControlPosition } from 'leaflet';
import { useState } from 'react';
import Control from 'components/Map/components/CustomControl';

export type TileLayerType = 'classic' | 'satellite';

interface MapLayerTypeToggleButton {
  position?: ControlPosition;
  onChange: (tileLayerType: TileLayerType) => void;
}
export const MapLayerTypeToggleButton: React.FC<MapLayerTypeToggleButton> = ({
  position = 'bottomleft',
  onChange,
}) => {
  const [tileLayerType, setTileLayerType] = useState<TileLayerType>('classic');

  const otherLayer = tileLayerType === 'classic' ? 'satellite' : 'classic';

  return (
    <Control position={position}>
      <div
        className="leaflet-toggleLayer"
        onClick={() => {
          setTileLayerType(otherLayer);
          onChange(otherLayer);
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
