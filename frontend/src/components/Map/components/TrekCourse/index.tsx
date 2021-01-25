import React from 'react';
import { Polyline } from 'react-leaflet';

import { useTrekGeometry } from '../../hooks/useTrekGeometry';

interface TrekCourseProps {
  id: number | null;
}

export const TrekCourse: React.FC<TrekCourseProps> = ({ id }) => {
  const { trekGeometry } = useTrekGeometry(id ?? undefined);

  return (
    <>
      {trekGeometry !== undefined && (
        <Polyline
          positions={trekGeometry.geometry.map(coordinates => [coordinates.y, coordinates.x])}
          color={'red'}
        />
      )}
    </>
  );
};
