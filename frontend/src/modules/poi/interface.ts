import { RawAttachment } from 'modules/activitySuggestions/interface';
import { PoiType } from 'modules/poiType/interface';
import { Coordinate, RawPointGeometry } from 'modules/interface';

export interface RawPoi {
  name: string;
  description: string;
  type: number;
  trek: number;
  attachments: RawAttachment[];
  geometry: RawPointGeometry;
}

export interface Poi {
  name: string;
  description?: string;
  thumbnailUri: string | null;
  type: PoiType;
  geometry: Coordinate;
}
