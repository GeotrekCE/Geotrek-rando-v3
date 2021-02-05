import { Coordinate3D, RawAttachment, RawLineStringGeometry3D } from 'modules/interface';

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
  geometry: RawLineStringGeometry3D;
}

export interface TrekGeometryResult {
  geometry: Coordinate3D[];
}
