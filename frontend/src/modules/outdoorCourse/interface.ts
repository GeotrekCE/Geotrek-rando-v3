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

export interface RawOutdoorCourse {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
  duration: number;
  max_elevation?: number;
  height?: number;
  length?: number;
}

interface RawOutdoorCourseDetailsProperties extends RawOutdoorCourse {
  advice?: string;
  description?: string;
  equipment?: string;
  gear?: string;
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
  thumbnailUris: string[];
  duration: string | null;
  maxElevation: string | null;
  height: string | null;
  length: string | null;
}

export interface OutdoorCourseDetails extends OutdoorCourse {
  description?: string;
  bbox: Bbox;
}
