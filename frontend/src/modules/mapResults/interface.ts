export type MapResults = {
  id: number;
  location: { x: number; y: number } | null;
}[];

export interface RawMapResults {
  count: number;
  next: string | null;
  results: RawMapResult[];
}

export interface RawMapResult {
  id: number;
  parking_location: number[] | null;
}
