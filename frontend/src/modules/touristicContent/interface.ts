import { RawAttachment } from 'modules/interface';
import {
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
  RawLineStringGeometry2D,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';
import { TouristicContentCategory } from 'modules/touristicContentCategory/interface';

export interface RawTouristicContent {
  attachments: RawAttachment[];
  name: string;
  category: number;
  description_teaser: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
}

export interface TouristicContent {
  type: 'TOURISTIC_CONTENT';
  name: string;
  description?: string;
  thumbnailUris: string[];
  logoUri?: string;
  category: TouristicContentCategory;
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry | null;
}
