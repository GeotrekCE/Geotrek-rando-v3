import { Coordinate3D, RawPointGeometry3D } from 'modules/interface';
import { ServiceType } from 'modules/serviceType/interface';

export interface RawService {
  id: number;
  geometry: RawPointGeometry3D;
  structure: string;
  type: number;
}
export interface Service {
  id: string;
  geometry: Coordinate3D;
  type: ServiceType;
}
