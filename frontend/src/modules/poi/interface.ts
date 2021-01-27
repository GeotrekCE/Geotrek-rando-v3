import { PoiType } from 'modules/poiType/interface';
import { Thumbnail } from 'modules/results/interface';

export interface RawPoi {
  name: string;
  description: string;
  pictures: Thumbnail[];
  type: number;
  trek: number;
}

export interface Poi {
  name: string;
  description?: string;
  thumbnailUri?: string;
  type: PoiType;
}
