export interface RawCity {
  id: string;
  geometry: Geometry;
  name: string;
  published: boolean;
}

export interface Geometry {
  type: string;
  coordinates: Array<Array<Array<number[]>>>;
}
