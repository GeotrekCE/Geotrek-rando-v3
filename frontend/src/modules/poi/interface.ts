import { Coordinate3D, RawAttachment, RawPointGeometry3D } from 'modules/interface';
import { PoiType } from 'modules/poiType/interface';

export interface RawPoi {
  name: string;
  description: string;
  type: number;
  trek: number;
  attachments: RawAttachment[];
  geometry: RawPointGeometry3D;
}

export interface Poi {
  name: string;
  description?: string;
  thumbnailUris: string[];
  type: PoiType;
  geometry: Coordinate3D;
}
