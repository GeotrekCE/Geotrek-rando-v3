import TextPath from 'react-leaflet-textpath';

import { theme } from '../../../../../tailwind.config';

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
      color={theme.extend.colors.primary1.DEFAULT}
    />
  );
};
