export interface RawTouristicEventType {
  id: string;
  order: null | number;
  type: string;
  pictogram: string;
}

export interface TouristicEventType {
  id: string;
  label: string;
  pictogramUri: string;
}

export interface TouristicEventTypeChoices {
  [value: string]: TouristicEventType;
}
