import { TrekRatingScale } from '../trekRatingScale/interface';

export interface RawTrekRating {
  id: string;
  name: string;
  description: string;
  scale: number;
  order: number;
  color: string;
}

export interface TrekRating {
  id: string;
  name: string;
  description: string;
  scale: number;
  order: number;
  color: string;
}

export interface TrekRatingWithScale extends Omit<TrekRating, 'scale'> {
  scale?: TrekRatingScale;
}

export interface TrekRatingChoices {
  [value: string]: TrekRating;
}

export interface TrekRatingMapping {
  [id: string]: TrekRating[];
}
