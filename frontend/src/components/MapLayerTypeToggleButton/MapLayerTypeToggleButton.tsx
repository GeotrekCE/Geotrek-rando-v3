import { SquaredButtonWithImage } from 'components/SquaredButtonWithImage/SquaredButtonWithImage';
import React, { FunctionComponent, useState } from 'react';

export type TileLayerType = 'classic' | 'satellite';

interface MapLayerTypeToggleButton {
  onToggleButtonClick: (layerType: TileLayerType) => void;
}

const TILE_LAYERS: TileLayerType[] = ['classic', 'satellite'];

export const MapLayerTypeToggleButton: FunctionComponent<MapLayerTypeToggleButton> = ({
  onToggleButtonClick,
}) => {
  const [tileLayerType, setTileLayerType] = useState<TileLayerType>('classic');

  return (
    <>
      {TILE_LAYERS.filter(buttonsType => buttonsType !== tileLayerType).map(buttonType => {
        const titleKey = `map.layerButton.${buttonType}`;
        const imageUrl = `/images/${buttonType}-toggle-button-image.png`;

        return (
          <div
            className="pt-4"
            key={buttonType}
            onClick={() => {
              setTileLayerType(buttonType);
              onToggleButtonClick(buttonType);
            }}
          >
            <SquaredButtonWithImage titleKey={titleKey} imageUrl={imageUrl} />
          </div>
        );
      })}
    </>
  );
};
