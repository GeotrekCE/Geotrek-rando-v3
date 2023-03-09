import { Activity } from 'modules/activities/interface';
import { Attachment, RawAttachment } from 'modules/interface';
import { TouristicContentResult } from 'modules/touristicContent/interface';
import { TouristicEventResult } from 'modules/touristicEvent/interface';
import { OutdoorSiteResult } from '../outdoorSite/interface';

export interface InformationCardTuple {
  label: 'date';
  value: [string, string];
}

export interface InformationCardLabelValues {
  label: 'types';
  value: {
    label: string;
    values: string[];
  }[];
}

interface InformationCardOthers {
  label: string;
  value: string | number;
}

export type InformationCard = (
  | InformationCardTuple
  | InformationCardLabelValues
  | InformationCardOthers
) & { pictogramUri?: string };

export interface ResultCard {
  id: string;
  name: string;
  attachments: Attachment[];
  tags?: string[];
  place: string;
  informations?: InformationCard[];
}

export interface SearchResults {
  resultsNumber: number;
  resultsNumberDetails: {
    treksCount: number;
    touristicContentsCount: number;
    outdoorSitesCount: number;
    touristicEventsCount: number;
  };
  nextPages: {
    treks: number | null;
    touristicContents: number | null;
    outdoorSites: number | null;
    touristicEvents: number | null;
  };
  previousPages: {
    treks: number | null;
    touristicContents: number | null;
    outdoorSites: number | null;
    touristicEvents: number | null;
  };
  results: (TrekResult | TouristicContentResult | OutdoorSiteResult | TouristicEventResult)[];
}
export interface TrekResult extends ResultCard {
  category: Activity | null; // should be an object
  type: 'TREK';
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
