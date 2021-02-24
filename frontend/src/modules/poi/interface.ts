import { Coordinate3D, RawAttachment, RawPointGeometry3D } from 'modules/interface';
import { PoiType } from 'modules/poiType/interface';

export interface RawPoi {
  id: number;
  name: string;
  description: string;
  type: number;
  trek: number;
  attachments: RawAttachment[];
  geometry: RawPointGeometry3D;
}

export interface Poi {
  id: string;
  name: string;
  description?: string;
  thumbnailUris: string[];
  type: PoiType;
  geometry: Coordinate3D;
}
