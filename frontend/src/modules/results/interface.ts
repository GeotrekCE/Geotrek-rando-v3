import { Activity } from 'modules/activities/interface';
import { GeometryObject, ImageFromAttachment, RawAttachment } from 'modules/interface';
import { TouristicContentResult } from 'modules/touristicContent/interface';
import { TouristicEventResult } from 'modules/touristicEvent/interface';
import { Network } from 'modules/networks/interface';
import { CourseType } from 'modules/filters/courseType/interface';
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

export interface InformationCardArray {
  label: 'networks';
  value: Network[] | [];
}

interface InformationCardOthers {
  label: string;
  value: string | number;
}

export type InformationCard = (
  | InformationCardTuple
  | InformationCardLabelValues
  | InformationCardArray
  | InformationCardOthers
) & { pictogramUri?: string };

export interface ResultCard {
  id: string;
  name: string;
  images: ImageFromAttachment[];
  tags?: string[];
  place: string | null;
  informations?: InformationCard[];
  geometry?: GeometryObject;
}

export interface SearchParams {
  treks: number | null;
  touristicContents: number | null;
  outdoorSites: number | null;
  touristicEvents: number | null;
}

export interface SearchResults {
  resultsNumber: number;
  resultsNumberDetails: {
    treksCount: number;
    touristicContentsCount: number;
    outdoorSitesCount: number;
    touristicEventsCount: number;
  };
  nextPages: SearchParams;
  previousPages: SearchParams;
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
  descent: number;
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
  networks: number[];
  route: number | null;
  courseType?: CourseType | null;
}

export interface Thumbnail {
  author: string;
  title: string;
  legend: string;
  url: string;
}
