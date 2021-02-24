import React from 'react';
import 'leaflet/dist/leaflet.css';
import { TrekChildGeometry } from 'modules/details/interface';
import { HoverableMarker } from '../components/HoverableMarker';

export type TrekChildrenPropsType = {
  trekChildrenGeometry?: TrekChildGeometry[];
};

export const TrekChildren: React.FC<TrekChildrenPropsType> = props => {
  return (
    <>
      {props.trekChildrenGeometry !== undefined &&
        props.trekChildrenGeometry.map((trekChildGeometry, index) => (
          <>
            <HoverableMarker
              id={trekChildGeometry.id}
              position={[trekChildGeometry.departure.y, trekChildGeometry.departure.x]}
              rank={index + 1}
              type="TREK_CHILD"
            />
          </>
        ))}
    </>
  );
};
