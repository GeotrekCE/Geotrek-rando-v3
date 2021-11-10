import { Bbox } from 'modules/details/interface';
import {
  Attachment,
  RawAttachment,
  RawLineStringGeometry2D,
  RawPointGeometry2D,
  RawPolygonGeometry,
} from 'modules/interface';
import { LineStringGeometry, PointGeometry, PolygonGeometry } from 'modules/interface';
import { Source } from '../source/interface';
import { TouristicContent } from '../touristicContent/interface';

export interface RawTouristicEvent {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawPolygonGeometry | RawLineStringGeometry2D | RawPointGeometry2D;
  themes?: number[];
  cities: string[];
}

interface RawTouristicEventDetailsProperties extends RawTouristicEvent {
  description: string;
  description_teaser: string;
  participant_number: number;
  pdf: string;
  meeting_point: string;
  duration: string;
  begin_date: string;
  end_date: string;
  source?: number[];
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
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry;
  thumbnailUris: string[];
  themes: string[];
  place: string;
}

export interface TouristicEventDetails extends TouristicEvent {
  description: string;
  descriptionTeaser: string;
  bbox: Bbox;
  cities: string[];
  touristicContents: TouristicContent[];
  participantNumber: number;
  pdfUri: string;
  meetingPoint: string;
  duration: string;
  beginDate: string;
  endDate: string;
  sources: Source[];
}
