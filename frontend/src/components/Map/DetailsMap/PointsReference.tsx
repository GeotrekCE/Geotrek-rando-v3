import React from 'react';
import { Marker } from 'react-leaflet';
import { PointsReferenceMarker } from '../Markers/PointsReferenceMarker';

export type PropsType = {
  pointsReference?: { x: number; y: number }[];
};

export const PointsReference: React.FC<PropsType> = props => {
  return (
    <>
      {props.pointsReference !== undefined &&
        props.pointsReference.map((point, index) => (
          <Marker
            key={index}
            position={[point.y, point.x]}
            icon={PointsReferenceMarker(index + 1)}
          />
        ))}
    </>
  );
};
