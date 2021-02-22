import { Activity } from 'modules/activities/interface';
import { RawLineStringGeometry2D, RawPointGeometry2D, RawPolygonGeometry } from 'modules/interface';

export type MapResults = {
  id: number;
  location: { x: number; y: number } | null;
  practice: Activity;
  type: 'TREK' | 'TOURISTIC_CONTENT';
}[];

export interface RawTrekMapResults {
  count: number;
  next: string | null;
  results: RawTrekMapResult[];
}

export interface RawTrekMapResult {
  id: number;
  parking_location: number[] | null;
  practice: number;
}

export interface RawTouristicContentMapResults {
  count: number;
  next: string | null;
  results: RawTouristicContentMapResult[];
}

export interface RawTouristicContentMapResult {
  id: number;
  geometry?: RawPolygonGeometry | RawLineStringGeometry2D | RawPointGeometry2D;
  category?: number;
}
