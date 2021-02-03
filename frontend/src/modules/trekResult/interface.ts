import { RawAttachment } from 'modules/activitySuggestions/interface';
import { Coordinate, RawSegmentGeometry } from 'modules/interface';

export interface RawTrekPopupResult {
  name: string;
  departure: string;
  attachments: RawAttachment[];
}

export interface TrekPopupResult {
  title: string;
  place: string;
  imgUrl: string;
}

export interface RawTrekGeometryResult {
  geometry: RawSegmentGeometry;
}

export interface TrekGeometryResult {
  geometry: Coordinate[];
}
