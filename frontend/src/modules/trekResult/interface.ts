import { RawAttachment } from 'modules/activitySuggestions/interface';
import { Thumbnail } from 'modules/results/interface';
import { RawGeometry } from 'modules/interface';

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

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface TrekGeometryResult {
  geometry: Coordinate[];
}
