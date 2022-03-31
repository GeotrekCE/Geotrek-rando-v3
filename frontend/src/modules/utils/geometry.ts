import {
  Coordinate2D,
  Coordinate3D,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
  RawCoordinate2D,
  RawCoordinate3D,
  RawGeometryCollection,
  RawLineStringGeometry2D,
  RawMultiLineStringGeometry,
  RawMultiPointGeometry2D,
  RawMultiPolygonGeometry,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';

export const adaptGeometry2D = (geometry: RawCoordinate2D | RawCoordinate3D): Coordinate2D => ({
  x: geometry[0],
  y: geometry[1],
});

export const adaptGeometry3D = (geometry: RawCoordinate3D): Coordinate3D => ({
  x: geometry[0],
  y: geometry[1],
  z: geometry[2],
});

/** Adapt any type of raw geometry */
export const adaptGeometry = (
  geometry:
    | RawPolygonGeometry
    | RawMultiPolygonGeometry
    | RawLineStringGeometry2D
    | RawMultiLineStringGeometry
    | RawPointGeometry2D
    | RawMultiPointGeometry2D,
):
  | PolygonGeometry
  | MultiPolygonGeometry
  | LineStringGeometry
  | MultiLineStringGeometry
  | PointGeometry
  | MultiPointGeometry => {
  switch (geometry.type) {
    case 'Polygon':
      return adaptPolygonGeometry(geometry);

    case 'MultiPolygon':
      return adaptMultiPolygonGeometry(geometry);

    case 'LineString':
      return adaptLineString(geometry);

    case 'MultiLineString':
      return adaptMultiLineString(geometry);

    case 'Point':
      return adaptPoint(geometry);

    case 'MultiPoint':
      return adaptMultiPoint(geometry);
  }
};

export const adaptPolygonGeometry = (geometry: RawPolygonGeometry): PolygonGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(line => line.map(point => adaptGeometry2D(point))),
});

export const adaptMultiPolygonGeometry = (
  geometry: RawMultiPolygonGeometry,
): MultiPolygonGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(group =>
    group.map(line => line.map(point => adaptGeometry2D(point))),
  ),
});

export const adaptLineString = (geometry: RawLineStringGeometry2D): LineStringGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(point => adaptGeometry2D(point)),
});
export const adaptMultiLineString = (
  geometry: RawMultiLineStringGeometry,
): MultiLineStringGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(group => group.map(point => adaptGeometry2D(point))),
});

export const adaptPoint = (geometry: RawPointGeometry2D): PointGeometry => ({
  type: geometry.type,
  coordinates: adaptGeometry2D(geometry.coordinates),
});

export const adaptMultiPoint = (geometry: RawMultiPointGeometry2D): MultiPointGeometry => ({
  type: geometry.type,
  coordinates: geometry.coordinates.map(point => adaptGeometry2D(point)),
});
export const extractFirstPointOfGeometry = (
  geometry:
    | RawPolygonGeometry
    | RawMultiPolygonGeometry
    | RawLineStringGeometry2D
    | RawMultiLineStringGeometry
    | RawPointGeometry2D
    | RawMultiPointGeometry2D
    | RawGeometryCollection
    | null,
): Coordinate2D | null => {
  if (geometry === null) return null;
  switch (geometry.type) {
    case 'Polygon':
      return adaptGeometry2D(geometry.coordinates[0][0]);

    case 'MultiPolygon':
      return adaptGeometry2D(geometry.coordinates[0][0][0]);

    case 'LineString':
      return adaptGeometry2D(geometry.coordinates[0]);

    case 'MultiLineString':
      return adaptGeometry2D(geometry.coordinates[0][0]);

    case 'Point':
      return adaptGeometry2D(geometry.coordinates);

    case 'MultiPoint':
      return adaptGeometry2D(geometry.coordinates[0]);

    case 'GeometryCollection':
      return extractFirstPointOfGeometry(geometry.geometries[0]);

    default:
      return null;
  }
};

export function flattenMultiLineStringCoordinates<T>(coordinates: T[][]): T[] {
  return coordinates.reduce<T[]>(
    (reducedInLineCoordinates, currentLine) => [...reducedInLineCoordinates, ...currentLine],
    [],
  );
}
