import { Option } from '../filters/interface';

export interface RawTouristicContentCategory {
  id: number;
  pictogram: string;
  label: string;
  types: TouristicContentType[];
}

export interface TouristicContentType {
  id: number;
  label: string;
  values: TouristicContentTypeValue[];
}

export interface TouristicContentTypeValue {
  id: number;
  label: string;
  pictogram: string | null;
}

export interface TouristicContentCategoryMapping {
  [id: number]: { id: string; label: string; category?: string; values: Option[] }[];
}

export interface TouristicContentCategory {
  label: string;
  pictogramUri: string;
  types: TouristicContentType[];
}

export interface TouristicContentCategoryDictionnary {
  [id: number]: TouristicContentCategory;
}
