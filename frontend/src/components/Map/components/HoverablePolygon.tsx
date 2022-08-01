import { ListAndMapContext } from 'modules/map/ListAndMapContext';
import React, { useContext, useMemo } from 'react';
import { Polygon } from 'react-leaflet';
import { colorPalette } from 'stylesheet';

const ZOOMED_WEIGHT = 10;
const DEFAULT_WEIGHT = 3;

interface Props {
  id: string;
  positions: [number, number][][];
}

export const HoverablePolygon: React.FC<Props> = props => {
  const { hoveredCardId } = useContext(ListAndMapContext);
  const isCorrespondingCardHovered = props.id === hoveredCardId;

  const weight = isCorrespondingCardHovered ? ZOOMED_WEIGHT : DEFAULT_WEIGHT;

  return useMemo(
    () => (
      <Polygon
        key={props.id}
        positions={props.positions}
        color={colorPalette.map.touristicContentLines}
        weight={weight}
      />
    ),
    [props.id, isCorrespondingCardHovered],
  );
};
