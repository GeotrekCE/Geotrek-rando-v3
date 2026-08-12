import { FileFromAttachment, GeometryObject, RawAttachment, RawGeometryObject } from 'modules/interface';
import { VigilanceAreaType } from 'modules/vigilanceAreaType/interface';

export type Practicability = 'closed' | 'conditions' | 'practicable';

export interface RawVigilanceArea {
  id: number;
  name: {
    [key: string]: string;
  } | string;
  geometry: RawGeometryObject;
  structure: number;
  vigilance_area_type: number;
  practicability: Practicability;
  description: {
    [key: string]: string;
  } | string;
  practical_info: {
    [key: string]: string;
  } | string;
  external_info_url: string | null;
  sources: number[];
  start_date: string;
  end_date: string;
  active_days: number[];
  active_months: number[];
  published: boolean;
  uuid: string;
  attachments: RawAttachment[];
  update_datetime?: string;
  criticality?: 'alert' | 'vigilance' | 'info';
}

export interface VigilanceArea {
  id: string;
  name: string;
  geometry: GeometryObject;
  type: VigilanceAreaType;
  practicability: Practicability;
  description?: string;
  practicalInfo?: string;
  externalInfoUrl?: string | null;
  startDate: string;
  endDate: string;
  activeDays: number[];
  activeMonths: number[];
  updateDatetime?: string;
  attachments?: FileFromAttachment[];
  criticality?: 'alert' | 'vigilance' | 'info';
}
