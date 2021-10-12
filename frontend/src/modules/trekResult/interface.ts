import {
  Coordinate2D,
  Coordinate3D,
  RawAttachment,
  RawLineStringGeometry3D,
  RawMultiLineStringGeometry3D,
  RawPointGeometry2D,
} from 'modules/interface';

export interface RawTrekPopupResult {
  name: string;
  departure: string;
  attachments: RawAttachment[];
}

export interface PopupResult {
  title: string;
  place: string;
  imgUrl: string;
}

export interface RawTrekGeometryResult {
  geometry: RawLineStringGeometry3D | RawMultiLineStringGeometry3D | RawPointGeometry2D;
}

export interface TrekGeometryResult {
  geometry: Coordinate3D[] | Coordinate2D[];
}
