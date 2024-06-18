import { RawAttachment, RawPointGeometry3D } from 'modules/interface';
import { InfrastructureType } from 'modules/infrastructureType/interface';

export interface RawInfrastructure {
  accessibility: string | null;
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

export interface Infrastructure {
  accessibility: string | null;
  id: number;
  name: string;
  description: string;
  geometry: RawPointGeometry3D;
  type: InfrastructureType;
  imageUrl: string | null;
}

export interface InfrastructureDictionary {
  [id: string]: Infrastructure;
}
