export type RawCoordinate = number[];

export interface RawGeometry {
  type: string;
  coordinates: RawCoordinate[];
}

export interface APICallsConfig {
  searchResultsPageSize: number;
}
