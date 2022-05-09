import { Bbox } from 'modules/details/interface';
import { Attachment, RawAttachment, RawGeometryCollection } from 'modules/interface';
import { LineStringGeometry, PointGeometry, PolygonGeometry } from 'modules/interface';
import { SensitiveArea } from 'modules/sensitiveArea/interface';
import { OutdoorCourseType } from '../outdoorCourseType/interface';
import { OutdoorRatingWithScale } from '../outdoorRating/interface';
import { OutdoorSite } from '../outdoorSite/interface';
import { Poi } from '../poi/interface';
import { TouristicContent } from '../touristicContent/interface';

export interface RawOutdoorCourse {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawGeometryCollection;
  duration: number;
  max_elevation?: number;
  height?: number;
  length?: number;
  cities: string[];
}

interface RawOutdoorCourseDetailsProperties extends RawOutdoorCourse {
  advice?: string;
  children?: string;
  description?: string;
  equipment?: string;
  gear?: string;
  min_elevation?: number;
  ratings: number[];
  ratings_description: string;
  site: number;
  structure: number;
  type?: number;
  url: string;
  pdf: string;
}

export interface RawOutdoorCourseDetails extends RawOutdoorCourse {
  id: string;
  bbox: number[];
  properties: RawOutdoorCourseDetailsProperties;
}

export interface OutdoorCourse {
  id: string;
  name: string;
  attachments: Attachment[];
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry;
  thumbnailUris: string[];
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
  children: OutdoorSite[];
  gear: string;
  equipment: string;
  pdfUri: string;
  cities: string[];
  cities_raw: string[];
  ratings: OutdoorRatingWithScale[];
  ratingsDescription: string;
  typeCourse?: OutdoorCourseType;
  sensitiveAreas: SensitiveArea[];
}
