import { RawPointGeometry3D } from 'modules/interface';
import { SignageType } from 'modules/signageType/interface';

export interface RawSignage {
  attachments?: {
    type: string;
    thumbnail: string;
  }[];
  id: number;
  name: string;
  code: string;
  condition: number;
  description: string;
  geometry: RawPointGeometry3D;
  implantation_year: number;
  printed_elevation: number;
  sealing: number;
  structure: string;
  type: number;
}

export interface Signage {
  id: number;
  name: string;
  description: string;
  geometry: RawPointGeometry3D;
  type: SignageType;
  imageUrl: string | undefined | null;
}

export interface SignageDictionary {
  [id: string]: Signage;
}
