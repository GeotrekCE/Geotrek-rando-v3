import React from 'react';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TrekMarker } from '../Markers/TrekMarker';

export type PropsType = {
  points?: { location: { x: number; y: number }; pictogramUri: string; name: string }[];
};

export const MarkersWithIcon: React.FC<PropsType> = props => {
  return (
    <>
      {props.points !== undefined &&
        props.points.map(
          point =>
            point.location !== null && (
              <Marker
                key={point.name}
                position={[point.location.y, point.location.x]}
                icon={TrekMarker(point.pictogramUri)}
              />
            ),
        )}
    </>
  );
};
