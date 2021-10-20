import { Bbox } from 'modules/details/interface';
import { Attachment, RawAttachment } from 'modules/interface';
import {
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
  RawLineStringGeometry2D,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';
import { TouristicContentCategory } from 'modules/touristicContentCategory/interface';

export interface RawOutdoorCourse {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
}

export interface RawTouristicContentResult {
  id: string;
  attachments: RawAttachment[];
  name: string;
  category: number;
  description_teaser: string;
  themes: number[];
  types: Record<number, number[]>;
  cities: number[];
}

export interface RawTouristicContentPopupResult {
  id: string;
  attachments: RawAttachment[];
  name: string;
  cities: number[];
}

interface RawOutdoorCourseDetailsProperties extends RawOutdoorCourse {
  advice?: string;
  description?: string;
  duration?: number;
  equipment?: string;
  gear?: string;
  height?: number;
  length?: number;
  max_elevation?: number;
  min_elevation?: number;
  ratings?: any;
  ratings_description?: string;
  site: number;
  structure: number;
  type: number;
  url: string;
}

export interface RawOutdoorCourseDetails extends RawOutdoorCourse {
  id: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
  bbox: number[];
  properties: RawOutdoorCourseDetailsProperties;
}

export interface OutdoorCourse {
  id: string;
  name: string;
  attachments: Attachment[];
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry | null;
}

export interface OutdoorCourseDetails extends OutdoorCourse {
  description?: string;
  bbox: Bbox;
}
