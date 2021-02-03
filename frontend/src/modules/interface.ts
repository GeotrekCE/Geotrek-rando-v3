export type RawCoordinate = number[];

export interface RawSegmentGeometry {
  type: string;
  coordinates: RawCoordinate[];
}

export interface RawPointGeometry {
  type: 'Point';
  coordinates: RawCoordinate;
}

export interface APICallsConfig {
  searchResultsPageSize: number;
}

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}
