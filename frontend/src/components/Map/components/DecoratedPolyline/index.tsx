import React from 'react';
import TextPath from 'react-leaflet-textpath';

import { colorPalette } from 'stylesheet';

interface DecoratedPolylineProps {
  positions: { x: number; y: number }[];
}

export const DecoratedPolyline: React.FC<DecoratedPolylineProps> = ({ positions }) => {
  return (
    <TextPath
      text="  >  "
      repeat
      center
      offset={6}
      attributes={{ 'font-size': 10 }}
      positions={positions.map(coordinates => [coordinates.y, coordinates.x])}
      color={colorPalette.primary1}
    />
  );
};
