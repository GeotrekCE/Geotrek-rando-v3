import { RawLineStringGeometry2D, RawPointGeometry2D, RawPolygonGeometry } from 'modules/interface';

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
  geometry: RawPolygonGeometry | RawLineStringGeometry2D | RawPointGeometry2D;
  info_url: string;
  kml_url: string;
  name: string;
  period: MonthlyValidity;
  practices: number[];
  species_id: number;
  structure: string;
  url: string;
}

export interface SensitiveArea {
  name: string | null;
  infoUrl: string | null;
  description: string | null;
  contact: string | null;
}
