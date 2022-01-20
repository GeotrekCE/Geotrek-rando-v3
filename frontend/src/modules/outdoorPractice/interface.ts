export interface RawOutdoorPractice {
  id: string;
  order: null | number;
  sector: number;
  name: string;
  pictogram: string;
}

export interface OutdoorPractice {
  id: string;
  name: string;
  pictogram: string;
}

export interface OutdoorPracticeChoices {
  [value: string]: OutdoorPractice;
}
