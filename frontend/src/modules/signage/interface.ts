import { RawAttachment, RawPointGeometry3D } from 'modules/interface';
import { SignageType } from 'modules/signageType/interface';

export interface RawSignage {
  attachments: RawAttachment[];
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
  accessibility?: string | null;
  id: number;
  name: string;
  description: string;
  geometry: RawPointGeometry3D;
  type: SignageType;
  imageUrl: string | null;
}

export interface SignageDictionary {
  [id: string]: Signage;
}
