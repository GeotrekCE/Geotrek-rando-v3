import { Popup } from 'components/Map/components/Popup';

import { ContentType } from 'modules/interface';
import { GeometryListProps } from './DetailsMap';
import { HoverableMarker } from '../components/HoverableMarker';
import { HoverablePolyline } from '../components/HoverablePolyline';
import { HoverablePolygon } from '../components/HoverablePolygon';

interface PropsType extends GeometryListProps {
  type?: ContentType;
}

export const GeometryItem = ({
  id,
  geometry,
  name,
  pictogramUri,
  type = 'TOURISTIC_CONTENT',
}: PropsType) => {
  if (geometry.type === 'GeometryCollection') {
    return (
      <>
        {geometry.geometries.map((geom, index) => (
          <GeometryItem
            key={`${String(id)}-${String(index)}`}
            id={id}
            geometry={geom}
            name={name}
            pictogramUri={pictogramUri}
            type={type}
          />
        ))}
      </>
    );
  }

  if ((geometry.type === 'Point' || geometry.type === 'MultiPoint') && pictogramUri !== null) {
    const coordinatesAsMultiPoint =
      geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates;
    return (
      <>
        {coordinatesAsMultiPoint.map(coordinates => {
          const idSplitted = String(id).split('-');
          const idContent = Number(idSplitted[idSplitted.length - 1]);
          return (
            <HoverableMarker
              key={`${id}${JSON.stringify(coordinates)}`}
              id={id}
              position={[coordinates.y, coordinates.x]}
              pictogramUri={pictogramUri}
              type={type}
            >
              <Popup id={Number(idContent)} type={type} />
            </HoverableMarker>
          );
        })}
      </>
    );
  }

  if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
    const coordinatesAsMultiLineString =
      geometry.type === 'LineString' ? [geometry.coordinates] : geometry.coordinates;
    return (
      <>
        {coordinatesAsMultiLineString.map(group => (
          <HoverablePolyline
            key={`${id}${JSON.stringify(group)}`}
            id={id}
            positions={group.map(point => [point.y, point.x])}
            type={type}
          />
        ))}
      </>
    );
  }

  if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
    const coordinatesAsMultiPolygon =
      geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
    return (
      <>
        {coordinatesAsMultiPolygon.map(group => (
          <HoverablePolygon
            key={`${id}${JSON.stringify(group)}`}
            id={id}
            positions={group.map(line => line.map<[number, number]>(point => [point.y, point.x]))}
            type={type}
          />
        ))}
      </>
    );
  }

  return null;
};
