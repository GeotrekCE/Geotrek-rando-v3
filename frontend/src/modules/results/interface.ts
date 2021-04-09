import { Activity } from 'modules/activities/interface';
import { RawAttachment } from 'modules/interface';
import { TouristicContentResult } from 'modules/touristicContent/interface';

export interface SearchResults {
  resultsNumber: number;
  nextPages: {
    treks: number | null;
    touristicContents: number | null;
  };
  results: (TrekResult | TouristicContentResult)[];
}

export interface TrekResult {
  type: 'TREK';
  id: string;
  activityIcon: string; // TODO (call API supplémentaire surement)
  place: string | null;
  title: string;
  tags: string[];
  thumbnailUris: string[];
  practice: Activity | null; // should be an object
  informations: {
    duration: string | null;
    distance: string;
    elevation: string;
    difficulty: Difficulty | null;
    reservationSystem: number | null; // Todo should be string | null
  };
}

interface Difficulty {
  label: string;
  pictogramUri: string;
}

// API response

export interface RawTrekResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawTrekResult[];
}

export interface RawTrekResult {
  id: number;
  ascent: number;
  departure: string;
  difficulty: number | null;
  duration: number | null;
  themes: number[];
  departure_city: string;
  length_2d: number;
  name: string;
  reservation_system: null | number;
  attachments: RawAttachment[];
  practice: number;
}

export interface Thumbnail {
  author: string;
  title: string;
  legend: string;
  url: string;
}
