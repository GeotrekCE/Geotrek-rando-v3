import { RawAttachment } from 'modules/interface';
import { Coordinate2D, RawPointGeometry } from 'modules/interface';
import { TouristicContentCategory } from 'modules/touristicContentCategory/interface';

export interface RawTouristicContent {
  attachments: RawAttachment[];
  name: string;
  category: number;
  description_teaser: string;
  geometry: RawPointGeometry | null;
}

export interface TouristicContent {
  name: string;
  description?: string;
  thumbnailUris: string[];
  logoUri?: string;
  category: TouristicContentCategory;
  geometry: Coordinate2D | null;
}
