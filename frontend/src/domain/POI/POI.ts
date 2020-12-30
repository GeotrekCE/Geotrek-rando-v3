export type POI = {
  id: number;
  geometry: {
    coordinates: number[];
  };
  description: string;
};

export type POIList = POI[];
