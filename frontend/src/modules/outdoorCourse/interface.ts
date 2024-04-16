import { Bbox } from 'modules/details/interface';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
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
} from 'modules/interface';
import { SignageDictionary } from 'modules/signage/interface';
import { Service } from 'modules/service/interface';
import { InfrastructureDictionary } from 'modules/infrastructure/interface';
import { ResultCard } from 'modules/results/interface';
import { OutdoorCourseType } from '../outdoorCourseType/interface';
import { OutdoorRatingWithScale } from '../outdoorRating/interface';
import { Poi } from '../poi/interface';
import { TouristicContent } from '../touristicContent/interface';

export interface RawOutdoorCourse {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawGeometryCollection;
  duration: number | null;
  max_elevation?: number;
  height?: number | null;
  length?: number;
  cities: string[];
}

export interface RawOutdoorCourseDetailsProperties extends RawOutdoorCourse {
  accessibility?: string;
  advice?: string;
  children?: number[];
  description?: string;
  equipment?: string;
  gear?: string;
  min_elevation?: number;
  ratings: number[];
  ratings_description: string;
  site: number;
  structure: number;
  type?: number | null;
  url: string;
  pdf: string;
}

export interface RawOutdoorCourseDetails extends RawOutdoorCourse {
  id: string;
  bbox: number[];
  properties: RawOutdoorCourseDetailsProperties;
}

export interface OutdoorCourseResult extends ResultCard {
  type: 'OUTDOOR_COURSE';
}

export interface OutdoorCourse {
  accessibility?: string;
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
  thumbnails: ImageFromAttachment[];
  duration: string | null;
  maxElevation: number;
  height: string | null;
  length: string | null;
  place: string;
}

export interface OutdoorCourseDetails extends OutdoorCourse {
  description?: string;
  bbox: Bbox;
  touristicContents: TouristicContent[];
  pois: Poi[];
  advice?: string;
  gear: string;
  equipment: string;
  pdfUri: string;
  cities: string[];
  cities_raw: string[];
  ratings: OutdoorRatingWithScale[];
  ratingsDescription: string | null;
  typeCourse: OutdoorCourseType | null;
  sensitiveAreas: SensitiveArea[];
  signage: SignageDictionary | null;
  service: Service[] | null;
  infrastructure: InfrastructureDictionary | null;
}
