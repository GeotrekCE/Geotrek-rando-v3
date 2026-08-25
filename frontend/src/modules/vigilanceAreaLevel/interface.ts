export interface RawVigilanceAreaLevel {
  id: number;
  name: {
    [key: string]: string;
  } | string;
  color: string | null;
  level: number | null;
  pictogram: string | null;
}

export interface VigilanceAreaLevel {
  id: string;
  name: string;
  color: string | null;
  level: number | null;
  pictogramUrl: string | null;
}
