export interface RawCity {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface CityDictionnary {
  [id: string]: City;
}
