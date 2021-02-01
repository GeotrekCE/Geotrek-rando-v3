import React from 'react';
import TextPath from 'react-leaflet-textpath';

import { colorPalette } from 'stylesheet';

interface DecoratedPolylineProps {
  positions: { x: number; y: number }[];
}

export const DecoratedPolyline: React.FC<DecoratedPolylineProps> = ({ positions }) => {
  return (
    <TextPath
      text=" > "
      repeat
      attributes={{ 'font-size': 20 }}
      positions={positions.map(coordinates => [coordinates.y, coordinates.x])}
      color={colorPalette.primary1}
    />
  );
};
