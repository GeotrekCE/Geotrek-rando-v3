export interface RawSource {
  id: number;
  name: string;
  website: string;
  pictogram: string;
}
export interface Source {
  name: string;
  website: string;
  pictogramUri: string;
}

export interface SourceDictionnary {
  [id: number]: Source;
}
