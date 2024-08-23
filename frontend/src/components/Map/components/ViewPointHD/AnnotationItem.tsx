import L from 'leaflet';
import { GeoJsonProperties, Geometry } from 'geojson';
import { Circle, CircleMarker, Polygon, Polyline, Tooltip, useMap } from 'react-leaflet';
import Image from 'next/image';

type Props = {
  geometry: Geometry;
  properties: GeoJsonProperties;
  id: string;
};

const MetaData = ({ properties }: { properties: GeoJsonProperties }) => {
  if (properties === null || !properties.name) {
    return null;
  }
  return (
    <Tooltip>
      <span className="flex flex-wrap items-center gap-2">
        {properties.category ? (
          <>
            {Boolean(properties.category.pictogramUri) && (
              <Image
                loading="lazy"
                src={properties.category.pictogramUri}
                width={16}
                height={16}
                alt=""
              />
            )}
            <span>{properties.category.label}</span>
          </>
        ) : null}

        <span>{properties.name}</span>
      </span>
    </Tooltip>
  );
};

export const AnnotationItem = ({ geometry, properties, id }: Props) => {
  const map = useMap();
  if (geometry.type === 'GeometryCollection') {
    return (
      <>
        {geometry.geometries.map((geom, index) => (
          <AnnotationItem
            key={`${id}-${index}`}
            id={`${id}-${index}`}
            geometry={geom}
            properties={{}}
          />
        ))}
      </>
    );
  }

  if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
    const coordinatesAsMultiPoint =
      geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates;
    return (
      <>
        {coordinatesAsMultiPoint.map((coordinates, index) => {
          const [lat, lng] = coordinates;
          return (
            <CircleMarker
              className="annotation annotation-point"
              key={`point-${id}-${index}`}
              center={[lng, lat]}
              radius={6}
            >
              <MetaData properties={properties} />
            </CircleMarker>
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
        {coordinatesAsMultiLineString.map((group, index) => {
          return (
            <Polyline
              key={`linestring-${id}-${index}`}
              className="annotation annotation-line"
              positions={group.map(([lat, lng]) => [lng, lat])}
            >
              <MetaData properties={properties} />
            </Polyline>
          );
        })}
      </>
    );
  }

  if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
    const coordinatesAsMultiPolygon =
      geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;

    // Circle
    if (properties?.annotationType === 'circle') {
      const LPolygon = L.geoJSON(geometry);
      const center = LPolygon.getBounds().getCenter();
      const [lat, lng] = geometry.coordinates[0][0] as [number, number];
      const diagonal = map.distance(center, [lng, lat]);
      const radius = Math.sqrt(Math.pow(diagonal, 2) / 2);

      return (
        <Circle className="annotation annotation-circle" center={L.latLng(center)} radius={radius}>
          <MetaData properties={properties} />
        </Circle>
      );
    }

    // Square, Rectangle, Polygon
    return (
      <>
        {coordinatesAsMultiPolygon.map((group, index) => (
          <Polygon
            key={`polygon-${id}-${index}`}
            className="annotation annotation-polygone"
            positions={group.map(line => line.map<[number, number]>(([lat, lng]) => [lng, lat]))}
          >
            <MetaData properties={properties} />
          </Polygon>
        ))}
      </>
    );
  }

  return null;
};
