export interface RawVigilanceAreaType {
  id: number;
  name:
    | {
        [key: string]: string;
      }
    | string;
  parent?: number | null;
  pictogram: string | null;
}

export interface VigilanceAreaType {
  id: string;
  name: string;
  rawName?: string;
  parent?: number | null;
  pictogramUrl: string | null;
}
