export interface RawPoiType {
  id: number;
  pictogram: string;
  label: string;
}

export interface PoiType {
  label: string;
  pictogramUri: string;
}

export interface PoiTypeDictionnary {
  [id: number]: PoiType;
}
