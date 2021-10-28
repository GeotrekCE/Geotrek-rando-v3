import { Bbox, WebLink } from 'modules/details/interface';
import { Attachment, RawAttachment, RawGeometryCollection, RawWebLink } from 'modules/interface';
import {
  LineStringGeometry,
  PointGeometry,
  PolygonGeometry,
  RawLineStringGeometry2D,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';
import { Activity } from '../activities/interface';
import { InformationDesk } from '../informationDesk/interface';
import { Label } from '../label/interface';
import { OutdoorCourse } from '../outdoorCourse/interface';
import { Poi } from '../poi/interface';
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
  parent?: string;
  ratings?: number[];
  sector?: string;
  source?: number[];
  structure?: number;
  type?: number;
  url?: string;
  courses?: string;
  web_links?: RawWebLink[];
}

export interface RawOutdoorSiteDetails extends RawOutdoorSite {
  id: string;
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
  themes: string[];
  practice: Activity | null;
  period: string | null;
  wind: string[];
  orientation: string[];
}

export interface OutdoorSiteDetails extends OutdoorSite {
  description?: string;
  descriptionTeaser?: string;
  bbox: Bbox;
  ambiance?: string;
  advice?: string;
  labels?: Label[];
  source?: Source[];
  informationDesks?: InformationDesk[];
  webLinks?: WebLink[];
  pois: Poi[];
  touristicContents: TouristicContent[];
  children: OutdoorSite[];
  courses: OutdoorCourse[];
}
