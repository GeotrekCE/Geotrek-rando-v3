export interface RawThemes {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawTheme[];
}

export interface RawTheme {
  id: number;
  label: string;
  pictogram: string;
}
