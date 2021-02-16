import React from 'react';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TrekChildGeometry } from 'modules/details/interface';
import { TrekChildMarker } from '../Markers/TrekChildMarker';

export type TrekChildrenPropsType = {
  trekChildrenGeometry?: TrekChildGeometry[];
};

export const TrekChildren: React.FC<TrekChildrenPropsType> = props => {
  return (
    <>
      {props.trekChildrenGeometry !== undefined &&
        props.trekChildrenGeometry.map((trekChildGeometry, index) => (
          <>
            <Marker
              key={index}
              position={[trekChildGeometry.departure.y, trekChildGeometry.departure.x]}
              icon={TrekChildMarker(index + 1)}
            />
          </>
        ))}
    </>
  );
};
