import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Tooltip } from 'react-leaflet';
import { HoverableMarker } from '../components/HoverableMarker';

export type PropsType = {
  points?: { location: { x: number; y: number }; pictogramUri: string; name: string; id: string }[];
};

export const MarkersWithIcon: React.FC<PropsType> = props => {
  return (
    <>
      {props.points !== undefined &&
        props.points.map(
          point =>
            point.location !== null && (
              <HoverableMarker
                id={point.id}
                position={[point.location.y, point.location.x]}
                pictogramUri={point.pictogramUri}
                type="TREK"
              >
                <Tooltip>{point.name}</Tooltip>
              </HoverableMarker>
            ),
        )}
    </>
  );
};
