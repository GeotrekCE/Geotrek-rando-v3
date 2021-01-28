export interface RawTouristicContentCategory {
  id: number;
  pictogram: string;
  label: string;
}

export interface TouristicContentCategory {
  label: string;
  pictogramUri: string;
}

export interface TouristicContentCategoryDictionnary {
  [id: number]: TouristicContentCategory;
}
