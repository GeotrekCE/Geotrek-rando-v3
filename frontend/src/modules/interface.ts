export type RawCoordinate = number[];

export interface RawSegmentGeometry {
  type: string;
  coordinates: RawCoordinate[];
}

export interface RawPointGeometry {
  type: 'Point';
  coordinates: RawCoordinate;
}

export interface RawMultiPointGeometry {
  type: 'MultiPoint';
  coordinates: RawCoordinate[];
}

export interface APICallsConfig {
  searchResultsPageSize: number;
}

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}
export interface RawAttachment {
  author: string;
  backend: string;
  thumbnail: string;
  legend: string;
  title: string;
  url: string;
  type: string;
}

export interface Attachment {
  author: string;
  legend: string;
  url: string;
}
