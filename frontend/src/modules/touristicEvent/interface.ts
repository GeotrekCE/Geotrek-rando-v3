import { Bbox } from 'modules/details/interface';
import {
  Attachment,
  GeometryCollection,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
  RawAttachment,
  RawGeometryCollection,
  RawLineStringGeometry2D,
  RawMultiLineStringGeometry,
  RawMultiPointGeometry2D,
  RawMultiPolygonGeometry,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';
import { Source } from '../source/interface';
import { TouristicContent } from '../touristicContent/interface';
import { TouristicEventType } from '../touristicEventType/interface';

export interface RawTouristicEvent {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry:
    | RawPolygonGeometry
    | RawMultiPolygonGeometry
    | RawLineStringGeometry2D
    | RawMultiLineStringGeometry
    | RawPointGeometry2D
    | RawMultiPointGeometry2D
    | RawGeometryCollection;
  themes?: number[];
  cities: string[];
  type: number;
  begin_date: string;
  end_date: string;
  approved: boolean;
}

interface RawTouristicEventDetailsProperties extends RawTouristicEvent {
  description: string;
  description_teaser: string;
  participant_number: number;
  pdf: string;
  meeting_point: string;
  duration: string;
  source?: number[];
  contact: string;
  email: string;
  website: string;
  accessibility: string;
  organizer: string;
  speaker: string;
  target_audience: string;
  practical_info: string;
  booking: string;
  meeting_time: string;
}

export interface RawTouristicEventDetails extends RawTouristicEvent {
  id: string;
  bbox: number[];
  properties: RawTouristicEventDetailsProperties;
}

export interface TouristicEvent {
  id: string;
  type: 'TOURISTIC_EVENT';
  name: string;
  attachments: Attachment[];
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry
    | GeometryCollection;
  thumbnailUris: string[];
  themes: string[];
  place: string;
  typeEvent: TouristicEventType;
  beginDate: string;
  endDate: string;
  logoUri: string | null;
}

export interface TouristicEventDetails extends TouristicEvent {
  description: string;
  descriptionTeaser: string;
  bbox: Bbox;
  cities: string[];
  cities_raw: string[];
  touristicContents: TouristicContent[];
  participantNumber: number;
  pdfUri: string;
  meetingPoint: string;
  duration: string;
  sources: Source[];
  contact: string;
  email: string;
  website: string;
  accessibility: string;
  organizer: string;
  speaker: string;
  targetAudience: string;
  practicalInfo: string;
  booking: string;
  meetingTime: string;
}
