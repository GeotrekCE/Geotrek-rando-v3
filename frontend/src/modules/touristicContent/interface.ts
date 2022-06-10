import { Bbox } from 'modules/details/interface';
import {
  Attachment,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
  RawAttachment,
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

export interface RawTouristicContentPopupResult {
  id: string;
  attachments: RawAttachment[];
  name: string;
  cities: number[];
}

interface RawTouristicContentDetailsProperties extends RawTouristicContent {
  accessibility?: string;
  practical_info?: string;
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
  id: string;
  type: string;
  bbox: number[];
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
  properties: RawTouristicContentDetailsProperties;
}

export interface TouristicContent {
  accessibility?: string | null;
  practicalInfo?: string | null;
  id: string;
  name: string;
  descriptionTeaser: string;
  thumbnailUris: string[];
  attachments: Attachment[];
  category: TouristicContentCategory;
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry
    | null;
  logoUri: string | null;
}

export interface TouristicContentResult {
  id: string;
  type: 'TOURISTIC_CONTENT';
  name: string;
  thumbnailUris: string[];
  attachments: Attachment[];
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
  cities_raw: string[];
  themes: string[];
  pdfUri: string;
  types: TouristicContentDetailsType[];
  bbox: Bbox;
  type: 'TOURISTIC_CONTENT';
}

export interface TouristicContentDetailsType {
  label: string;
  values: string[];
}
