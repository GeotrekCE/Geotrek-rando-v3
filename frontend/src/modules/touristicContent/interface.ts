import { RawAttachment } from 'modules/activitySuggestions/interface';
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
  thumbnailUri: string;
  logoUri?: string;
  category: TouristicContentCategory;
}
