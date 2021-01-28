import { Activity } from 'modules/activities/interface';
import { RawAttachment } from 'modules/activitySuggestions/interface';

export interface TrekResults {
  resultsNumber: number;
  nextPageId: string | null;
  results: TrekResult[];
}

export interface TrekResult {
  id: number;
  activityIcon: string; // TODO (call API supplémentaire surement)
  place: string;
  title: string;
  tags: string[];
  thumbnailUri: string;
  practice: Activity; // should be an object
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
