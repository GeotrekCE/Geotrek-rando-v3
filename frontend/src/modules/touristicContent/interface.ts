import { RawAttachment } from 'modules/interface';
import { TouristicContentCategory } from 'modules/touristicContentCategory/interface';

export interface RawTouristicContent {
  attachments: RawAttachment[];
  name: string;
  category: number;
  description_teaser: string;
}

export interface TouristicContent {
  name: string;
  description?: string;
  thumbnailUris: string[];
  logoUri?: string;
  category: TouristicContentCategory;
}
