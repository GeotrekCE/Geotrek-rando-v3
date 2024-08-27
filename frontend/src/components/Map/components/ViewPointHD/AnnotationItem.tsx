import React from 'react';
import L from 'leaflet';
import SVG from 'react-inlinesvg';
import { GeoJsonProperties, Geometry } from 'geojson';
import { Circle, CircleMarker, Marker, Polygon, Polyline, Tooltip, useMap } from 'react-leaflet';
import Image from 'next/image';
import { TrekMarker } from 'components/Map/Markers/TrekMarker';
import { optimizeAndDefineColor } from 'stylesheet';

type Props = {
  geometry: Geometry;
  properties: GeoJsonProperties;
  id: string;
};

const Icon = React.memo(function Icon({ pictogramUri, ...props }: { pictogramUri: string }) {
  if (!pictogramUri) {
    return null;
  }

  if (pictogramUri.endsWith('.svg')) {
    return (
      <SVG
        src={pictogramUri}
        className="size-6"
        preProcessor={optimizeAndDefineColor()}
        {...props}
      />
    );
  }
  return <Image loading="lazy" src={pictogramUri} width={16} height={16} alt="" {...props} />;
});

const MetaData = ({ properties }: { properties: GeoJsonProperties }) => {
  if (properties === null || !properties.name) {
    return null;
  }
  const pictogramUri = properties?.category?.pictogramUri;

  return (
    <Tooltip>
      <span className="flex flex-wrap items-center gap-2">
        {Boolean(properties.category?.label) && (
          <>
            <Icon pictogramUri={pictogramUri} />
            <span>{properties.category.label}</span>
          </>
        )}

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

    const pictogramUri = properties?.category?.pictogramUri;

    return (
      <>
        {coordinatesAsMultiPoint.map((coordinates, index) => {
          const [lat, lng] = coordinates;
          if (pictogramUri) {
            return (
              <Marker
                key={`point-${id}-${index}`}
                position={[lng, lat]}
                icon={TrekMarker(pictogramUri as string, 1)}
              >
                <MetaData properties={properties} />
              </Marker>
            );
          }
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
