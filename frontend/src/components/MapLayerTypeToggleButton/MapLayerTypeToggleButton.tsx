import { useState } from 'react';
import { ControlPosition } from 'leaflet';
import Control from 'components/Map/components/CustomControl';
import { SquaredButtonWithImage } from 'components/SquaredButtonWithImage/SquaredButtonWithImage';

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
      <button
        className="leaflet-toggleLayer"
        onClick={() => {
          setTileLayerType(otherLayer);
          onChange(otherLayer);
        }}
        type="button"
      >
        <SquaredButtonWithImage
          titleKey={`map.layerButton.${otherLayer}`}
          imageUrl={`/images/${otherLayer}-toggle-button-image.png`}
        />
      </button>
    </Control>
  );
};
