import { Thumbnail } from 'modules/results/interface';

export interface RawTrekPopupResult {
  name: string;
  departure: string;
  thumbnail: Thumbnail;
}

export interface TrekPopupResult {
  title: string;
  place: string;
  imgUrl: string;
}

type RawCoordinate = number[];

interface Geometry {
  type: string;
  coordinates: RawCoordinate[];
}

export interface RawTrekGeometryResult {
  geometry: Geometry;
}

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface TrekGeometryResult {
  geometry: Coordinate[];
}
