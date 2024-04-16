import {
  Coordinate3D,
  ImageFromAttachment,
  RawAttachment,
  RawPointGeometry3D,
} from 'modules/interface';
import { PoiType } from 'modules/poiType/interface';
import { RawViewPoint, ViewPoint } from 'modules/viewPoint/interface';

export interface RawPoi {
  id: number;
  name: string;
  description: string;
  type: number;
  attachments: RawAttachment[];
  geometry: RawPointGeometry3D;
  view_points: RawViewPoint[];
}

export interface Poi {
  id: string;
  name: string;
  description?: string;
  thumbnails: ImageFromAttachment[];
  images: ImageFromAttachment[];
  type: PoiType;
  geometry: Coordinate3D;
  viewPoints?: ViewPoint[];
}
