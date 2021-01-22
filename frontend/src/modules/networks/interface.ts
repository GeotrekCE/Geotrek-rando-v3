export interface RawNetwork {
  id: number;
  pictogram: string;
  label: string;
}

export interface NetworkDictionnary {
  [id: number]: Network;
}

export interface Network {
  label: string;
  pictogramUri: string;
}
