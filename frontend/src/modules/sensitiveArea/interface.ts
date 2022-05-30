import {
  MultiPolygonGeometry,
  PolygonGeometry,
  RawMultiPolygonGeometry,
  RawPolygonGeometry,
} from 'modules/interface';
import { SensitiveAreaPractice } from 'modules/sensitiveAreaPractice/interface';

// This type is an array of 12 booleans, one for each calendar month, each indicating if the sensitive area is active during the month
export type MonthlyValidity = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
];

export interface RawSensitiveArea {
  id: number;
  contact: string;
  description: string;
  elevation: string | null;
  geometry: RawPolygonGeometry | RawMultiPolygonGeometry;
  info_url: string;
  kml_url: string;
  name: string;
  period: MonthlyValidity;
  practices: number[];
  species_id: number;
  structure: string;
  url: string;
}

export type SensitiveAreaGeometry = Pick<SensitiveArea, 'color' | 'geometry'>;

export interface SensitiveArea {
  name: string | null;
  infoUrl: string | null;
  description: string | null;
  contact: string | null;
  period: MonthlyValidity | null;
  practices: SensitiveAreaPractice[];
  color: string;
  geometry: PolygonGeometry | MultiPolygonGeometry;
}
