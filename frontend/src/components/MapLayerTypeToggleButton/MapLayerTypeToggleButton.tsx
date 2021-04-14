import { SquaredButtonWithImage } from 'components/SquaredButtonWithImage/SquaredButtonWithImage';
import React, { FunctionComponent } from 'react';

export type TileLayerType = 'classic' | 'satellite';

interface MapLayerTypeToggleButton {
  selectedTileLayerType: TileLayerType;
  onToggleButtonClick: (layerType: TileLayerType) => void;
}

const TILE_LAYERS: TileLayerType[] = ['classic', 'satellite'];

export const MapLayerTypeToggleButton: FunctionComponent<MapLayerTypeToggleButton> = ({
  selectedTileLayerType,
  onToggleButtonClick,
}) => {
  const buttonsToDisplay = TILE_LAYERS.filter(buttonsType => buttonsType !== selectedTileLayerType);

  return (
    <>
      {buttonsToDisplay.map(buttonType => {
        const titleKey = `map.layerButton.${buttonType}`;
        const imageUrl = `/images/${buttonType}-toggle-button-image.png`;

        return (
          <div className="pt-4" key={buttonType} onClick={() => onToggleButtonClick(buttonType)}>
            <SquaredButtonWithImage titleKey={titleKey} imageUrl={imageUrl} />
          </div>
        );
      })}
    </>
  );
};
