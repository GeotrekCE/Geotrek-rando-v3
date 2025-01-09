import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';

import { ArrivalMarker } from '../Markers/ArrivalMarker';
import { DepartureMarker } from '../Markers/DepartureMarker';
import { ParkingMarker } from '../Markers/ParkingMarker';

import { DecoratedPolyline } from '../components/DecoratedPolyline';

export type PropsType = {
  trekGeometry?: { x: number; y: number }[];
  arrivalLocation?: { x: number; y: number };
  departureLocation?: { x: number; y: number };
  parkingLocation?: { x: number; y: number };
  advisedParking?: string;
};

export const TrekMarkersAndCourse: React.FC<PropsType> = props => {
  return (
    <>
      {props.arrivalLocation !== undefined && (
        <Marker
          position={[props.arrivalLocation.y, props.arrivalLocation.x]}
          icon={ArrivalMarker}
        />
      )}
      {props.departureLocation !== undefined && (
        <Marker
          position={[props.departureLocation.y, props.departureLocation.x]}
          icon={DepartureMarker}
        />
      )}
      {props.parkingLocation !== undefined && (
        <Marker position={[props.parkingLocation.y, props.parkingLocation.x]} icon={ParkingMarker}>
          <Tooltip>{props.advisedParking}</Tooltip>
        </Marker>
      )}
      {props.trekGeometry && <DecoratedPolyline positions={props.trekGeometry} />}
    </>
  );
};
