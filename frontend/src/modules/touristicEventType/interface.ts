export interface RawTouristicEventType {
  id: string;
  type: string;
  pictogram: string;
}

export interface TouristicEventType {
  id: string;
  type: string;
  pictogram: string;
}

export interface TouristicEventTypeChoices {
  [value: string]: TouristicEventType;
}
