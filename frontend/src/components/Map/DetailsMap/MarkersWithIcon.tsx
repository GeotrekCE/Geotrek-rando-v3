import React from 'react';
import { Tooltip } from 'react-leaflet';
import { HoverableMarker } from '../components/HoverableMarker';

export type PropsType = {
  points?: { location: { x: number; y: number }; pictogramUri: string; name: string; id: string }[];
};

export const MarkersWithIcon: React.FC<PropsType> = props => {
  if (props.points === undefined) {
    return null;
  }
  return (
    <>
      {props.points.map(
        point =>
          point.location !== null && (
            <HoverableMarker
              id={point.id}
              key={point.id}
              position={[point.location.y, point.location.x]}
              pictogramUri={point.pictogramUri}
              type={null}
            >
              <Tooltip>{point.name}</Tooltip>
            </HoverableMarker>
          ),
      )}
    </>
  );
};
