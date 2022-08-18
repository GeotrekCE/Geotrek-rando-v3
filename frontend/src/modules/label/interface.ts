export interface RawLabel {
  id: number;
  advice: string;
  pictogram: string | null;
  name: string;
  filter: boolean;
}

export interface Label {
  id: number;
  advice: string;
  pictogramUri: string | null;
  name: string;
  filter?: boolean;
}

export interface LabelDictionnary {
  [id: number]: Label;
}
