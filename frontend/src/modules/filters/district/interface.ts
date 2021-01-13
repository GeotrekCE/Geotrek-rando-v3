export interface RawDistricts {
  count: number;
  next: string;
  previous: null;
  results: RawDistrict[];
}

export interface RawDistrict {
  id: string;
  geometry: Geometry;
  name: string;
  published: boolean;
}

export interface Geometry {
  type: string;
  coordinates: Array<Array<Array<number[]>>>;
}
