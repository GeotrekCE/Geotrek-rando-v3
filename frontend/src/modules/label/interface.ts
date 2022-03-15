export interface RawLabel {
  id: number;
  advice: string;
  pictogram: string; // nullable
  name: string;
  filter: boolean;
}

export interface Label {
  id: number;
  advice: string;
  pictogramUri: string;
  name: string;
  filter?: boolean;
}

export interface LabelDictionnary {
  [id: number]: Label;
}
