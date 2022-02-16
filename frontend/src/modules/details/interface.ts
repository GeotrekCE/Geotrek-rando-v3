import { Activity } from 'modules/activities/interface';
import { Difficulty } from 'modules/filters/difficulties/interface';
import { CourseType } from 'modules/filters/courseType/interface';
import { Network } from 'modules/networks/interface';
import { Poi } from 'modules/poi/interface';
import {
  Attachment,
  Coordinate2D,
  RawAttachment,
  RawCoordinate2D,
  RawLineStringGeometry3D,
  RawMultiLineStringGeometry3D,
  RawMultiPointGeometry,
  RawWebLink,
} from 'modules/interface';
import { TouristicContent } from 'modules/touristicContent/interface';
import { Accessibility } from 'modules/accessibility/interface';
import { Source } from 'modules/source/interface';
import { InformationDesk } from 'modules/informationDesk/interface';
import { Label } from 'modules/label/interface';
import { TrekResult } from 'modules/results/interface';
import { SensitiveArea } from 'modules/sensitiveArea/interface';

export interface RawDetails {
  type: string;
  bbox: number[];
  geometry: RawLineStringGeometry3D | RawMultiLineStringGeometry3D;
  properties: RawDetailsProperties;
}

export interface RawDetailsProperties {
  id: number;
  name: string;
  departure: string;
  arrival: string;
  cities: string[];
  attachments: RawAttachment[];
  practice: number | null;
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
  parking_location: RawCoordinate2D | null;
  pdf: string;
  gpx: string;
  kml: string;
  departure_city: string;
  arrival_city: string;
  disabled_infrastructure: string;
  accessibilities: number[];
  source: number[];
  information_desks: number[];
  labels: number[];
  advice: string;
  points_reference: RawMultiPointGeometry | null;
  children: number[];
  web_links: RawWebLink[];
  elevation_area_url: string;
  altimetric_profile: string;
  reservation_id?: string;
}

// Fields parsed with react-html-parser in page
export interface DetailsHtml {
  transport: string;
  access: string;
  parking: string;
  description_teaser: string;
  ambiance: string;
  description: string;
  disabledInfrastructure: string;
  advice: string;
}

export interface DetailsInformation {
  duration?: string | null;
  distance?: string | null;
  elevation?: string | null;
  difficulty?: Difficulty | null;
  courseType?: CourseType | null;
  networks?: Network[];
}

export type Bounds = [[number, number], [number, number]];

export interface Bbox {
  corner1: Coordinate2D;
  corner2: Coordinate2D;
}

export interface TrekResultWithGeometry extends TrekResult {
  geometry?: TrekChildGeometry;
}
export interface RawTrekChildGeometry {
  geometry: RawLineStringGeometry3D;
}
export interface TrekChildGeometry {
  id: string;
  departure: Coordinate2D;
}

export interface Reservation {
  partner: string;
  project: string;
}

export interface Details extends DetailsHtml {
  id: number;
  practice: Activity | null;
  title: string;
  place?: string;
  imgs: Attachment[];
  tags: string[];
  informations: DetailsInformation;
  pois: Poi[];
  trekGeometry: Coordinate2D[];
  trekGeoJSON: string;
  trekDeparture: Coordinate2D;
  trekArrival: Coordinate2D;
  touristicContents: TouristicContent[];
  parkingLocation: Coordinate2D | null;
  pdfUri: string;
  gpxUri: string;
  kmlUri: string;
  accessibilities: Accessibility[];
  sources: Source[];
  informationDesks: InformationDesk[];
  labels: Label[];
  pointsReference: Coordinate2D[] | null;
  bbox: Bbox;
  children: TrekResultWithGeometry[];
  sensitiveAreas: SensitiveArea[];
  departure: string;
  arrival: string;
  cities: string[];
  webLinks: WebLink[];
  elevationAreaUrl: string;
  altimetricProfileUrl: string;
  length2d: number;
  reservation: Reservation | null;
  reservation_id?: string;
}

export interface WebLink {
  name: string;
  url: string;
  category: {
    label: string;
    id: string;
    pictogram: string;
  };
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

export interface TrekFamily {
  parentId: string;
  parentName: string;
  trekChildren: TrekChild[];
}
