export interface TrekResults {
  resultsNumber: number;
  results: TrekResult[];
}

export interface TrekResult {
  activityIcon: string; // TODO (call API supplémentaire surement)
  place: string;
  title: string;
  tags: string[];
  informations: {
    duration: string | null;
    distance: string;
    elevation: string;
    difficulty: string | null;
    reservationSystem: number | null; // Todo should be string | null
  };
}

// API response

export interface RawTrekResults {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawTrekResult[];
}

export interface RawTrekResult {
  ascent: number;
  departure: string;
  difficulty: number | null;
  duration: number | null;
  themes: number[];
  length_2d: number;
  name: string;
  reservation_system: null | number;
}
