export interface RawCity {
  id: string;
  name: string;
  code: string;
}

export interface City {
  id: string;
  name: string;
  code: string;
}

export interface CityDictionnary {
  [id: string]: City;
}
