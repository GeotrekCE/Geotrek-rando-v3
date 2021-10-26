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

export interface RawOutdoorSite {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
}

interface RawOutdoorSiteDetailsProperties extends RawOutdoorSite {
  advice?: string;
  ambiance?: string;
  children?: string;
  description?: string;
  description_teaser?: string;
  information_desks?: number[];
  labels?: number[];
  managers?: number[];
  orientation?: string[];
  period?: string;
  parent?: string;
  practice?: number;
  ratings?: number[];
  sector?: string;
  source?: number[];
  structure?: number;
  themes?: number[];
  type?: number;
  url?: string;
  courses?: string;
  web_links?: number[];
  wind?: string[];
}

export interface RawOutdoorSiteDetails extends RawOutdoorSite {
  id: string;
  geometry: RawPointGeometry2D | RawPolygonGeometry | RawLineStringGeometry2D | null;
  bbox: number[];
  properties: RawOutdoorSiteDetailsProperties;
}

export interface OutdoorSite {
  id: string;
  name: string;
  attachments: Attachment[];
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry | null;
  type: 'OUTDOOR_SITE';
  thumbnailUris: string[];
}

export interface OutdoorSiteDetails extends OutdoorSite {
  description?: string;
  bbox: Bbox;
}
