import { Bbox, WebLink } from 'modules/details/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import {
  GeometryCollection,
  ImageFromAttachment,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
  RawAttachment,
  RawGeometryCollection,
  RawWebLink,
} from 'modules/interface';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { Service } from 'modules/service/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { RawViewPoint, ViewPoint } from 'modules/viewPoint/interface';
import { Activity } from '../activities/interface';
import { InformationDesk } from '../informationDesk/interface';
import { Label } from '../label/interface';
import { OutdoorCourseResult } from '../outdoorCourse/interface';
import { OutdoorPractice } from '../outdoorPractice/interface';
import { OutdoorRatingWithScale } from '../outdoorRating/interface';
import { OutdoorSiteType } from '../outdoorSiteType/interface';
import { Poi } from '../poi/interface';
import { ResultCard, TrekResult } from '../results/interface';
import { Source } from '../source/interface';
import { TouristicContent } from '../touristicContent/interface';

export interface RawOutdoorSite {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawGeometryCollection;
  themes?: number[];
  practice: number;
  period?: string;
  wind?: string[];
  orientation?: string[];
  cities: string[];
}

interface RawOutdoorSiteDetailsProperties extends RawOutdoorSite {
  accessibility?: string;
  advice?: string;
  ambiance?: string;
  children: number[];
  description?: string;
  description_teaser?: string;
  information_desks?: number[];
  labels?: number[];
  managers?: number[];
  parent?: string;
  ratings?: number[];
  sector?: string;
  source?: number[];
  structure?: number;
  type?: number;
  url?: string;
  courses: number[];
  web_links?: RawWebLink[];
  pdf: string;
  ratings_description: string;
  view_points: RawViewPoint[];
}

export interface RawOutdoorSiteDetails extends RawOutdoorSite {
  id: string;
  bbox: number[];
  properties: RawOutdoorSiteDetailsProperties;
}

export interface OutdoorSiteResult extends ResultCard {
  category: Activity | null;
  type: 'OUTDOOR_SITE';
}

export interface OutdoorSite {
  id: string;
  name: string;
  images: ImageFromAttachment[];
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry
    | GeometryCollection;
  themes: string[];
  category: Activity | null;
  period: string | null;
  wind: string[];
  orientation: string[];
  place: string;
}

export interface OutdoorSiteDetails extends OutdoorSite {
  accessibility?: string | null;
  description?: string;
  descriptionTeaser?: string;
  bbox: Bbox;
  ambiance?: string;
  advice?: string;
  labels?: Label[];
  source?: Source[];
  informationDesks?: InformationDesk[];
  webLinks?: WebLink[] | null;
  pois: Poi[];
  touristicContents: TouristicContent[];
  children: OutdoorSiteResult[];
  courses: OutdoorCourseResult[];
  access: TrekResult[];
  pdfUri: string;
  practice: OutdoorPractice | null;
  cities: string[];
  cities_raw: string[];
  ratings: OutdoorRatingWithScale[];
  ratingsDescription: string | null;
  signage: SignageDictionary | null;
  service: Service[] | null;
  infrastructure: InfrastructureDictionary | null;
  typeSite: OutdoorSiteType | null;
  sensitiveAreas: SensitiveArea[];
  viewPoints: ViewPoint[];
}
