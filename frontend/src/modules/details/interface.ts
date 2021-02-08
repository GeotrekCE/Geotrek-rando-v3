import { Activity } from 'modules/activities/interface';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { CourseType } from 'modules/filters/courseType/interface';
import { Network } from 'modules/networks/interface';
import { Poi } from 'modules/poi/interface';
import {
  Attachment,
  RawAttachment,
  RawCoordinate,
  RawMultiPointGeometry,
  RawSegmentGeometry,
} from 'modules/interface';
import { TouristicContent } from 'modules/touristicContent/interface';
import { Accessibility } from 'modules/accessibility/interface';
import { Source } from 'modules/source/interface';
import { InformationDesk } from 'modules/informationDesk/interface';
import { Label } from 'modules/label/interface';
import { TrekResult } from 'modules/results/interface';

export interface RawDetails {
  type: string;
  bbox: number[];
  geometry: RawSegmentGeometry;
  properties: RawDetailsProperties;
}

export interface RawDetailsProperties {
  id: number;
  name: string;
  departure: string;
  attachments: RawAttachment[];
  practice: number;
  public_transport: string;
  access: string;
  advised_parking: string;
  description_teaser: string;
  ambiance: string;
  themes: number[];
  difficulty: number | null;
  duration: number | null;
  length_2d: number;
  ascent: number;
  route: number;
  networks: number[];
  description: string;
  parking_location: RawCoordinate;
  pdf: string;
  gpx: string;
  kml: string;
  cities: string[];
  disabled_infrastructure: string;
  accessibilities: number[];
  source: number[];
  information_desks: number[];
  labels: number[];
  advice: string;
  points_reference: RawMultiPointGeometry | null;
  children: number[];
}

// Fields parsed with react-html-parser in page
export interface DetailsHtml {
  transport: string;
  access_parking: string;
  description_teaser: string;
  ambiance: string;
  description: string;
  disabledInfrastructure: string;
  advice: string;
}

export interface DetailsInformation {
  duration: string | null;
  distance: string | null;
  elevation: string | null;
  difficulty: Difficulty | null;
  courseType: CourseType | null;
  networks: Network[];
}

interface Coordinate {
  x: number;
  y: number;
}

interface Bbox {
  corner1: Coordinate;
  corner2: Coordinate;
}

export interface Details extends DetailsHtml {
  practice: Activity;
  title: string;
  place?: string;
  imgs: Attachment[];
  tags: string[];
  informations: DetailsInformation;
  pois: Poi[];
  trekGeometry: Coordinate[];
  trekDeparture: Coordinate;
  trekArrival: Coordinate;
  touristicContents: TouristicContent[];
  parkingLocation: Coordinate;
  pdfUri: string;
  gpxUri: string;
  kmlUri: string;
  accessibilities: Accessibility[];
  sources: Source[];
  informationDesks: InformationDesk[];
  labels: Label[];
  pointsReference: Coordinate[] | null;
  bbox: Bbox;
  children: TrekResult[];
}

export interface RawTrekChildIds {
  children: string[];
}

export interface RawTrekName {
  name: string;
}

export interface TrekChild {
  id: string;
  rank: number;
  name: string;
}
