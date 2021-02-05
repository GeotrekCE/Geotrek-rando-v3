import { RawAttachment } from 'modules/interface';
import { Coordinate, RawLineStringGeometry2D } from 'modules/interface';

export interface RawTrekPopupResult {
  name: string;
  departure: string;
  attachments: RawAttachment[];
}

export interface TrekPopupResult {
  title: string;
  place: string;
  imgUrl: string;
}

export interface RawTrekGeometryResult {
  geometry: RawLineStringGeometry2D;
}

export interface TrekGeometryResult {
  geometry: Coordinate[];
}
