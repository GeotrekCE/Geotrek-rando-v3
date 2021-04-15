import React from 'react';
import { Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';

export type PropsType = {
  contents?: SensitiveAreaGeometry[];
};

export const SensitiveAreas: React.FC<PropsType> = ({ contents }) => {
  return (
    <>
      {contents !== undefined &&
        contents.map(({ color, geometry }, i) => {
          return (
            <Polygon
              key={`sensitiveArea${i}`}
              color={color}
              weight={3}
              positions={geometry.coordinates.map(line =>
                line.map<[number, number]>(point => [point.y, point.x]),
              )}
            />
          );
        })}
    </>
  );
};
