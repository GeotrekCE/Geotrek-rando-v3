import { Bbox } from 'modules/details/interface';
import { Attachment, RawAttachment } from 'modules/interface';
import {
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
  RawLineStringGeometry2D,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';
import { Source } from 'modules/source/interface';
import { TouristicContentCategory } from 'modules/touristicContentCategory/interface';

export interface RawTouristicContent {
  id: string;
  attachments: RawAttachment[];
  name: string;
  category: number;
  description_teaser: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
  approved: boolean;
}

export interface RawTouristicContentResult {
  id: string;
  attachments: RawAttachment[];
  name: string;
  category: number;
  description_teaser: string;
  themes: number[];
  types: Record<number, number[]>;
  cities: number[];
}

interface RawTouristicContentDetailsProperties extends RawTouristicContent {
  description: string;
  source: number[];
  contact: string;
  email: string;
  website: string;
  cities: number[];
  themes: number[];
  types: Record<number, number[]>;
  pdf: string;
  bbox: number[];
}

export interface RawTouristicContentDetails {
  type: string;
  bbox: number[];
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
  properties: RawTouristicContentDetailsProperties;
}

export interface TouristicContent {
  id: string;
  name: string;
  descriptionTeaser: string;
  thumbnailUris: string[];
  category: TouristicContentCategory;
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry | null;
  logoUri: string;
}

export interface TouristicContentResult {
  id: string;
  type: 'TOURISTIC_CONTENT';
  name: string;
  thumbnailUris: string[];
  category: TouristicContentCategory;
  place: string;
  themes: string[];
  types: TouristicContentDetailsType[];
}

export interface TouristicContentDetails extends TouristicContent {
  attachments: Attachment[];
  description: string;
  sources: Source[];
  contact: string;
  email: string;
  website: string;
  place: string;
  themes: string[];
  pdf: string;
  types: TouristicContentDetailsType[];
  bbox: Bbox;
}

export interface TouristicContentDetailsType {
  label: string;
  values: string[];
}
