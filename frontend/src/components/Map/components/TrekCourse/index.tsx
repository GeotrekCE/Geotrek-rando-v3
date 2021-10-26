import React from 'react';
import { Polyline } from 'react-leaflet';

import { colorPalette } from 'stylesheet';

import { useObjectGeometry } from '../../hooks/useTrekGeometry';

interface TrekCourseProps {
  id: number;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE';
}

export const TrekCourse: React.FC<TrekCourseProps> = ({ id, type }) => {
  const { trekGeometry } = useObjectGeometry(id, type);

  return (
    <>
      {trekGeometry !== undefined && (
        <Polyline
          positions={trekGeometry.geometry.map(coordinates => [coordinates.y, coordinates.x])}
          color={colorPalette.primary1}
        />
      )}
    </>
  );
};
