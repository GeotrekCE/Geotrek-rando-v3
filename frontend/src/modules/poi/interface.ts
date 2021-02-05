import { Coordinate3D, RawAttachment } from 'modules/interface';
import { PoiType } from 'modules/poiType/interface';
import { Coordinate, RawPointGeometry2D } from 'modules/interface';

export interface RawPoi {
  name: string;
  description: string;
  type: number;
  trek: number;
  attachments: RawAttachment[];
  geometry: RawPointGeometry2D;
}

export interface Poi {
  name: string;
  description?: string;
  thumbnailUris: string[];
  type: PoiType;
  geometry: Coordinate3D;
}
