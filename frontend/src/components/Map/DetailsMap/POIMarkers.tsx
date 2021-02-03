import React from 'react';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TrekMarker } from '../Markers/TrekMarker';

export type PropsType = {
  poiPoints?: { location: { x: number; y: number }; pictogramUri: string; name: string }[];
};

export const POIMarkers: React.FC<PropsType> = props => {
  return (
    <>
      {props.poiPoints !== undefined &&
        props.poiPoints.map(
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
