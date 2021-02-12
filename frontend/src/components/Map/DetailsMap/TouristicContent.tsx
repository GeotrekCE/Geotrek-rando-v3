import React from 'react';
import { Marker, Polygon, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { colorPalette } from 'stylesheet';
import { TrekMarker } from '../Markers/TrekMarker';
import { TouristicContentGeometry } from './DetailsMap';

export type PropsType = {
  contents?: TouristicContentGeometry[];
};

export const TouristicContent: React.FC<PropsType> = ({ contents }) => {
  return (
    <>
      {contents !== undefined &&
        contents.map(({ name, geometry, pictogramUri }) => {
          switch (geometry.type) {
            case 'Point':
              return (
                <Marker
                  key={name}
                  position={[geometry.coordinates.y, geometry.coordinates.x]}
                  icon={TrekMarker(pictogramUri)}
                />
              );

            case 'LineString':
              return (
                <Polyline
                  key={name}
                  positions={geometry.coordinates.map(point => [point.y, point.x])}
                  color={colorPalette.map.touristicContentLines}
                />
              );

            case 'Polygon':
              return (
                <Polygon
                  key={name}
                  positions={geometry.coordinates.map(line =>
                    line.map<[number, number]>(point => [point.y, point.x]),
                  )}
                  color={colorPalette.map.touristicContentLines}
                />
              );
          }
        })}
    </>
  );
};
