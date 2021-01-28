import { RawAttachment } from 'modules/activitySuggestions/interface';
import { PoiType } from 'modules/poiType/interface';

export interface RawPoi {
  name: string;
  description: string;
  type: number;
  trek: number;
  attachments: RawAttachment[];
}

export interface Poi {
  name: string;
  description?: string;
  thumbnailUri: string | null;
  type: PoiType;
}
