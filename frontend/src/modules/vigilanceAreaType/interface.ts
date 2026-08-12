export interface RawVigilanceAreaType {
  id: number;
  name: {
    [key: string]: string;
  } | string;
  pictogram: string | null;
}

export interface VigilanceAreaType {
  id: string;
  name: string;
  pictogramUrl: string | null;
}
