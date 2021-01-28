import { Attachment } from 'domain/Trek/Trek';
import { TouristicContentCategory } from 'modules/touristicContentCategory/interface';

export interface RawTouristicContent {
  attachments: Attachment[];
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
