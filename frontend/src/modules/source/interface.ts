export interface RawSource {
  id: number;
  name: string;
  website: string | null;
  pictogram: string;
}
export interface Source {
  name: string;
  website: string | null;
  pictogramUri: string;
}

export interface SourceDictionnary {
  [id: number]: Source;
}
