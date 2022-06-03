import React, { useMemo } from 'react';
import { Polygon } from 'react-leaflet';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import { RawCoordinate2D } from 'modules/interface';

export type PropsType = {
  contents?: SensitiveAreaGeometry[];
};

export const SensitiveAreas: React.FC<PropsType> = ({ contents }) => {
  if (contents === undefined) {
    return null;
  }

  const polygons = useMemo(() => {
    return contents
      .map(({ color, geometry }) => {
        if (geometry.type === 'MultiPolygon') {
          return geometry.coordinates.flatMap(polygon =>
            polygon.map(line => ({
              positions: line.map<RawCoordinate2D>(point => [point.y, point.x]),
              color,
            })),
          );
        }
        return {
          positions: geometry.coordinates.map(line =>
            line.map<RawCoordinate2D>(point => [point.y, point.x]),
          ),
          color,
        };
      })
      .flat();
  }, contents);

  return (
    <>
      {polygons.map(({ positions, color }, i) => {
        return <Polygon color={color} key={`sensitiveArea${i}`} positions={positions} weight={3} />;
      })}
    </>
  );
};
