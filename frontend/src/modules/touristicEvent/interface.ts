import { Bbox } from 'modules/details/interface';
import { Attachment, RawAttachment, RawGeometryCollection } from 'modules/interface';
import { LineStringGeometry, PointGeometry, PolygonGeometry } from 'modules/interface';

export interface RawTouristicEvent {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawGeometryCollection;
}

interface RawTouristicEventDetailsProperties extends RawTouristicEvent {
  description: string;
  description_teaser: string;
}

export interface RawTouristicEventDetails extends RawTouristicEvent {
  id: string;
  bbox: number[];
  properties: RawTouristicEventDetailsProperties;
}

export interface TouristicEvent {
  id: string;
  name: string;
  attachments: Attachment[];
  geometry: PointGeometry | PolygonGeometry | LineStringGeometry;
  thumbnailUris: string[];
}

export interface TouristicEventDetails extends TouristicEvent {
  description: string;
  descriptionTeaser: string;
  bbox: Bbox;
}
