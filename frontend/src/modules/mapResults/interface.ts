import { Activity } from 'modules/activities/interface';
import { RawLineStringGeometry2D, RawPointGeometry2D, RawPolygonGeometry } from 'modules/interface';
import { RawOutdoorSite } from '../outdoorSite/interface';

export type MapResult = {
  id: number;
  location: { x: number; y: number } | null;
  practice?: Activity;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE';
};

export type MapResults = MapResult[];

export interface RawTrekMapResults {
  count: number;
  next: string | null;
  results: RawTrekMapResult[];
}

export interface RawTrekMapResult {
  id: number;
  departure_geom: [number, number] | null;
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

export interface RawOutdoorSiteMapResults {
  count: number;
  next: string | null;
  results: RawOutdoorSite[];
}
