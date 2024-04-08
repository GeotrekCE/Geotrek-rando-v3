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
  RawPointGeometry3D,
  RawWebLink,
} from 'modules/interface';
import { TouristicContent } from 'modules/touristicContent/interface';
import { Accessibility, AccessibilityLevel } from 'modules/accessibility/interface';
import { Source } from 'modules/source/interface';
import { InformationDesk } from 'modules/informationDesk/interface';
import { Label } from 'modules/label/interface';
import { TrekResult } from 'modules/results/interface';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { Service } from 'modules/service/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { RawViewPoint, ViewPoint } from 'modules/viewPoint/interface';
import { TrekRatingWithScale } from '../trekRating/interface';

export interface RawDetails {
  type: string;
  bbox: number[];
  geometry: RawLineStringGeometry3D | RawMultiLineStringGeometry3D | RawPointGeometry3D;
  properties: RawDetailsProperties;
}

export interface AccessibilityAttachment {
  info_accessibility: 'slope' | 'width' | 'signage';
  author: string;
  thumbnail: string;
  legend: string;
  title: string;
  url: string;
}

export interface RawDetailsProperties {
  access: string;
  accessibilities: number[];
  accessibility_level: number | null;
  accessibility_advice?: string;
  accessibility_covering?: string;
  accessibility_exposure?: string;
  accessibility_signage?: string;
  accessibility_slope?: string;
  accessibility_width?: string;
  attachments_accessibility: AccessibilityAttachment[];
  advice: string;
  advised_parking: string;
  altimetric_profile: string;
  ambiance: string;
  arrival_city: string;
  arrival: string;
  ascent: number;
  attachments: RawAttachment[];
  children: number[];
  cities: string[];
  departure_city: string;
  departure: string;
  description_teaser: string;
  description: string;
  difficulty: number | null;
  disabled_infrastructure: string;
  duration: number | null;
  elevation_area_url: string;
  gpx: string;
  id: number;
  information_desks: number[];
  kml: string;
  labels: number[];
  length_2d: number;
  descent: number;
  route: number;
  name: string;
  networks: number[];
  parking_location: RawCoordinate2D | null;
  pdf: string;
  points_reference: RawMultiPointGeometry | null;
  practice: number | null;
  public_transport: string;
  reservation_id?: string;
  source: number[];
  themes: number[];
  web_links: RawWebLink[];
  gear: string | null;
  ratings: number[];
  ratings_description: string;
  view_points: RawViewPoint[];
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
  gear: string | null;
  ratings: TrekRatingWithScale[];
  ratingsDescription: string;
}

export interface DetailsInformation {
  duration?: string | null;
  distance?: string | null;
  elevation?: string | null;
  negativeElevation?: string | null;
  difficulty?: Difficulty | null;
  courseType?: CourseType | null;
  networks?: Network[];
}

export type Bounds = [[number, number], [number, number]];

export interface Bbox {
  corner1: Coordinate2D;
  corner2: Coordinate2D;
}

export interface TrekResultWithGeometryChild extends TrekResult {
  childGeometry?: TrekChildGeometry;
}
export interface RawTrekChildGeometry {
  geometry: RawLineStringGeometry3D | RawMultiLineStringGeometry3D | RawPointGeometry3D;
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
  accessbilityLevel: AccessibilityLevel | null;
  accessibility_advice: string | null;
  accessibility_covering: string | null;
  accessibility_exposure: string | null;
  accessibility_signage: string | null;
  accessibility_slope: string | null;
  accessibility_width: string | null;
  attachmentsAccessibility: AccessibilityAttachment[];
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
  children: TrekResultWithGeometryChild[];
  sensitiveAreas: SensitiveArea[];
  departure: string;
  arrival: string;
  cities: string[];
  cities_raw: string[];
  webLinks: WebLink[];
  elevationAreaUrl: string;
  altimetricProfileUrl: string;
  length2d: number;
  reservation: Reservation | null;
  reservation_id: string | null;
  signage: SignageDictionary | null;
  service: Service[] | null;
  infrastructure: InfrastructureDictionary | null;
  viewPoints: ViewPoint[];
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
