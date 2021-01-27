import { Activity } from 'modules/activities/interface';

export type MapResults = {
  id: number;
  location: { x: number; y: number } | null;
  practice: Activity;
}[];

export interface RawMapResults {
  count: number;
  next: string | null;
  results: RawMapResult[];
}

export interface RawMapResult {
  id: number;
  parking_location: number[] | null;
  practice: number;
}
