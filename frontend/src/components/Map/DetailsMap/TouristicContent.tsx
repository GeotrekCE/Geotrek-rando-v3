import { Popup } from 'components/Map/components/Popup';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { TouristicContentGeometry } from './DetailsMap';
import { HoverableMarker } from '../components/HoverableMarker';
import { HoverablePolyline } from '../components/HoverablePolyline';
import { HoverablePolygon } from '../components/HoverablePolygon';

export type PropsType = {
  contents?: TouristicContentGeometry[];
  type?: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT';
};

export const TouristicContent: React.FC<PropsType> = ({ contents, type = 'TOURISTIC_CONTENT' }) => {
  return (
    <>
      {contents !== undefined &&
        contents.map(({ id, geometry, pictogramUri }) => {
          const idSplitted = String(id).split('-');
          const idContent = Number(idSplitted[idSplitted.length - 1]);

          switch (geometry.type) {
            case 'Point':
              return pictogramUri ? (
                <HoverableMarker
                  id={id}
                  position={[geometry.coordinates.y, geometry.coordinates.x]}
                  pictogramUri={pictogramUri}
                  type={type}
                >
                  <Popup id={Number(idContent)} type={type} />
                </HoverableMarker>
              ) : null;

            case 'LineString':
              return (
                <HoverablePolyline
                  id={id}
                  positions={geometry.coordinates.map(point => [point.y, point.x])}
                />
              );

            case 'Polygon':
              return (
                <HoverablePolygon
                  id={id}
                  positions={geometry.coordinates.map(line =>
                    line.map<[number, number]>(point => [point.y, point.x]),
                  )}
                />
              );

            default:
              // TODO Multi*
              return null;
          }
        })}
    </>
  );
};
