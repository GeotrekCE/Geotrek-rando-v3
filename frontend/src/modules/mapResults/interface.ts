import { Activity } from 'modules/activities/interface';

export type MapResults = {
  id: number;
  location: { x: number; y: number } | null;
  practice: Activity;
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
