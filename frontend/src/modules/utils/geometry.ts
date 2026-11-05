import {
  Coordinate2D,
  Coordinate3D,
  GeometryCollection,
  GeometryObject,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
  RawCoordinate2D,
  RawCoordinate3D,
  RawGeometryCollection,
  RawGeometryObject,
  RawLineStringGeometry2D,
  RawLineStringGeometry3D,
  RawMultiLineStringGeometry,
  RawMultiLineStringGeometry3D,
  RawMultiPointGeometry2D,
  RawMultiPolygonGeometry,
  RawPointGeometry2D,
  RawPointGeometry3D,
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
export const adaptGeometry = (geometry: RawGeometryObject): GeometryObject => {
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

    case 'GeometryCollection':
      return adaptGeometryCollection(geometry);
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

export const adaptGeometryCollection = (geometry: RawGeometryCollection): GeometryCollection => ({
  type: geometry.type,
  geometries: geometry.geometries.map(geom => adaptGeometry(geom)),
});
export const extractFirstPointOfGeometry = (
  geometry:
    | RawPolygonGeometry
    | RawMultiPolygonGeometry
    | RawLineStringGeometry2D
    | RawLineStringGeometry3D
    | RawMultiLineStringGeometry
    | RawMultiLineStringGeometry3D
    | RawPointGeometry2D
    | RawPointGeometry3D
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

export function getTrekGeometryAsLineStringCoordinates(
  geometry: RawLineStringGeometry3D | RawMultiLineStringGeometry3D | RawPointGeometry3D,
) {
  if (geometry.type === 'MultiLineString') {
    return flattenMultiLineStringCoordinates(geometry.coordinates);
  }
  // Sometimes a geometry from API is broken and returns a Point
  if (geometry.type === 'Point') {
    return [geometry.coordinates, geometry.coordinates];
  }
  return geometry.coordinates;
}

/**
 * Calculates the exact area-weighted geometric center of mass (centroid) [lat, lng] of a 2D polygon.
 *
 * Algorithm: Green's Theorem / Shoelace Polygon Area-Weighted Centroid Formula.
 * Deduplicates GeoJSON closed ring start/end vertices to avoid centroid bias.
 *
 * @see https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
 * @see src/modules/utils/__tests__/geometry.test.ts
 */
export const getPolygonCentroid = (positions: RawCoordinate2D[]): RawCoordinate2D => {
  if (!positions || positions.length === 0) return [0, 0];
  if (positions.length === 1) return positions[0];
  if (positions.length === 2) {
    return [(positions[0][0] + positions[1][0]) / 2, (positions[0][1] + positions[1][1]) / 2];
  }

  // Remove duplicated closing point if GeoJSON closed ring
  let pts = positions;
  const first = positions[0];
  const last = positions[positions.length - 1];
  if (positions.length > 2 && first[0] === last[0] && first[1] === last[1]) {
    pts = positions.slice(0, -1);
  }

  let area = 0;
  let latSum = 0;
  let lngSum = 0;
  const numPoints = pts.length;

  for (let i = 0; i < numPoints; i++) {
    const p1 = pts[i];
    const p2 = pts[(i + 1) % numPoints];

    // Cross product factor (Shoelace formula)
    const factor = p1[0] * p2[1] - p2[0] * p1[1];
    area += factor;
    latSum += (p1[0] + p2[0]) * factor;
    lngSum += (p1[1] + p2[1]) * factor;
  }

  area /= 2;

  // Fallback to vertex mean if area is near 0 (collinear points or degenerate polygon)
  if (Math.abs(area) < 1e-9) {
    let sumLat = 0;
    let sumLng = 0;
    pts.forEach(([lat, lng]) => {
      sumLat += lat;
      sumLng += lng;
    });
    return [sumLat / pts.length, sumLng / pts.length];
  }

  const factor = 6 * area;
  return [latSum / factor, lngSum / factor];
};
