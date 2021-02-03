import { RawAttachment } from 'modules/activitySuggestions/interface';
import { Coordinate, RawGeometry } from 'modules/interface';

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
  geometry: RawGeometry;
}

export interface TrekGeometryResult {
  geometry: Coordinate[];
}
