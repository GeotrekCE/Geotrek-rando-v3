export interface RawOutdoorRating {
  id: string;
  name: string;
  description: string;
  scale: number;
  order: number;
  color: string;
}

export interface OutdoorRating {
  id: string;
  name: string;
  description: string;
  scale: number;
  order: number;
  color: string;
}

export interface OutdoorRatingChoices {
  [value: string]: OutdoorRating;
}

export interface OutdoorRatingMapping {
  [id: string]: OutdoorRating[];
}
